const express = require('express');
const path = require("path");
const controller = require('./controller/controller.js')

const app = express()

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render("mainpage_allproduct")
})

app.get('/Product:id' , (req,res) => {
    // Do something
})

app.get('/SortData' , (req,res) => {
    // Do something
})

app.get('/AddProduct' , (req,res) => {
    res.render("create_editdataform")
})


app.listen(3000, (req, res) => {
    console.log("Server lunched")
})