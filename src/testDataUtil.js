const { mongoClient, dbName, collectionName } = require('./mongoConfig');

(async () => {   
    try {
        // Connect to the MongoDB cluster
        await mongoClient.connect();

        // Make the appropriate DB calls
        const bookingAudit1 = await createListing({
            lpgOrderNumber: "1234567890",
            partnerOrderNumber: "12345678901234567890",
            orderDateTime: new Date(),
            attraction: "UKTUSSAUD",
            entryDate: "2020-08-20",
            entryTime: "15:00",
            requestId: "12345678-234567-123456789",
            tickets: [
              {
                ageType: "ADULT",
                partnerTicketNumber: "2723946723098",
                passNumber: "12345"
              },
              {
                ageType: "CHILD",
                partnerTicketNumber: "2723946723099",
                passNumber: "12346"
              }
            ]
          });

          const bookingAudit2 = await createListing({
            lpgOrderNumber: "1234567891",
            partnerOrderNumber: "12345678901234567891",
            orderDateTime: new Date(),
            attraction: "UKTUSSAUD",
            entryDate: "2020-08-20",
            entryTime: "15:00",
            requestId: "12345678-234567-123456790",
            tickets: [
              {
                ageType: "ADULT",
                partnerTicketNumber: "2723946723101",
                passNumber: "12346"
              }
            ]
          });

          const bookingAudit3 = await createListing({
            lpgOrderNumber: "1234567892",
            partnerOrderNumber: "12345678901234567892",
            orderDateTime: new Date(),
            attraction: "UKTUSSAUD",
            entryDate: "2020-08-20",
            entryTime: "15:00",
            requestId: "12345678-234567-123456789",
            tickets: [
              {
                ageType: "CHILD",
                partnerTicketNumber: "2723946723099",
                passNumber: "12346"
              }
            ]
          });

        await updateListing(bookingAudit1, { attraction: "UKTUSSAUDV1", requestId: "123456", name: "demo" });

        const bookingAudit4 = await createListing({
            lpgOrderNumber: "1234567894",
            partnerOrderNumber: "12345678901234567894",
            orderDateTime: new Date(),
            attraction: "UKTUSSAUD",
            entryDate: "2020-08-20",
            entryTime: "15:00",
            requestId: "12345678-234567-123456789",
            tickets: [
              {
                ageType: "ADULT",
                partnerTicketNumber: "2723946723099",
                passNumber: "12346"
              }
            ]
          });

        await deleteListing(bookingAudit4);

    } finally {
        // Close the connection to the MongoDB cluster
        await mongoClient.close();
    }
})().catch(console.error);

async function createListing(newListing) {
    const result = await mongoClient.db(dbName).collection(collectionName).insertOne(newListing);
    return result.insertedId;
}

async function updateListing(listingId, updatedListing) {
    const result = await mongoClient.db(dbName).collection(collectionName).updateOne({ _id: listingId }, { $set: updatedListing });
}

async function deleteListing(listingId) {
    const result = await mongoClient.db(dbName).collection(collectionName).deleteOne({ _id: listingId });
}