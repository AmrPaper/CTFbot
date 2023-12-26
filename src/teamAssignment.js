require("dotenv").config();
const {EmbedBuilder} = require("discord.js");

async function setup(msg, client) {
    const isPaper = msg.author.id === process.env.PAPER_ID;

    if (isPaper == false) msg.reply("You don't have the authority to use this command.");
    
    if (isPaper) {
        const rrEmbed = new EmbedBuilder()
        .setTitle("Team Assignment!")
        .setDescription(`Choose a team by reacting to this message! Here's a legend for which reaction is tied to which team:\n
        🔴 - Team Red\n
        🔵 - Team Blue\n
        🟣 - Team Purple\n
        ⚫ - Team Nigg\n
        ⚪ - Team Colonisers`)
        .setColor("#0099ff")
        .setFooter({text: "Powered by Mexi's laptop 🍞",});

        const emojis = ['🔴','🔵','🟣','⚫','⚪'];
        
        const rrMessage = await msg.channel.send({embeds: [rrEmbed]});

        for (const emoji of emojis) {
            await rrMessage.react(emoji);
        }

        reactionManagement(msg, rrMessage, client);
    }
}

function reactionManagement(msg, rrMessage, client) {
    try {
        client.on('messageReactionAdd', async (reaction, user) => {
            if (user.bot) return;
    
            if (reaction.message.id === rrMessage.id) {
                const roleName = getRoleName(reaction.emoji.name);
    
                if (roleName) {
                    const role = msg.guild.roles.cache.find((role) => role.name === roleName);
    
                    if (role) {
                        const member = await msg.guild.members.fetch(user.id);
                        await member.roles.add(role);
                        console.log(`Added the role ${role.name} to the user ${member.user.globalName}`);
                    }
                }
                
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (user.bot) return;
    
            if (reaction.message.id === rrMessage.id) {
                const roleName = getRoleName(reaction.emoji.name);
    
                if (roleName) {
                    const role = msg.guild.roles.cache.find((role) => role.name === roleName);
    
                    if (role) {
                        const member = await msg.guild.members.fetch(user.id);
                        await member.roles.remove(role);
                        console.log(`Removed the role ${role.name} to the user ${member.user.globalName}`);
                    }
                }
                
            }
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

function getRoleName(emoji) {
    switch (emoji) {
        case "🔴":
            return "Team Red";
        case "🔵":
            return "Team Blue";
        case "🟣":
            return "Team Purple";
        case "⚫":
            return "Team Nigg";
        case "⚪":
            return "Team Colonisers";
        default:
            return null;
    }
}

module.exports = {
    setup,
};