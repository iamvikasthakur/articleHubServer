var express = require("express");
const User = require("../models/userSchema");
const verifyUser = require('../handlers/verifyUser');
const { response } = require("express");


var Router = express.Router();

Router.route('/:email')
.get(verifyUser, (req, res) => {
    // console.log(req.params);
    const email = req.params.email;
    User.find({email:email})
    .then((articles) => {
        if(articles){
            res.send(articles);
        } else {
            res.send("No data");
        }
    })
    .catch((err) => res.send(err));
})
.patch(verifyUser, (req, res) => {
    const id = req.body.id;
    const email = req.params.email;

    if(req.body.liked != undefined){
        const liked = req.body.liked;
        if(liked){
            User.updateOne({email : email}, {$push : {likedArticleId : id}})
            .then((response) => {
                if(response){
                    res.send("updated");
                }
            })
            .catch(err => console.log(err));
        } else {
            User.updateOne({email : email}, {$pull : {likedArticleId : id}})
            .then((response) => {
                if(response){
                    res.send("updated");
                }
            })
            .catch(err => console.log(err));
        }
    }

    if(req.body.disliked != undefined){
        const disliked = req.body.disliked;
        if(disliked){
            User.updateOne({email : email}, {$push : {dislikedArticleId : id}})
            .then((response) => {
                if(response){
                    res.send("updated");
                }
            })
            .catch(err => console.log(err));
        } else {
            User.updateOne({email : email}, {$pull : {dislikedArticleId : id}})
            .then((response) => {
                if(response){
                    res.send("updated");
                }
            })
            .catch(err => console.log(err));
        }
    }
})
.post((req, res) => {
    res.send("Not allowed");
})
.delete((req, res) => {
    res.send("Not allowed");
})

module.exports = Router;