const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const waifus = require("../../controllers/waifus.js");
const errors = require("../../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Sends a random waifu gif!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The waifu category")
        .addChoices(
          { name: "neko", value: "neko" },
          { name: "bully", value: "bully" },
          { name: "cuddle", value: "cuddle" },
          { name: "cry", value: "cry" },
          { name: "hug", value: "hug" },
          { name: "awoo", value: "awoo" },
          { name: "kiss", value: "kiss" },
          { name: "pat", value: "pat" },
          { name: "smug", value: "smug" },
          { name: "bonk", value: "bonk" },
          { name: "yeet", value: "yeet" },
          { name: "blush", value: "blush" },
          { name: "smile", value: "smile" },
          { name: "wave", value: "wave" },
          { name: "highfive", value: "highfive" },
          { name: "handhold", value: "handhold" },
          { name: "bite", value: "bite" },
          { name: "slap", value: "slap" },
          { name: "kill", value: "kill" },
          { name: "kick", value: "kick" },
          { name: "happy", value: "happy" },
          { name: "wink", value: "wink" },
          { name: "poke", value: "poke" },
          { name: "dance", value: "dance" },
          { name: "cringe", value: "cringe" }
        )
    ),

  async execute(interaction) {
    let category = "waifu";

    if (interaction.options.getString("category")) {
      category = interaction.options.getString("category");
    }

    try {
      const data = await waifus.getWaifu(category);

      if (!data) return interaction.reply({ embeds: [errors.waifuNotFound] });

      const embed = new EmbedBuilder()
        .setColor("#FFC0CB")
        .setTitle(
          category === "waifu" ? "Random waifu" : `Random ${category} waifu`
        )
        .setImage(data.url)
        .setFooter({ text: `${interaction.member.user.username}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
