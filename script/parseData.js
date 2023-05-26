const csv = require("csv-parser")
const fs = require("fs")
const { MongoClient } = require('mongodb');
require("dotenv").config()


const parseAndStoreData = async (csvFilePath) => {
    try {
        if (!csvFilePath) return console.log("Please provide the file path")
        const data = await readCsvFile(csvFilePath)
        if (data.length === 0) {
            console.log("The provided file is empty")
            return "The provided file is empty"
        }
        const results  = await storeData(data)
        console.log('Data saved successfully.');
        return results
    } catch (error) {
        console.log(error)
        return error
    }
}

const readCsvFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath).on("error", (error) => {
            reject("No such file or directory");
        }).pipe(csv())
            .on("data", (data) => {
                const values = Object.values(data)
          
                results.push({
                    Commodity: values[0],
                    Market: values[1],
                    Price: Number(values[2]),
                    Date: new Date(values[3]),
                });
            })
            .on("end", () => {
                resolve(results);
            })
            .on("error", (error) => {
                reject("Encountered and error converting the csv to json");
            });
    });
};

const storeData = async (data) => {

    try {
        if(data.length === 0) return []
        const {collection, client} = await initDb(process.env.DB_URI, process.env.DB_NAME)
        const results = await collection.insertMany(data);
        client.close();
        return results
    } catch (error) {
        throw new Error("Encountered an error storing your file")
    }
}


const initDb = async (uri, dbName) => {
    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db(dbName);
    const collection =  database.collection('commodities');
    return {collection, client}
}

parseAndStoreData("sample_market_price_data.csv")

module.exports = {parseAndStoreData, initDb}