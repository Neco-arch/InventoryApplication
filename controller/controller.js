const queries = require('../db/queries.js')

async function TestID(req, res) {
    const response = await queries.TestDB()
    console.log(response)
}

module.exports = {
    TestID
}