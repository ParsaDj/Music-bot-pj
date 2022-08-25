const config = require("../config.js");
module.exports = async (client) => {

    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log("Successfully reloaded application [/] commands.");
        } catch (err) {
            console.log("Error reloading application [/] commands: " + err);
        }
    })();

    console.log(client.user.username + " successfully connected.");
    console.log(`
IF THE BOT IS WORKING, RESPONDING TO COMMANDS BUT NO SOUND, FOLLOW THESE STEPS;

Click on the one that says shell from the boxes that say console and shell above the opened box at the bottom right.
Type npm uni discord-player
Type npm i discord-player@5.3.0-dev.2
Type npm uni ytdl-core
Type npm i ytdl-core@4.10.0
Turn off and on the bot from the button that says "Stop" or "Run" in the middle of the replit screen
.`)
    
client.user.setStatus('ONLINE');
client.user.setActivity(config.status)

}
