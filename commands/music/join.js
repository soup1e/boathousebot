const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make the bot join user's channel"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const { channel } = interaction.member.voice;

    if (distube.getQueue(interaction)) {
      return interaction.reply({ embeds: [errors.alreadyPlayingError] });
    }

    if (!channel) {
      return interaction.reply({ embeds: [errors.joinNoChannelError] });
    }

    try {
      await distube.voices.join(interaction.member.voice.channel);

      const embed = new EmbedBuilder()
        .setColor(0x9bf6ff)
        .setTitle(`🎵  Joined`)
        .setDescription(`${channel.name}`);
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
