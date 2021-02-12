var express = require("express");
var Router = express.Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

const verifyUser = require('../handlers/verifyUser');
const upload = require('../handlers/multer');
var Article = require('../models/articleSchema');

Router.route('/')
.get((req, res) => {
    res.send("Not allowed");
})
.put((req, res) => {
    res.send("Not allowed");
})
.post(verifyUser, upload.single('image'), async (req, res, next) => {
    console.log('reached');
    // console.log(req);
    const result = await cloudinary.uploader.upload(req.file.path ,function(error, result) {console.log(result, error)});  
    console.log('image uploaded successfully');

    var art = req.body;
    var data = {
        article : art.article,
        like : 0,
        dislike : 0,
        author : art.author,
        heading : art.heading,
        imageUrl : result.secure_url
    }
    // console.log(data);

    if(art.topic === "Economical"){

       Article.Economical.create(data)
       .then((article) => {
           console.log("data", article);
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(article);
       }, (err) => next(err))
       .catch((err) => next(err));
    } else if(art.topic === "Technical"){

        Article.Technical.create(data)
       .then((article) => {
           console.log("data", article);
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(article);
       }, (err) => next(err))
       .catch((err) => next(err));
    } else if(art.topic === "Sport"){
    
        Article.Sport.create(data)
       .then((article) => {
           console.log("data", article);
           res.send('Uploaded');
       }, (err) => next(err))
       .catch((err) => next(err));
    } else if(art.topic === "Science"){

        Article.Science.create(data)
       .then((article) => {
           console.log("data", article);
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(article);
       }, (err) => next(err))
       .catch((err) => next(err));
    } else {
        res.send("wrong topic");
    }

    console.log(art);
    fs.unlink('./uploads/' + req.file.filename , (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
})
.delete((req, res) => {
    res.send("Not allowed");
})

module.exports = Router;