const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const errors = require("../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Make the bot leave a channel"),

  async execute(interaction) {
    const distube = interaction.client.distube;

    try {
      distube.voices.leave(interaction);

      const embed = new EmbedBuilder().setColor(0xffadad).setTitle(`🎵  Left`);
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
