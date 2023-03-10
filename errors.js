const { EmbedBuilder } = require("discord.js");

const fatalBotError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⛔ Server Error`)
  .setDescription("A fatal bot error occurred.");

const joinNoChannelError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("Join a channel for me to join.");

const alreadyPlayingError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("I am already playing in a voice channel.");

const nothingPlayingError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("There is nothing playing.");

const nothingQueuedError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("There is nothing queued.");

module.exports = {
  joinNoChannelError,
  alreadyPlayingError,
  fatalBotError,
  nothingPlayingError,
  nothingQueuedError,
};
