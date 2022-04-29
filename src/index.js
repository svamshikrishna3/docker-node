const connectMongo = require('./db/mongo/index');
const { start } = require("./server");

let retries = 0;

const startup = () => {
    connectMongo()
        .then(() => {
            console.log("connected to mongoDB on port 27017");
        })
        .catch(e => {
            console.error(e);
            setTimeout(() => {
                if (retries < 3
                    ) {
                    retries++;
                    console.log('rerying to connect to mongoDB, retries:', retries);
                    startup()
                }
            }, 1000)
            throw new Error("Error trying to connect MongoDB")
        })
        .then(() => {
            return start();
        })
        .catch(e => {
            console.error(e);
        })
}

startup();