const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current queue of songs"),

  async execute(interaction) {
    const distube = interaction.client.distube;

    if (distube.getQueue(interaction)) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⚠️  Error`)
        .setDescription("There is nothing playing.");

      return interaction.reply({ embeds: [errorEmbed] });
    }

    try {
      const queue = distube.getQueue(interaction.guild.id);

      const q = queue.songs
        .map(
          (song, i) =>
            `${i === 0 ? "Playing:" : `${i} -`} ${song.name} \`${
              song.formattedDuration
            }\``
        )
        .join("\n");

      const totalDurationInSeconds = queue.songs.reduce(
        (acc, song) => acc + song.duration,
        0
      );

      const hours = Math.floor(totalDurationInSeconds / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((totalDurationInSeconds - hours * 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(
        totalDurationInSeconds - hours * 3600 - minutes * 60
      )
        .toString()
        .padStart(2, "0");
      const footer = {
        text: `Total time: ${hours}:${minutes}:${seconds}`,
      };

      const embed = new EmbedBuilder()
        .setColor(0xbdb2ff)
        .setTitle(`🎵  Current Queue`)
        .setDescription(`${q}`)
        .setFooter(footer);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
