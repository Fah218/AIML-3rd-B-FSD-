const mongoose = require('mongoose')

async function dbconn(){
       try{
        const URL = "mongodb+srv://FSD_user:1234fsdfsd@fsd0.znkqiux.mongodb.net/?appName=FSD0"
        await mongoose.connect(URL);
        console.log("Database connected")
       }catch(e){
        console.log("Database not connected")
       }
}

module.exports = dbconn;