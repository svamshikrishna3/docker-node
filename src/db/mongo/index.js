const mongoose = require("mongoose");
const config = require("config");

const mongoUrl = `${config.mongo.url}/${config.mongo.db}`
console.log(config);

const connectMongo = () => {
    return mongoose.connect(mongoUrl)
}

module.exports = connectMongo;