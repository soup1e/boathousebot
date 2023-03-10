const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Make the bot leave a channel"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const { channel } = interaction.member.voice;

    try {
      distube.voices.leave(interaction);

      const embed = new EmbedBuilder()
        .setTitle(`Left:`)
        .setDescription(`${channel.name}`);

      interaction.reply({ embeds: [embed] });
    } catch {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
