module.exports = {
  TOKEN: process.env.TOKEN, // give token from environment
  ownerID: process.env.DISCORD, // get owner ID from environment
  botInvite:
    "https://discord.com/api/oauth2/authorize?client_id=942280522749608017&permissions=8&scope=bot", // discord bot invite.
  status: " Parsa Dj ",
  commandsDir: "./commands",

  opt: {
    DJ: {
      commands: [
        "back",
        "clear",
        "filter",
        "loop",
        "pause",
        "resume",
        "skip",
        "stop",
        "volume",
      ],
    },

    voiceConfig: {
      leaveOnEnd: false, // If this variable is "true", the bot will leave the channel the music ends.
      autoSelfDeaf: false, // IF YOU WANT TO DEAF THE BOT, set false to true.

      leaveOnTimer: {
        // The leaveOnEnd variable must be "false" to use this system.
        status: true, // If this variable is "true", the bot will leave the channel when the bot is offline.
        time: 20000, // 1000 = 1 second
      },
    },

    maxVol: 100, // You can specify the maximum volume level.
    loopMessage: false,

    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio", // Please don't touch
        highWaterMark: 1 << 25, // Please don't touch
      },
    },
  },
};
