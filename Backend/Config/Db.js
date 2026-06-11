const Mongo = require('mongoose')
require('dotenv').config()

const ConnectDB = async () =>
{
    try{
        await Mongo.connect(process.env.DB_Url);
        console.log("Database Connection Established"); 
    }
    catch(e){
        console.log("Database Connection Failed");
    }
}


module.exports = ConnectDB