const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(cors({credentials: true, origin:"*"}));

app.use('/api', router);

mongoose.connect(process.env.MONGO_URL).then(() =>{
    app.listen(5000);
    console.log("Database connected! listening to localhost");
}).catch((err) => {
    console.log(err);
})

app.use('/api', (req, res, next) => {
    res.send("Hello world!");
});
