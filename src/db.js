const {MongoClient} = require("mongodb");

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

module.exports = {
    checkPhase,
}