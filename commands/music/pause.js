const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause or Unpauses the current song"),

  async execute(interaction) {
    const distube = interaction.client.distube;
    const queue = distube.getQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply({ embeds: [errors.nothingQueuedError] });
    }

    if (queue.paused) {
      await queue.resume();

      const embed = new EmbedBuilder()
        .setColor(0xbdb2ff)
        .setTitle(`⏯️  ${interaction.member.user.username} resumed song`);
      return interaction.reply({ embeds: [embed] });
    }
    try {
      await queue.pause();

      const embed = new EmbedBuilder()
        .setColor(0xbdb2ff)
        .setTitle(`⏸️  ${interaction.member.user.username} paused song`)
        .setFooter({ text: "/resume to unpause song" });
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      return interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
