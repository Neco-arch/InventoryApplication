const pool = require('./pool.js')

async function InsertData(itemname, description, category, price, quantity, status) {
    await pool.query("INSERT INTO streetwear_products (itemname , ) VALUES ($1 , $2 )", itemname    )
}

async function GetData() {
    const { rows } = await pool.query("SELECT * FROM streetwear_products")
    return rows
}

module.exports = {
    InsertData,
    GetData
}