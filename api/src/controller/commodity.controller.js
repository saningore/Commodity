const { getAveragePriceService } = require("../services/commodity.services")

exports.getAveragePrice = async (req, res) => {
    try {
        const { commodity, market, start_date, end_date } = req.body
        const averageResults = await getAveragePriceService(req.body)
        
        if(averageResults.length <= 0) return res.status(200).json({message: "Your query didn't match any commodity"})
        const average_price = Number(averageResults[0].average_price.toFixed(2))

        res.status(200).json({commodity, market, start_date, end_date, average_price})
    } catch (error) {
        res.status(400).json({message: "Encountered an error processing your request"})
    }
}