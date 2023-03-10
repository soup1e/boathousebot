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
    const { channel } = member.voice.channel;

    if (!channel) {
      return interaction.reply({ embeds: [errors.joinNoChannelError] });
    }

    try {
      distube.play(member.voice.channel, query);

      const embed = new EmbedBuilder()
        .setColor(0xcaffbf)
        .setTitle(`🎵  ${member.user.username} Added:`)
        .setDescription(`"${query}"`);
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
