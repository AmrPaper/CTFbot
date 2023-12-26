const {EmbedBuilder} = require("discord.js");
const {checkPhase} = require("./db.js")
require("dotenv").config();

async function phase1(msg) {
    const challengeTxt = new EmbedBuilder()
    .setTitle("Phase 1")
    .setDescription("Lorem Ipsum")
    .setColor("#FFF9FB")
    .setFooter({text: "Powered by Mexi's laptop 🍞",})
    .addFields({
        name: "Data",
        value: `I've compiled all the available evidence I could get my hands on, you'll find it all here:\n
        ${process.env.PHASE_1_FILES}`
    },);

    const usrRoles = msg.member.roles.cache.map(r => r.name);
    if (usrRoles.includes("CTF") == false) {
        msg.reply("You are not participating in the ongoing CTF, please contact Paper for assistance!");
    };

    const team = msg.member.roles.cahe.filter(r => r.name.toLowerCase().startsWith("team"));
    
    if (checkPhase(team, 1)) {
        msg.reply({embeds: [challengeTxt]});
    } else {
        msg.reply("You have not started the CTF yet!");
    };

};

async function phase2(msg) {
    const challengeTxt = new EmbedBuilder()
    .setTitle("Phase 2")
    .setDescription("Lorem Ipsum")
    .setColor("#D3D4D9")
    .setFooter({text: "Powered by Mexi's laptop 🍞",})
    .addFields({
        name: "Data",
        value: `I've compiled all the available evidence I could get my hands on, you'll find it all here:\n
        ${process.env.PHASE_2_FILES}`
    },);

    const usrRoles = msg.member.roles.cache.map(r => r.name);
    if (usrRoles.includes("CTF") == false) {
        msg.reply("You are not participating in the ongoing CTF, please contact Paper for assistance!");
    };

    const team = msg.member.roles.cahe.filter(r => r.name.toLowerCase().startsWith("team"));
    
    if (checkPhase(team, 2)) {
        msg.reply({embeds: [challengeTxt]});
    } else {
        msg.reply("You have not reached Phase 2 yet! Please complete the previous phase first.");
    };
};

async function phase3(msg) {
    const challengeTxt = new EmbedBuilder()
    .setTitle("Phase 3")
    .setDescription("Lorem Ipsum")
    .setColor("#4B88A2")
    .setFooter({text: "Powered by Mexi's laptop 🍞",})
    .addFields({
        name: "Data",
        value: `I've compiled all the available evidence I could get my hands on, you'll find it all here:\n
        ${process.env.PHASE_3_FILES}`
    },);

    const usrRoles = msg.member.roles.cache.map(r => r.name);
    if (usrRoles.includes("CTF") == false) {
        msg.reply("You are not participating in the ongoing CTF, please contact Paper for assistance!");
    };

    const team = msg.member.roles.cahe.filter(r => r.name.toLowerCase().startsWith("team"));
    
    if (checkPhase(team, 3)) {
        msg.reply({embeds: [challengeTxt]});
    } else {
        msg.reply("You have not reached Phase 3 yet! Please complete the previous phase first.");
    };
};

async function phase4(msg) {
    const challengeTxt = new EmbedBuilder()
    .setTitle("Phase 4")
    .setDescription("Lorem Ipsum")
    .setColor("#BB0A21")
    .setFooter({text: "Powered by Mexi's laptop 🍞",})
    .addFields({
        name: "Data",
        value: `I've compiled all the available evidence I could get my hands on, you'll find it all here:\n
        ${process.env.PHASE_4_FILES}`
    },);

    const usrRoles = msg.member.roles.cache.map(r => r.name);
    if (usrRoles.includes("CTF") == false) {
        msg.reply("You are not participating in the ongoing CTF, please contact Paper for assistance!");
    };

    const team = msg.member.roles.cahe.filter(r => r.name.toLowerCase().startsWith("team"));
    
    if (checkPhase(team, 4)) {
        msg.reply({embeds: [challengeTxt]});
    } else {
        msg.reply("You have not reached Phase 4 yet! Please complete the previous phase first.");
    };
};

module.exports = {
    phase1,
    phase2,
    phase3,
    phase4,
}