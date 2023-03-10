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
    const distube = interaction.client.distube;
    const query = interaction.options.getString("song");
    const member = interaction.member;
    const channel = member.voice.channel;

    if (!channel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⚠️  Error`)
        .setDescription("Join a channel for me to join.");

      return interaction.reply({ embeds: [errorEmbed] });
    }

    try {
      const queue = distube.getQueue(interaction.guild.id);

      distube.play(member.voice.channel, query);

      const embed = new EmbedBuilder()
        .setColor(0xcaffbf)
        .setTitle(`🎵  ${member.user.username} Added:`)
        .setDescription(`"${query}"`);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);

      const errorEmbed = new EmbedBuilder()
        .setColor(0xffadad)
        .setTitle(`⛔ Server Error`)
        .setDescription("An error occurred while trying to play a song.");

      interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
