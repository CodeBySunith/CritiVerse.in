const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const db = require('../Backend/Config/Db.js');
db();

const Router = require('../Backend/Routes/UserRoutes.js');
const ReviewRouter = require("../Backend/Routes/ReviewRoute.js");
const GameRouter = require('../Backend/Routes/GameRoutes.js');
const ListRouter = require('../Backend/Routes/ListRoutes.js');

app.use('/user', Router);
app.use('/review', ReviewRouter);
app.use('/game', GameRouter);
app.use('/list', ListRouter);


app.listen(process.env.PORT, () => {
    console.log("Critiverse Server is Online");
});
