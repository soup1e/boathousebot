const { SlashCommandBuilder } = require("@discordjs/builders");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { EmbedBuilder } = require("discord.js");
const { YtDlpPlugin } = require("@distube/yt-dlp");

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
    const song = interaction.options.getString("song");
    const member = interaction.member;
    const channel = member.voice.channel;

    if (!channel) return interaction.editReply("Join a voice channel!");

    if (!interaction.client.distube) {
      interaction.client.distube = new DisTube(client, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [
          new SpotifyPlugin({
            emitEventsAfterFetching: true,
          }),
          new YtDlpPlugin(),
        ],
      });
    }

    const distube = interaction.client.distube;

    try {
      const queue = distube.getQueue(interaction.guild.id);
      if (queue) {
        distube.play(interaction, song);
      } else {
        distube.play(member.voice.channel, song);
      }

      const embed = new EmbedBuilder()
        .setTitle(`🎵  ${member.user.username} Added:`)
        .setDescription(`"${song}"`);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
