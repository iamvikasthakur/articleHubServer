var express = require("express");

var Router = express.Router();

Router.route('/')
.get((req, res) => {
    res.send("Welcome at ArticleHub");
})
.put((req, res) => {
    res.send("Not allowed");
})
.post((req, res) => {
    res.send("Not allowed");
})
.delete((req, res) => {
    res.send("Not allowed");
})

module.exports = Router;