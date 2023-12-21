const {Client, IntentsBitField, ActivityType} = require("discord.js");
require("dotenv").config(); //for env vars
const {submitFlag, guide, welcome, intro} = require("./commands.js");
const {target, support} = require("./troll.js");
const prefix = "!"; //command prefix

const paperid = "285820732032679946"
const samid = "642152174046150656"

//discord bot itself and what it's capable of accessing
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

//setting activity
client.on("ready", (c) => {
    console.log(`${c.user.tag} is now ready and online!`)
    client.user.setActivity({
        name: "your mom 😉",
        type: ActivityType.Watching,
    });
});

//running different commands depending on the user's input
function messageHandling(msg) {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return; //ignore bot messages and user messages that don't start with "!"

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === "submit-flag") {
        submitFlag(msg, args);
    } else if (cmd === "guide") {
        guide(msg);
    } else if (cmd === "welcome") {
        welcome(msg);
    } else if (cmd === "intro") {
        intro(msg);
    } else if (cmd === "bloop") {
        console.log(msg.author);
    };
};

function troll(msg) {
    if (msg.author.bot) return;

    if (msg.author.id === paperid) {
        target(msg);
    } else if (msg.author.id === samid) {
        support(msg);
    };
}

//run the client
client.on("messageCreate", messageHandling);
client.on("messageCreate", troll);
client.login(process.env.BOT_TOKEN);