const { MongoClient } = require('mongodb');
const fs = require('fs');

require('dotenv').config();

console.log("Setting Mongo Client")

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const setUpMongoClient = ()  => {
    console.log(process.env.MONGO_URL)
    return new MongoClient(process.env.MONGO_URL, options);
}

exports.mongoClient = setUpMongoClient();
exports.dbName = process.env.BOOKING_AUDIT_DB;
exports.collectionName = process.env.BOOKING_AUDIT_COLLECTION
