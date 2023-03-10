const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

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
    const query = interaction.options.getString("song");
    const member = interaction.member;
    const channel = member.voice.channel;

    if (!channel) return interaction.editReply("Join a voice channel!");

    try {
      const queue = interaction.client.distube.getQueue(interaction.guild.id);

      interaction.client.distube.play(member.voice.channel, query);

      const embed = new EmbedBuilder()
        .setTitle(`🎵  ${member.user.username} Added:`)
        .setDescription(`"${query}"`);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
