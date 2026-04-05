const express = require('express');
const path = require("path");
const controller = require('./controller/controller.js')

const app = express()

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    controller.TestID(req, res)
})


app.listen(3000, (req, res) => {
    console.log("Server lunched")
})