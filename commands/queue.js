const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current queue of songs"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const member = interaction.member;
    const channel = member.voice.channel;

    try {
      const queue = distube.getQueue(interaction.guild.id);
      if (!queue) return interaction.reply(`There is nothing playing!`);

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
        .setColor(0x0099ff)
        .setTitle(`🎵 Current Queue`)
        .setDescription(`${q}`)
        .setFooter(footer);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
