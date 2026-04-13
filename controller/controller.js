const { render } = require("ejs");
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



//Add Product page
function RenderAddProductPage(res) {
  queries.GetDataFromCategory().then((value) => {
    res.render("create_adddataform", { category: value });
  });
}


// Each Category Page
function Rendermainpage(res) {
  queries.GetDataFromCategory().then((value) => {
    res.render("category_page", { category: value });
  });
}

// Add ProductPage
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

//Category Page

async function RenderCategory(req,res) {
    const type = req.params.category_type
    const result = await queries.filterData(type) 
    res.render("category_product" , {products : result })
}

// Edit Product Page

function RenderProductAction(req,res) {
  const Productid = req.body.productId
  queries.filterData(null,null,null,Productid).then((value) => {
    res.render('productpage' , {product : value})
  })

}

module.exports = {
  RenderProductAction,
    RenderCategory,
  AddProductviaForm,
  Rendermainpage,
  RenderAddProductPage,
  CreateProduct,
  EditProduct,
  DeleteProduct,
};
