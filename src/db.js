const {MongoClient} = require("mongodb");

async function checkPhase(team, phase) {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        const database = client.db("AmiraCTF");
        const collection = database.collection("progressTracking");

        const cursor = collection.find();

        for await (const t of cursor) {
            console.log(t);
        }

    } catch (error) {
        console.log(`Error: ${error}`);        
    }
};

module.exports = {
    checkPhase,
}