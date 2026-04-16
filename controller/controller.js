const queries = require("../db/queries.js");


// =========================
// Product Page
// =========================
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
  const CheckDupe = ProductData.some((value) => {
    return value.itemname === itemname;
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
  if (newcategory === null) {
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

// =========================
// Delete Product
// =========================


// RenderDeletePage 
async function RenderDeletePage(req,res) {
  res.render("Edit/confirmdelete" , {ID : req.body.product_ID })
}


//Delete Product
async function DeleteProduct(req,res) {
  const ProductID = req.body.Product_ID;
  const result = await queries.DeleteData(ProductID,null,null);
  res.redirect("/")
  return result
}

//Add Product page
function RenderAddProductPage(res) {
  queries.GetDataFromCategory().then((value) => {
    res.render("Edit/create_adddataform", { category: value });
  });
}

// Each Category Page
async function Rendermainpage(req, res) {
  try {
    const categories = await queries.GetDataFromCategory();
    res.render("category/category_page", {
      category: categories,
    });
  } catch (err) {
    console.error(err);
  }
}

// Add ProductPage
async function AddProductviaForm(req, res) {
  const data = req.body;
  await queries.InsertData(
    data.ProductName,
    data.Description,
    data.Category,
    data.Price,
    data.Quantity,
    data.Product_status,
  );
  res.redirect("/");
}

// =========================
// Category Page
// =========================

async function RenderCategory(req, res) {
  const type = req.params.category_type;
  const result = await queries.filterData(type);
  res.render("category/category_product", { products: result });
}

function CreateCategory(req,res) {
  const CategoryName = req.body.Category
  queries.CreateCategory(CategoryName).then(() => {
    console.log("Create New Category Succesfully")
  })
  res.redirect("/")
}


async function DeleteCategory(req,res) {
  const CategoryName = req.body.Category
  const result1 = await queries.DeleteCategory(CategoryName);
  const result2 = await queries.DeleteData(null,null,CategoryName);
  res.redirect("/")
}

// =========================
// Render Page
// =========================
  

function RenderProductAction(req, res) {
  const Productid = req.body.productId;
  queries.filterData(null, null, null, Productid).then((value) => {
    res.render("product/productpage", { product: value });
  });
}

// Product Edit Page
async function RenderEditPage(req, res) {
  try {
    const ProductID = req.body.product_ID;
    const value = await queries.filterData(null, null, null, ProductID);
    const categories = await queries.GetDataFromCategory();

    res.render("Edit/editproduct", { category: categories, data: value });
  } catch (err) {
    console.error(err);
  }
}

async function EditDataform(req, res) {
  try {
    const NewData = req.body;

    await queries.UpdateData(
      NewData.Product_ID,
      NewData.ProductName,
      NewData.Description,
      NewData.Category,
      NewData.Price,
      NewData.Quantity,
      NewData.Product_status,
    );
    console.log("Update Data Successfully");
  } catch (err) {
    console.error(err);
  }

  res.redirect("/category");
}

module.exports = {
  RenderDeletePage,
  DeleteCategory,
  CreateCategory,
  EditDataform,
  RenderEditPage,
  RenderProductAction,
  RenderCategory,
  AddProductviaForm,
  Rendermainpage,
  RenderAddProductPage,
  CreateProduct,
  EditProduct,
  DeleteProduct,
};
