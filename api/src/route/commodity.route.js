const commodityController = require("../controller/commodity.controller")
const validateResources = require("../middleware/routeValidator.middleware")
const {commoditySchema} = require("../schema/commodity.schema")

const commodityRoute = (router) => {
    router.route("/commodity/average-price").post(validateResources(commoditySchema),commodityController.getAveragePrice)
}

module.exports = commodityRoute