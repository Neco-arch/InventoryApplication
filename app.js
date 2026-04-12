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
    controller.Rendermainpage(res)
})

app.get('/addproduct' , (req,res) => {
    controller.RenderAddProductPage(res)
})

app.post('/addproducttodb' , (req,res) => {
    controller.AddProductviaForm(req,res)
})



app.listen(3000, (req, res) => {
    console.log("Server lunched")
})