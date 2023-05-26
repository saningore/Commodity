const chai = require("chai")
const expect = require('chai').expect
const {initDb, parseAndStoreData} = require('../parseData');
const { describe, it } = require('mocha');




describe('Parse csv and save to mongodb', () => {
  beforeEach(async()=>{
    const {collection, client} = await initDb(process.env.DB_URI, process.env.DB_NAME)
    await collection.deleteMany({})
  })
  it('should return the expected result', async () => {
    const result = await parseAndStoreData("test/sample_market_price_test_data.csv");
    expect(result.acknowledged).to.be.true;
    expect(result.insertedCount).to.equal(10);
    expect(result.insertedIds).to.be.an('object');
  });
  
  it('Should return no such file when file path is incorrect', async () => {
    const result = await parseAndStoreData("test/wrong_file_path.csv");
    expect(result).to.be.a.string;
    expect(result).to.equal("No such file or directory");
  });

  it('Should return empty file message', async () => {
    const result = await parseAndStoreData("test/sample_market_price_empty_test_data.csv");
    expect(result).to.be.a.string;
    expect(result).to.equal("The provided file is empty");
  });

});