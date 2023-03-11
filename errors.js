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

const notInChannelError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("I am not in a channel.");

const invalidSongIndexError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("Queue does not contain that number of songs.");

const notANumberError = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription(
    "The value provided for the `position` option is not a number."
  );

const linkNotSupported = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("Link not supported");

const songNotFound = new EmbedBuilder()
  .setColor(0xffadad)
  .setTitle(`⚠️  Error`)
  .setDescription("Song not found");

module.exports = {
  joinNoChannelError,
  alreadyPlayingError,
  fatalBotError,
  nothingPlayingError,
  nothingQueuedError,
  notInChannelError,
  invalidSongIndexError,
  notANumberError,
  linkNotSupported,
  songNotFound,
};
