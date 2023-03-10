const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make the bot join user's channel"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const { channel } = interaction.member.voice;

    if (distube.getQueue(interaction)) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⚠️  Error`)
        .setDescription("I am already playing in a voice channel.");

      return interaction.reply({ embeds: [errorEmbed] });
    }

    if (!channel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⚠️  Error`)
        .setDescription("Join a channel for me to join.");

      return interaction.reply({ embeds: [errorEmbed] });
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

      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⛔ Server Error`)
        .setDescription("An error occurred while trying to join a channel.");

      interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
