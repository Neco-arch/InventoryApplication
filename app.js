require('dotenv').config(); 

const express = require('express');
const path = require("path");
const controller = require('./controller/controller.js')

const app = express()

// =========================
// Inital Part
// =========================

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


// =========================
// Category Part
// =========================


app.get('/', (req, res) => {
    res.redirect('/category')
})
//Category Part
app.get('/category', (req, res) => {
    controller.Rendermainpage(req,res)
})

app.post('/addcategory' , (req,res) => {
    controller.CreateCategory(req,res)
})

app.post('/deletecategory' , (req,res) => {
    controller.DeleteCategory(req,res)
})


// =========================
// Product Part
// =========================


app.get('/addproduct' , (req,res) => {
    controller.RenderAddProductPage(res)
})

app.get('/category/:category_type' , (req,res) => {
    controller.RenderCategory(req,res)
}) 

app.post('/viewproduct' , (req,res) => {
    controller.RenderProductAction(req,res)
})

app.post('/addproducttodb' , (req,res) => {
    controller.AddProductviaForm(req,res)
})

app.post('/editproduct' , (req,res) => {
    controller.RenderEditPage(req,res)
})

app.post('/editdata' , (req,res) => {
    controller.EditDataform(req,res)
})

app.post('/renderdeleteproduct' , (req,res) => {
    controller.RenderDeletePage(req,res)
})

app.post('/deleteproduct' , (req,res) => {
    controller.DeleteProduct(req,res)
})


app.listen(3000, () => {
    console.log("Server lunched")
})