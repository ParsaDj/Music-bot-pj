const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: "ping",
  description: "It helps you to get information about the speed of the bot.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {

    const start = Date.now();
    interaction.reply("Pong!").then(msg => {
      const end = Date.now();
      const embed = new EmbedBuilder()
        .setColor('007fff')
        .setTitle(client.user.username + " - Pong!")
        .setThumbnail(client.user.displayAvatarURL())
        .addFields([
          { name: `Message Ping`, value: `\`${start - end}ms\` 🛰️` },
          { name: `Message Latency`, value: `\`${Date.now() - start}ms\` 🛰️` },
          { name: `API Latency`, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
        ])
        .setTimestamp()
        .setFooter({ text: `Code Share - by Parsa DJ` })
      return interaction.editReply({ embeds: [embed] }).catch(e => { });
    }).catch(err => { })
  },
};
