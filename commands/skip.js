const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const { channel } = interaction.member.voice;
    const queue = distube.getQueue(interaction);

    if (!channel) {
      return interaction.reply({ embeds: [errors.joinNoChannelError] });
    }

    if (!queue) {
      return interaction.reply({ embeds: [errors.nothingQueuedError] });
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
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
