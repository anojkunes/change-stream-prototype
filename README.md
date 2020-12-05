## Change Streams Prototype

Change Streams is a Mongo 3.6 + feature which will only work on clusters or replica set. Setted up a replica locally and used
Mongo Atlas for testing.

In AWS `Document DB` it only supports for clusters. It queues up the changes made on the collection, deployment or even
database. In Document DB, it holds there for between `1 to 24 hrs` but default is 3 hrs. Change Streams does have extra costs
in document db but we would be safe with certain restrictions as making it per collection restriction
and holding on the change stream for 2 hrs.

## Pre-Requisites

Open 2 terminals to run `src/index.js` and `src/testDataUtil.js`

STEP 1: run `npm install` to install dependencies from `package.json`

STEP 2: have two terminal windows open and type `cd src` on terminals to direct path to `src` 

STEP 3: To run `src/index.js` on one of the terminal to consume mongodb collection changes

```
MONGO_URL="mongodb+srv://${USERNAME}:${PASSWORD}@mongo-cluster.imhww.mongodb.net/qrp-change-stream-db?retryWrites=true&w=majority" BOOKING_AUDIT_COLLECTION="bo
oking_audit" BOOKING_AUDIT_DB="qrp-change-stream-db" node index
```

STEP 4: run `src/testDataUtil.js` on another terminal to insert, update and delete data in collections

```
MONGO_URL="mongodb+srv://${USERNAME}:${PASSWORD}@mongo-cluster.imhww.mongodb.net/qrp-change-stream-db?retryWrites=true&w=majority" BOOKING_AUDIT_COLLECTION="bo
oking_audit" BOOKING_AUDIT_DB="qrp-change-stream-db" node testDataUtil
```

Look at console to see if you see any mongo changes being consumed from STEP 3

## Future Improvements

RESUME Token needs to be stored and if application failed it needs to be provided with RESUME token
so that consumption will be taken from that point in time.
