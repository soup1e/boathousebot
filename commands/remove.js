const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("remove a song from queue")
    .addStringOption((option) =>
      option
        .setName("number")
        .setDescription("The position in queue of the song you want to remove")
        .setRequired(true)
    ),
  async execute(interaction) {
    const distube = interaction.client.distube;
    const queue = distube.getQueue(interaction);
    const tracks = interaction.options.getString("number");

    if (isNaN(tracks)) {
      return interaction.reply({ embeds: [errors.notANumberError] });
    }

    if (!queue) {
      return interaction.reply({ embeds: [errors.nothingQueuedError] });
    }

    if (tracks >= queue.songs.length) {
      return interaction.reply({ embeds: [errors.invalidSongIndexError] });
    }

    try {
      const song = queue.songs[tracks];

      await queue.songs.splice(tracks, 1);

      const embed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`🗑️  Removed`)
        .setThumbnail(`${song.thumbnail}`)
        .setDescription(`"${song.name}"`)
        .setFooter({ text: `${song.url} - ${song.formattedDuration}` })
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      interaction.reply({ embeds: [errors.fatalBotError] });
      console.error(error);
    }
  },
};
