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
          .setTitle(`⏭️  ${interaction.member.user.username} Skipped song`)
          .setDescription("Queue is currently empty");
        return interaction.reply({ embeds: [embed] });
      }

      await distube.skip(interaction);

      const q = queue.songs
        .map((song, i) =>
          i === 1
            ? `Now Playing: ${song.name} \`${song.formattedDuration}\``
            : null
        )
        .filter((str) => str !== null)
        .join("\n");

      const embed = new EmbedBuilder()
        .setColor(0xffd6a5)
        .setTitle(`⏭️  ${interaction.member.user.username} Skipped song`)
        .setDescription(`${q}`);
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
