const {EmbedBuilder} = require("discord.js");

function help(msg) {
    const cmdList = new EmbedBuilder()
    .setTitle("Help!")
    .setDescription("A list of all currently available commands.")
    .setColor("#0099ff")
    .setFooter({text: "Powered by Mexi's laptop 🍞",})
    .addFields({
        name: "!welcome",
        value: "Provides you with a welcome message that contains the outlines of the CTF",
        inline: false,
    },{
        name: "!intro",
        value: "Provides you with the introduction to the story of the CTF",
        inline: false,
    },{
        name: "!phase[]",
        value: "Provides you with the files for the specified challenge, replace the [] with the number of the stage you're currently on.\n For example using !phase2 will give you the files for the second stage!",
        inline: false,
    },{
        name: "!submit-flag",
        value: "Allows you to submit the flag to complete the challenge you're currently on and unlock the next one!\n Use case: !submit-flag flag",
        inline: false,
    },);

    msg.channel.send({embeds: [cmdList]});
}

function welcome(msg) {
    const welcomeMessage = new EmbedBuilder()
    .setTitle("Welcome!")
    .setDescription("Welcome to Autist Retreat's first CTF! Hope you're having a great day, and get ready to prove yourself in these mystery filled series of challenges!\n\nPlease do try to be respectful throughtout the event and stick to the guidelines outlined below!\n")
    .setColor("#0099ff")
    .setFooter({text: "Powered by Mexi's laptop 🍞",})
    .addFields({
        name: "CTF Guidelines",
        value: `**1.** Participate in the designated channels for general discussions and challenge-specific discussions.\n
        **2.** Submit flags in the correct format (that being RUECTF={flag-text-here}).\n
        **3.** Collaborate! 3 heads are better than 1 no?\n
        **4.** Respect Others' Progress. Communication is allowed between teams though please avoid spoilers and don't share explicit solutions with others, sharing methodology is allowed though!\n
        **5.** Research on the go! You're allowed to google anything and everything you want, this is not a race, everyone's expected to finish.\n
        **6.** Hint Usage. Rue can provide you with hints throughout the challenge though if you hit a wall, don't hesitate to contact Paper or another team!\n
        **7.** Have fun! No need to be competitive approach this as a learning experience!\n`,
        inline: false,
    },{
        name:"Need Help?",
        value:"You can always run the !help command for a list of all the available commands that Rue is equipped with, though if you encounter any problems throughout your play or hit a wall, don't hesitate to contact Paper about anything!"
    });

    msg.channel.send({embeds: [welcomeMessage]});
};

function intro(msg) {
    const storyIntro = new EmbedBuilder()
    .setTitle("Shadows of Silicon")
    .setDescription("In the sprawling labyrinth of the digital realm, a shadowy syndicate known as **Silicon Shadows** emerges, leaving a trail of encrypted chaos and high-stakes cybercrimes in its wake. As a seasoned detective renowned for cracking the most intricate cases, you, Detective Alex Mercer, find yourself thrust into the heart of this enigmatic underworld.\n\nYour journey begins with an anonymous message, a cryptographic breadcrumb leading you to the dark web's depths. In this digital abyss, you encounter an unexpected ally—an artificial intelligence bot named Rue. Created by a missing scientist, Rue possesses unparalleled hacking capabilities and a wealth of information crucial to unraveling Silicon Shadows' nefarious plans.")
    .setColor("#0099ff")
    .setFooter({text: "Powered by Mexi's laptop 🍞",});

    msg.channel.send({embeds: [storyIntro]});
};

module.exports = {
    welcome,
    intro,
    help,
};