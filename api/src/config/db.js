const mongoose = require("mongoose")

const initDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI, {
            dbName: process.env.DB_NAME
        })
        console.log("Db connected")
    }catch(error){
        console.log("Db not connected")
    }
    mongoose.connection.on("error", ()=> {
        console.log("Db disconnected")
    })
    mongoose.connection.on("connected", ()=> {
        console.log("Db connected")
    })
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });
}

module.exports = initDb