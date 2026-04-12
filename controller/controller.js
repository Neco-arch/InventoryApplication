const queries = require("../db/queries.js");

//CreateProduct
async function CreateProduct(
  itemname,
  description,
  category,
  price,
  quantity,
  status,
) {
  const ProductData = await queries.GetData();

  //Checking Data
  const CheckDupe = ProductData.some((value, index) => {
    value.itemname === itemname ? true : false;
  });

  if (CheckDupe === true) {
    return "Product Dupe";
  }
  // Insert Product
  const Result = await queries.InsertData(
    itemname,
    description,
    category,
    price,
    quantity,
    status,
  );
  return Result;
}

//EditData
async function EditProduct(
  ItemID,
  NewItemname,
  Newdescription,
  newcategory,
  newprice,
  newquantity,
  newstatus,
) {
  if ((newcategory = null)) {
    newcategory = "none";
  }
  const result = await queries.UpdateData(
    ItemID,
    NewItemname,
    Newdescription,
    newcategory,
    newprice,
    newquantity,
    newstatus,
  );
  return result;
}

//Delete Product
async function DeleteProduct(ItemID, Itemname) {
  const result = await queries.DeleteData(ItemID, Itemname);
  return result;
}

//Get All Data
async function GetAllData() {
  return await queries.GetAllData();
}

async function GetSortData(category, price, status) {
  return await queries.SortData(category, price, status);
}

function RenderAddProductPage(res) {
  queries.GetDataFromCategory().then((value) => {
    res.render("create_editdataform", { category: value });
  });
}

function Rendermainpage(res) {
  queries.GetDataFromCategory().then((value) => {
    res.render("category_page", { category: value });
  });
}

async function AddProductviaForm(req, res) {
  console.log(req.body);
  await queries.InsertData(
    req.ProductName,
    req.Description,
    req.Category,
    req.Price,
    req.Quanity,
    req.Product_status,
  );
  res.redirect("/");
}

module.exports = {
  AddProductviaForm,
  Rendermainpage,
  RenderAddProductPage,
  CreateProduct,
  EditProduct,
  DeleteProduct,
  GetAllData,
  GetSortData,
};
