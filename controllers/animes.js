const fetch = require("node-fetch");
module.exports = {
  async searchAnime(query) {
    try {
      const formattedQuery = query.replace(/[^a-z0-9]+/gi, "-");

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

  async getRandomAnime(type) {
    let url;
    if (type === "movie") {
      url = `https://kitsu.io/api/edge/anime?filter[subtype]=movie&page[offset]=${Math.floor(
        Math.random() * 2000
      )}&page[limit]=1`;
    } else if (type === "tv") {
      url = `https://kitsu.io/api/edge/anime?filter[subtype]=TV&page[offset]=${Math.floor(
        Math.random() * 2000
      )}&page[limit]=1`;
    } else {
      url = `https://kitsu.io/api/edge/anime?page[offset]=${Math.floor(
        Math.random() * 2000
      )}&page[limit]=1`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while searching for anime.");
    }
  },
};
