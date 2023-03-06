const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newcommand")
    .setDescription("newcommand!"),
  async execute(interaction) {
    await interaction.reply("test!");
  },
};
