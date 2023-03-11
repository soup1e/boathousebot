const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../errors.js");

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

    try {
      await distube.play(channel, query);
      const queue = distube.getQueue(interaction.guildId);
      const newSong = queue.songs.slice(-1)[0];

      const embed = new EmbedBuilder()
        .setTitle(`🎵  ${member.user.username} added:`)
        .setColor(0xcaffbf)
        .setDescription(`"${query}" \n [${newSong.name}](${newSong.url})`)
        .setThumbnail(`${newSong.thumbnail}`)
        .setTimestamp()
        .setFooter({ text: `${newSong.formattedDuration}` });
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
