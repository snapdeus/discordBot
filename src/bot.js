require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$"

client.once('ready', () => {
    console.log(`${ client.user.tag } has logged in.`)
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .toLowerCase()
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === 'kick') {
            message.channel.send('Kicked the User')
        }

    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN)