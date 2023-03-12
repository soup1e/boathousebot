const fetch = require("node-fetch");
module.exports = {
  async searchAnime(query) {
    try {
      const formattedQuery = query.replace(/ /g, "-");

      const response = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${formattedQuery}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while searching for anime.");
    }
  },
};
