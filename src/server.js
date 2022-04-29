const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

//routes
const rootRouter = require("./routes");
app.use('/api', rootRouter);

const start = () => {
    return app.listen(PORT, () => {
        console.log('server listening on port ', PORT);
    })
}

module.exports = {
    start
}