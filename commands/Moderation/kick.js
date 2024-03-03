const { Client, Message, Embed, Member } = require('guilded.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        /**
         * @type {Member}
         */
        let replyUser;
        let reason;

        // Check for pings
        if(message.replyMessageIds.length > 0) {
            let replyMessage = await message.channel.fetchMessage(message.replyMessageIds[0]);
            replyUser = replyMessage.raw.createdBy;
        }

        // If no user id and no user ping
        if(args.length == 0 && !message.mentions && !replyUser) return message.send('Please provide a user to ban.');

        /**
         * @type { Member }
         */
        let target = await client.members.fetch(message.serverId, (message.mentions && message.mentions.users[0].id) ?? (args[0]) ?? replyUser);

        // If no user found
        if (!target) return message.send('Please provide a valid user to ban.');

        // If the user is trying to ban themselves
        if(target.id === message.author?.id) return message.send('You cannot ban yourself, hehe.');

        // The reason for the ban
        reason = args.slice(1).join(' ') || 'No reason provided.';

        try {
            target.kick({ data: { reason: reason }}).then(() => {
                const embed = new Embed()
                    .setTitle('Kicked!')
                    .setThumbnail("https://cdn.gilcdn.com/ContentMediaGenericFiles/72a8cc0e8016debf8b6d622a4761b0d3-Full.webp?w=756&h=756")
                    .setDescription(`**${target.username}** has been banned.\nReason: *${reason}*`)
                    .setColor('#36363D');
                message.send(embed);
            });
        } catch (e) {
            console.log(e);
        }
    }
}