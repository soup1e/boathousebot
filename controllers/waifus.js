const fetch = require("node-fetch");

module.exports = {
  async getWaifu(argument) {
    try {
      const response = await fetch(`https://api.waifu.pics/sfw/${argument}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the waifu image.");
    }
  },
};
