const { deferConfig } = require("config/defer");


module.exports = {
    serviceName: 'user-management',
    mongo: {
        MONGO_HOST: process.env.MONGO_HOST || 'mongo',
        MONGO_PORT: process.env.MONGO_PORT || '27017',
        url: deferConfig(c => `mongodb://${c.mongo.MONGO_HOST}:${c.mongo.MONGO_PORT}`),
        db: deferConfig(c => c.serviceName)
    },
    jwt: {
        secret_key: "ExpressApp"
    }
}