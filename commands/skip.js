const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const { channel } = interaction.member.voice;
    const queue = distube.getQueue(interaction);

    if (!channel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⚠️  Error`)
        .setDescription("Join a voice channel!");

      return interaction.reply({ embeds: [errorEmbed] });
    }

    if (!queue) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⚠️  Error`)
        .setDescription("There is nothing in the queue right now!");

      return interaction.reply({ embeds: [errorEmbed] });
    }

    try {
      if (queue.songs.length === 1 && queue.autoplay === false) {
        distube.stop(interaction);

        const embed = new EmbedBuilder()
          .setColor(0xffd6a5)
          .setTitle(`🎵  ${interaction.member.user.username} Skipped song`)
          .setDescription("Queue is currently empty");

        return interaction.reply({ embeds: [embed] });
      }

      distube.skip(interaction);

      const embed = new EmbedBuilder()
        .setColor(0xffd6a5)
        .setTitle(`🎵  ${interaction.member.user.username} Skipped song`)
        .setDescription("Playing next song...");

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);

      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⛔ Server Error`)
        .setDescription(
          "An error occurred while trying to skip the current song"
        );

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
