const { mongoClient, dbName, collectionName } = require('./mongoConfig');

(async () => {
    const resumeToken = null; // TODO store/persist resume token => store as a file and then read from that perhaps
    mongoClient.connect().then(client => {
        console.log("MongoDB connected");
        const changeStream = client.db(dbName)
        .collection(collectionName)
        .watch({ resumeAfter: resumeToken, fullDocument: 'updateLookup' });

        // this listens to create, update, delete and replace operations on the collections
        changeStream.on('change', (payload) => {            
            handleChangeStream(payload);
        });
    })
    .catch((err) => console.error(err,'Error'));
})();

const handleChangeStream = (payload) => {
    console.log(`-------------------------------------------------------------------------------`);
    console.log("Handle with operationType: %s and payload:", payload.operationType.toUpperCase(), payload);
    deconstructingPayload(payload);
    console.log(`-------------------------------------------------------------------------------`);
}

const deconstructingPayload = (payload) => {
    console.log(`ResumeToken:`, payload._id);
    switch (payload.operationType) {
        case "insert":
            console.log("Deconstructing ticket info:")
            payload.fullDocument.tickets.forEach(element => { console.log(element); });
            break;
    }
}