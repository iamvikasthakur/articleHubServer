var express = require("express");
const { Economical } = require("../models/articleSchema");
const verifyUser = require('../handlers/verifyUser');


var Router = express.Router();

Router.route('/')
.get((req, res) => {
    Economical.find({})
    .then((articles) => {
        if(articles){
            res.send(articles);
        } else {
            res.send("No data");
        }
    })
    .catch((err) => res.send(err));
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


Router.route('/:id')
.get(verifyUser, (req, res) => {
    const id = req.params.id;
    Economical.findById({_id: id})
    .then((response) => {
        res.send(response)
    })
    .catch((err) => console.log(err));
})
.patch(verifyUser, (req, res) => {
    const id = req.body.id;
    const like = req.body.like;
    const dislike = req.body.dislike;
    console.log(req.body);
    console.log(like);
    console.log(dislike);
    Economical.findByIdAndUpdate({_id : id}, {$set : {like : like, dislike : dislike}})
    .then((response) => {
        console.log(response);
    })
    .catch(err => console.log(err));
})
.put((req, res) => {
    res.send("Not allowed");
})
.delete((req, res) => {
    res.send("Not allowed");
})



module.exports = Router;