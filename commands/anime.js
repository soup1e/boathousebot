const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const animes = require("../controllers/animes");
const errors = require("../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Search For Anime!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The name of the anime")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const query = interaction.options.getString("query");

      const data = await animes.searchAnime(query);

      if (data.meta.count === 0) {
        return interaction.reply({ embeds: [errors.animeNotFound] });
      }

      const embed = new EmbedBuilder()
        .setColor("#FFC0CB")
        .setTitle(data.data[0].attributes.canonicalTitle)
        .setDescription(`Description: \n${data.data[0].attributes.description}`)
        .setThumbnail(data.data[0].attributes.posterImage.original)
        .addFields(
          {
            name: "Episodes",
            value: data.data[0].attributes.episodeCount.toString(),
            inline: true,
          },
          {
            name: "Score",
            value: data.data[0].attributes.averageRating.toString(),
            inline: true,
          },
          {
            name: "Release Date",
            value: new Date(
              data.data[0].attributes.createdAt
            ).toLocaleDateString(),
            inline: true,
          }
        )
        .setFooter({ text: `${interaction.member.user.username}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
