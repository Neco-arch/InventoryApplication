const pool = require("./pool.js");
require("dotenv").config({ path: "../.env" });

async function InsertData(
  itemname,
  description,
  category,
  price,
  quantity,
  status,
) {
  const querymessage =
    "INSERT INTO products(itemname, description,category,price,quantity,status) VALUES($1, $2 , $3 , $4 , $5 , $6)";
  const value = [itemname, description, category, price, quantity, status];
  await pool.query(querymessage, value);
}

async function GetData() {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  } catch (err) {
    console.log("Error Happened");
    console.log(err);
  }
}

async function GetDataSpecific(id) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE id = ($1)",
      id,
    );
    return rows;
  } catch (err) {
    console.log("Error Happened");
    console.log(err);
  }
}

async function UpdateData(
    Dataid,
  itemname,
  description,
  category,
  price,
  quantity,
  status,
) {
    const querymessage = 'UPDATE products SET itemname = ($1) , description = ($2) , category = ($3) , price = ($4) , quantity = ($5) , status = ($6) WHERE id = ($7)'
    const value = [itemname,description,category,price,quantity,status,Dataid]
    try {
        const result = pool.query(querymessage,value)
        return result
    } catch (err) {
    console.log("Error Happened");
    console.log(err);
    }
}

async function DeleteData(id) {
  try {
    const result = await pool.query("DELETE FROM products WHERE id = ($1)", [
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error Happened");
    console.log(err);
  }
}



module.exports = {
  InsertData,
  GetData,
  GetDataSpecific,
  DeleteData,
  UpdateData
};
