const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const queue = distube.getQueue(interaction.guild.id);
    const channel = interaction.member.voice.channel;

    if (!channel) return interaction.reply("Join a voice channel!");

    if (!queue)
      return interaction.reply(`There is nothing in the queue right now!`);

    try {
      if (queue.songs.length === 1 && queue.autoplay === false) {
        distube.stop(interaction);
        interaction.reply("Skipped, Queue is currently empty.");
      } else {
        distube.skip(interaction);
        interaction.reply("Skipped Song");
      }
    } catch (error) {
      console.error(error);
      interaction.reply("Error");
    }
  },
};
