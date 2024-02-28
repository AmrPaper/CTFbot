const {EmbedBuilder} = require("discord.js");
const {MongoClient} = require("mongodb");
flags = {"1": "flag1", "2": "flag2", "3": "flag3", "4": "flag4"};

async function checkPhase(usrTeam, phase) {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        const database = client.db("AmiraCTF");
        const collection = database.collection("progressTracking");

        const cursor = collection.find();
        var teams = []
        
        for await (const t of cursor) {
            teams.push(t);
        };

        const targetTeam = teams.find(team => team.teamName === usrTeam.name);
        const stage = "stage " + phase;
        
        if (phase == 0) {
            return true
        } else {
            return await targetTeam.progress[stage];
        };

    } catch (error) {
        console.log(`Error: ${error}`);        
    } finally {
        await client.close();
    }
};

async function submitFlag(msg, args) {
    const client = new MongoClient(process.env.MONGODB_URI);
    const usrRoles = msg.member.roles.cache.map(r => r.name);
    
    try {
        if (usrRoles.includes("CTF") == false) {
            msg.reply("You are not participating in the ongoing CTF, please contact Paper for assistance!");
        } else {
            const team = msg.member.roles.cache.filter(r => r.name.toLowerCase().startsWith("team")).first();
            
            if (team) {
                const database = client.db("AmiraCTF");
                const collection = database.collection("progressTracking");

                const cursor = collection.find();
                var teams = []
                
                for await (const t of cursor) {
                    teams.push(t);
                };

                const usrTeam = msg.member.roles.cache.filter(r => r.name.toLowerCase().startsWith("team")).first();
                const targetTeam = teams.find(team => team.teamName === usrTeam.name);

                if (args.length > 0) {
                    const submittedFlag = args[0];
                    
                    for (const [stage, flag] of Object.entries(flags)) {
                        if (flag === submittedFlag) {
                            msg.reply(`You've submitted the correct flag for Stage ${stage}!`);
                            targetTeam.progress[`stage ${stage}`] = true;
                            await collection.updateOne({teamName: usrTeam.name}, { $set: {progress: targetTeam.progress}});
                            return;
                        }
                    }

                    msg.reply("The flag you submitted is incorrect. Try again 😉.");
                } else {msg.reply("Please submit a valid flag");}
            } else {
                msg.reply("You do not belong to a team yet, please contact Paper for assistance!")
            };
        };
        
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        await client.close();
    }
};

async function leaderboard (msg, args) {
    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
        const database = client.db("AmiraCTF");
        const collection = database.collection("progressTracking");

        const cursor = collection.find();
        var teams = []
                
        for await (const t of cursor) {
            teams.push(t);
        };

        const progressKeysAndValuesWithTeamName = teams.map(team => {
            const progressData = Object.entries(team.progress).map(([key, value]) => [key, value.toString()]);
            return [team.teamName, progressData];
          });
          
          // Sort teams based on progress
        const sortedTeams = progressKeysAndValuesWithTeamName.sort((a, b) => {
            const aProgress = a[1].reduce((acc, curr) => acc + (curr[1] === 'true'), 0);
            const bProgress = b[1].reduce((acc, curr) => acc + (curr[1] === 'true'), 0);
            return bProgress - aProgress;
        });

        const leaderboardTxt = new EmbedBuilder()
        .setTitle("Leaderboard")
        .setColor("#0099ff")
        .setFooter({text: "Powered by Mexi's laptop 🍞",})
        .addFields({
            name: "Note",
            value:"The scoreboard is not sorted because this shouldn't be treated as a race or competition of any sort, we're all here to learn and have a good time, keep it light hearted 😊",
            inline: false,
        });
        sortedTeams.forEach((team, index) => {
            const progressCount = team[1].reduce((acc, curr) => acc + (curr[1] === 'true'), 0);
            leaderboardTxt.addFields({
                name: `${team[0]}`,
                value:`Progress: ${progressCount}/4 stages`,
                inline: false,
            })
        });

        msg.channel.send({embeds: [leaderboardTxt]});
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        await client.close();
    }
}

module.exports = {
    checkPhase,
    submitFlag,
    leaderboard,
}