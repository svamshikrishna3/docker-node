const connectMongo = require('./db/mongo/index');
const { start } = require("./server");
const { User } = require('./models');
const q = require('./db/mongo/queries');


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
        .then(async () => {
            const user = {
                firstName: 'admin',
                email: 'admin@admin.com',
                password: 'admin@5881',
                role: 'SYS_ADMIN'
            }
            const req = {}
            req.body = user;
            req.q = {
                email: 'admin@admin.com'
            }
            const sysUser = await q.getOne(User)(req) 
            if (!sysUser) {
                const resp = await q.createOne(User)(req)
                console.log(resp, 'created sys admin successfully');
            }
        })
        .catch(e => {
            console.error(e);
        })
}

startup();