const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const { keyWords, verbs, adjectives, nouns1, nouns2, adverbs, greetings } = require('../keywords')

const axios = require('axios')

const { Client, Intents } = require('discord.js');
const { CLIENT_ID, GUILD_ID } = require('../config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const PREFIX = "$"


function makeUniquePhrase() {
    let sentenceArray = []
    let randomNoun = nouns1[Math.floor(Math.random() * nouns1.length)]
    let randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
    let randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)]
    let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    let randomKeyWord = keyWords[Math.floor(Math.random() * keyWords.length)]
    let randomNoun2 = nouns2[Math.floor(Math.random() * nouns2.length)]
    sentenceArray.push(randomNoun, randomAdverb, randomVerb, randomAdjective, randomKeyWord, randomNoun2);
    let uniqueGreeting = sentenceArray.join(' ')
    return uniqueGreeting
}

function makeUniqueGreeting() {
    let randomGreetings = greetings[Math.floor(Math.random() * greetings.length)]
    return randomGreetings;
}


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
        member.guild.channels.cache.get('884569101786284053').send(`${ makeUniqueGreeting() }, ${ member.user.username }`);
        member.send(`Here is your *secret* phrase: "**${ makeUniquePhrase() }.**" Make sure not let anyone see your *SECRET* phrase. Write it down and store it in a safe place. `);
    })

});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .toLowerCase()
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === 'phraseme') {
            message.author.send(`Here is your secret phrase: "**${ makeUniquePhrase() }.**" Make sure not let anyone see your *SECRET* phrase. Write it down and store it in a safe place. `);
        }

    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN)