const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorageFactory
    let simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("should add a person", async function () {
        const transactionResponse = await simpleStorage.addPerson("uday", 24)
        await transactionResponse.wait(1)

        const expectedValue = await simpleStorage.nameToFavouriteNumber["uday"]
        assert.equal(expectedValue.toString(), 24)
    })
})
