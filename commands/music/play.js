const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../../errors.js");
// const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The name or URL of the song")
        .setRequired(true)
    ),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const query = interaction.options.getString("song");
    const member = interaction.member;
    const channel = member.voice.channel;

    if (!channel) {
      return interaction.reply({ embeds: [errors.joinNoChannelError] });
    }

    // if (query.startsWith("http://") || query.startsWith("https://")) {
    //   if (
    //     !ytdl.validateURL(query) &&
    //     !query.match(/^https?:\/\/(open.spotify.com)/)
    //   ) {
    //     return interaction.reply({ embeds: [errors.linkNotSupported] });
    //   }
    // }

    try {
      distube.play(channel, query);
      console.log("PLAYING MUSIC");
      const queue = distube.getQueue(interaction.guildId);
      const newSong = queue.songs.slice(-1)[0];

      let embed;
      if (query.match(/^https?:\/\/(open.spotify.com)/)) {
        embed = new EmbedBuilder()
          .setTitle(`🎵  ${member.user.username} added a song from Spotify`)
          .setColor(0xcaffbf);
        return interaction.reply({ embeds: [embed] });
      } else {
        embed = new EmbedBuilder()
          .setTitle(`🎵  ${member.user.username} added a song:`)
          .setColor(0xcaffbf)
          .setDescription(`"${query}" \n [${newSong.name}](${newSong.url})`)
          .setThumbnail(`${newSong.thumbnail}`)
          .setTimestamp()
          .setFooter({ text: `${newSong.formattedDuration}` });
        return interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      if (error.code === "NO_RESULT") {
        return interaction.reply({ embeds: [errors.songNotFound] });
      }

      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
