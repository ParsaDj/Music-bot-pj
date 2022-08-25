const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "save",
    description: "It sends and saves the played music to you via dm box.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `There is no music currently playing!. ❌`, ephemeral: true }).catch(e => { })

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Save Track")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `Track`, value: `\`${queue.current.title}\`` },
                { name: `Duration`, value: `\`${queue.current.duration}\`` },
                { name: `URL`, value: `${queue.current.url}` },
                { name: `Saved Server`, value: `\`${interaction.guild.name}\`` },
                { name: `Requested By`, value: `${queue.current.requestedBy}` }
            ])
            .setTimestamp()
            .setFooter({ text: `Code Share - by Pars Dj` })
        interaction.user.send({ embeds: [embed] }).then(() => {
            interaction.reply({ content: `Current track saved in your private messages! ✅`, ephemeral: true }).catch(e => { })
        }).catch(error => {
            interaction.reply({ content: `Unable to send you private message. ❌`, ephemeral: true }).catch(e => { })
        });
    },
};
