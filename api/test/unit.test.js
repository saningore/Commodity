const chai = require("chai")
const expect = require("chai").expect
const chaiHttp = require('chai-http')

const app = require("../src/index")
const { successAverageData, noData } = require("./test.data")

chai.use(chaiHttp)

describe("Test for average price endpoint", () => {
    describe("Test for a successful request", async () => {
        it("Should return the average of commodities matching the query", async () => {
            await chai.request(app)
                .post("/api/v1/commodity/average-price")
                .send(successAverageData)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('commodity');
                    expect(res.body).to.have.property('market');
                    expect(res.body).to.have.property('start_date');
                    expect(res.body).to.have.property('end_date');
                    expect(res.body).to.have.property('average_price', successAverageData.test_average_price);
                }).catch(error => {
                    throw error
                })
        })
    })
    
    describe("Test for an empty result", async () => {
        it("Should return the average of commodities matching the query", async () => {
            await chai.request(app)
                .post("/api/v1/commodity/average-price")
                .send(noData)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal("Your query didn't match any commodity")
                }).catch(error => {
                    throw error
                })
        })
    })

})


