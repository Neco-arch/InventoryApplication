const express = require('express');
const path = require("path");
const controller = require('./controller/controller.js')


const app = express()

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render("mainpage_allproduct")
})

app.get('/product:id' , (req,res) => {
   
})

app.get('/addproduct' , (req,res) => {
    controller.GetCatData(res)
})


app.listen(3000, (req, res) => {
    console.log("Server lunched")
})