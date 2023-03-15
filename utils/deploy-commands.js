require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const commandsPath = path.join(__dirname, "..", "commands");

// Get all subdirectories inside the commands directory
const subdirectories = fs
  .readdirSync(commandsPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// For each subdirectory, get all command files inside it and add them to the commands array
for (const subdirectory of subdirectories) {
  const subdirectoryPath = path.join(commandsPath, subdirectory);
  const commandFiles = fs
    .readdirSync(subdirectoryPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(subdirectoryPath, file));
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // FOR PRODUCTION GLOBAL COMMANDS
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: commands,
      }
    );

    // FOR DEVELOPMENT SERVER COMMANDS
    // const data = await rest.put(
    //   Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    //   { body: commands }
    // );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
