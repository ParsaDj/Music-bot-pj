const { Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const config = require("./config");
const fs = require("fs");

// require for use .env variable
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

client.config = config;
client.player = new Player(client, client.config.opt.discordPlayer);
const player = client.player;

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded Event: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
    try {
      let props = require(`${config.commandsDir}/${f}`);
      client.commands.push({
        name: props.name,
        description: props.description,
        options: props.options,
      });
      console.log(`Loaded command: ${props.name}`);
    } catch (err) {
      console.log(err);
    }
  });
});

player.on("trackStart", (queue, track) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    if (queue.metadata) {
      queue.metadata
        .send({
          content: `🎵 Now playing: **${track.title}** -> Channel: **${queue.connection.channel.name}** 🎶`,
        })
        .catch((e) => {});
    }
  }
});

player.on("trackAdd", (queue, track) => {
  if (queue) {
    if (queue.metadata) {
      queue.metadata
        .send({ content: `**${track.title}** added to playlist. ✅` })
        .catch((e) => {});
    }
  }
});

player.on("channelEmpty", (queue) => {
  if (queue) {
    if (queue.metadata) {
      queue.metadata
        .send({
          content: `I left because there is no one left in my channel. 🥲 ❌`,
        })
        .catch((e) => {});
    }
  }
});

player.on("queueEnd", (queue) => {
  if (client.config.opt.voiceConfig.leaveOnTimer.status === true) {
    if (queue) {
      setTimeout(() => {
        if (queue.connection) {
          if (!queue.playing) {
            //additional check in case something new was added before time was up
            queue.connection.disconnect();
          }
        }
      }, client.config.opt.voiceConfig.leaveOnTimer.time);
    }
    if (queue.metadata) {
      queue.metadata
        .send({ content: `Queue is empty. You can play some more music. ✅` })
        .catch((e) => {});
    }
  }
});

player.on("error", (queue, error) => {
  if (queue) {
    if (queue.metadata) {
      queue.metadata
        .send({
          content: `I'm having trouble connecting to the voice channel. ❌ | ${error}`,
        })
        .catch((e) => {});
    }
  }
});

if (config.TOKEN || process.env.TOKEN) {
  client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
    console.log(
      "The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!"
    );
  });
} else {
  setTimeout(() => {
    console.log("Please set the bot token in config.js !");
  }, 2000);
}

setTimeout(async () => {
  const db = require("croxydb");
  await db.delete("queue");
  await db.delete("loop");
}, 2000);

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
