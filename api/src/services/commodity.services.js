const CommodityModel = require("../model/commodity.model")



exports.getAveragePriceService = async ({ commodity, market, start_date, end_date }) => {
    const formattedStartDate = new Date(start_date)
    const formattedEndDate = new Date(end_date)

    return CommodityModel.aggregate([
        {
            $match: {
                Commodity: commodity, 
                Market: market,
                Date: {
                    $gte: formattedStartDate,
                    $lte: formattedEndDate
                }
            }
        },
        {
            $group: {
                _id: null,
                average_price: {$avg: "$Price"}
            }
        },
        {
            $project: {
                _id: 0,
                average_price: 1,
            }
        }
    ])
}