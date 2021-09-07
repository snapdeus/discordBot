require('dotenv').config();

const axios = require('axios')

const { Client, Intents } = require('discord.js');
const { CLIENT_ID, GUILD_ID } = require('../config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const PREFIX = "$"

client.once('ready', () => {
    console.log(`${ client.user.tag } has logged in.`)
});


async function getQuote() {
    try {
        const res = await axios.get('https://zenquotes.io/api/random')
        return res.data[0].q;
    } catch (e) {
        console.log(e);
    }
};




client.on('guildMemberAdd', member => {
    getQuote().then(quote => {
        member.guild.channels.cache.get('884569101786284053').send(`Welcome, ${ member.user.username }. ${ quote }`);
    })

});

// client.on('messageCreate', (message) => {
//     if (message.author.bot) return;
//     if (message.content.startsWith(PREFIX)) {
//         const [CMD_NAME, ...args] = message.content
//             .toLowerCase()
//             .trim()
//             .substring(PREFIX.length)
//             .split(/\s+/);
//         if (CMD_NAME === 'kick') {
//             message.channel.send('Kicked the User')
//         }

//     }
// });

client.login(process.env.DISCORDJS_BOT_TOKEN)