const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const animes = require("../controllers/animes");
const errors = require("../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Search for a random anime!")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of anime to search for (movie/tv)")
        .setRequired(true)
        .addChoices(
          { name: "Movie", value: "movie" },
          { name: "TV", value: "tv" }
        )
    ),

  async execute(interaction) {
    try {
      const type = interaction.options.getString("type");

      const data = await animes.getRandomAnime(type);

      const embed = new EmbedBuilder()
        .setColor("#FFC0CB")
        .setTitle(data.data[0].attributes.canonicalTitle)
        .setDescription(`Description: \n${data.data[0].attributes.description}`)
        .setThumbnail(data.data[0].attributes.posterImage.original)
        .addFields(
          {
            name: "Episodes",
            value:
              data.data[0].attributes.episodeCount == null
                ? "Unreleased"
                : data.data[0].attributes.episodeCount.toString(),
            inline: true,
          },
          {
            name: "Score",
            value:
              data.data[0].attributes.averageRating == null
                ? "none"
                : data.data[0].attributes.averageRating.toString(),
            inline: true,
          },
          {
            name: "Release Date",
            value:
              data.data[0].attributes.createdAt == null
                ? "Unreleased"
                : new Date(
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
