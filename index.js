require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");

const errors = require("./errors.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
});

client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const folderPath = path.join(__dirname, "commands", folder);
  const commandFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`${folderPath}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return interaction.reply({ embeds: [errors.commandNotFound] });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}:`);
    console.error(error);
    interaction.reply({ embeds: [errors.fatalBotError] });
  }
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("error", (error) => {
  console.error("Discord client error:");
  console.error(error);
});

(async () => {
  await client.login(process.env.TOKEN);
})();
