require('dotenv').config(); 

const express = require('express');
const path = require("path");
const controller = require('./controller/controller.js')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.redirect('/category')
})

app.get('/category', (req, res) => {
    controller.Rendermainpage(res)
})

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



app.listen(3000, () => {
    console.log("Server lunched")
})