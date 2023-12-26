const {Client, IntentsBitField, ActivityType} = require("discord.js");
require("dotenv").config(); //for env vars
const {submitFlag, welcome, intro} = require("./commands.js");
const {setup} = require("./teamAssignment.js");
const prefix = "!"; //command prefix

//discord bot itself and what it's capable of accessing
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
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

const commandHandlers = {
    "submit-flag": submitFlag,
    "welcome": welcome,
    "intro": intro,
    "bloop": (msg) => {
        console.log(msg.author);
        msg.reply("User info logged!");
    },
    "blip": (msg) => {
        console.log(msg.member.roles.cache.map(r => r.name));
        msg.reply("User roles logged!");
    },
};


//running different commands depending on the user's input
function messageHandling(msg) {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return; //ignore bot messages and user messages that don't start with "!"

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === "setup") {
        setup(msg, client)
    } else {
        const handler = commandHandlers[cmd];
        if (handler) {
            handler(msg, args);
        } else {
            msg.reply("Unknown command. Type !help for a list of commands.");
        };
    };
};

//run the client
(async () => {
    try {
        client.on("messageCreate", messageHandling);
        client.login(process.env.BOT_TOKEN);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();