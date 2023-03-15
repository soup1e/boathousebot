const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const kitsu = require("../../controllers/kitsu");
const errors = require("../../errors.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Search for a random Anime/Manga!")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Search for (movie/tv/manga)")
        .setRequired(true)
        .addChoices(
          { name: "Movie", value: "Movie" },
          { name: "TV", value: "Tv" },
          { name: "Manga", value: "Manga" }
        )
    ),

  async execute(interaction) {
    try {
      const type = interaction.options.getString("type");

      const data = await kitsu.getRandom(type);

      const embed = new EmbedBuilder()
        .setColor("#FFC0CB")
        .setTitle(`${type}: ${data.data[0].attributes.canonicalTitle}`)
        .setDescription(`Description: \n${data.data[0].attributes.description}`)
        .setThumbnail(data.data[0].attributes.posterImage.original)
        .setFooter({ text: `${interaction.member.user.username}` })
        .setTimestamp();

      if (type === "Manga") {
        embed.addFields(
          {
            name: "Chapters",
            value:
              data.data[0].attributes.chapterCount == null
                ? "Unreleased/One Shot"
                : data.data[0].attributes.chapterCount.toString(),
            inline: true,
          },
          {
            name: "Volumes",
            value:
              data.data[0].attributes.chapterCount == null
                ? "Unreleased/One Shot"
                : data.data[0].attributes.volumeCount.toString(),
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
        );
      } else {
        embed.addFields(
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
        );
      }

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [errors.fatalBotError] });
    }
  },
};
