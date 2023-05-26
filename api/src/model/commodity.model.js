const { Schema, model } = require("mongoose")

const commoditiesSchema = new Schema({
    Commodity: {
        type: String,
        trim: true
    },
    Market: {
        type: String,
        trim: true
    },
    Price: {
        type: String,
        trim: true
    },
    Date: {
        type: Date,
        trim: true
    }
})

const CommodityModel =  model("commodities", commoditiesSchema)
module.exports = CommodityModel