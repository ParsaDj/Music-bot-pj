const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "help",
    description: "Get information about bot and commands.",
    permissions: "0x0000000000000800",
    options: [],
    showHelp: false,
    run: async (client, interaction) => {

        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Music bot that supports playing music from many platforms and will make your server feel special. Create your own music bot: https://github.com/ParsaDj/Music-bot-pj")
            .addFields([
                { name: `Bot Commands`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
            ])
            .setTimestamp()
            .setFooter({ text: `Code Share - Parsa Dj` })
        interaction.reply({ embeds: [embed] }).catch(e => { })
    },
};
