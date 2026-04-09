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
  const querymessage_2 = "INSERT INTO allcategory(category) VALUES($1)";
  const result1 = await pool.query(querymessage, value);
  const result2 = await pool.query(querymessage_2, category);

  return [result1, result2];
}

async function GetAllData() {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  } catch (err) {
    console.log("Error Happened");
    console.log(err);
  }
}

async function SortData(category, price, status) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE category = ($1) OR price = ($2) OR status = ($3) ",
      [category,price,status]
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
  const querymessage =
    "UPDATE products SET itemname = ($1) , description = ($2) , category = ($3) , price = ($4) , quantity = ($5) , status = ($6) WHERE id = ($7) ";
  const value = [
    itemname,
    description,
    category,
    price,
    quantity,
    status,
    Dataid,
  ];
  try {
    const result = await pool.query(querymessage, value);
    return result;
  } catch (err) {
    console.log("Error Happened");
    console.log(err);
  }
}

async function DeleteData(id, itemname) {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = ($1) OR itemname = ($2)",
      [id, itemname],
    );
    return result;
  } catch (err) {
    console.log("Error Happened");
    console.log(err);
  }
}

module.exports = {
  InsertData,
  GetAllData,
  SortData,
  DeleteData,
  UpdateData,
};
