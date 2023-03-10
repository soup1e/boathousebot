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
        .setColor(0xffadad)
        .setTitle(`🎵  Left:`)
        .setDescription(`${channel.name}`);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);

      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⛔ Server Error`)
        .setDescription(
          "An error occurred while attempting to make the bot leave a voice channel."
        );

      interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
