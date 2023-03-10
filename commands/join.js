const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make the bot join user's channel"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const { channel } = interaction.member.voice;

    if (distube.getQueue(interaction))
      return interaction.reply("I am already playing in a voice channel.");
    if (!channel) return interaction.reply("Join a channel for me to join.");

    try {
      await distube.voices.join(interaction.member.voice.channel);

      const embed = new EmbedBuilder()
        .setTitle(`Joined:`)
        .setDescription(`${channel.name}`);

      interaction.reply({ embeds: [embed] });
    } catch {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
