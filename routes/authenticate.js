const { response } = require('express');
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/userSchema');

const client = new OAuth2Client(process.env.CLIENT_ID);

Router = express.Router();

Router.route('/')
.get((req, res) => {
    res.send("Not allowed");
})
.post((req, res) => {
    const idToken = req.body.idToken;
    const userData = req.body.userData;
    client.verifyIdToken({idToken: idToken, audience: process.env.CLIENT_ID})
    .then((response) => {
        const { email_verified, email} = response.payload;
        const accessToken = userData.accessToken;
        const newUserData = {
            ...userData,
            likedArticleId:[],
            dislikedArticleId:[]
        }
        // console.log(response.payload);
        if(email_verified){
            User.findOne({email : email})
            .then((user) => {
                if(user){
                    User.updateOne({email : email}, {$set : {accessToken : accessToken}})
                    .then((res) => {
                        // console.log(res);
                        // res.("Updated");
                    })
                } else{
                    User.create(newUserData)
                    .then((res) => {
                        // console.log(res);
                        // res.send("Created");
                    })
                    .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
        }
    })
})
.put((req, res) => {
    res.send("Not Allowed");
})
.delete((req, res) => {
    res.send("Not Allowed");
})




Router.route('/update')
.get((req, res) => {
    res.send("Not allowed");
})
.post(async (req, res) => {
    const email = req.body.email;
    const accessToken = req.body.accessToken;
    await User.findOneAndUpdate({email : email}, {$set : {accessToken : accessToken}})
    .then((res) => {
        // console.log(res);
    })
    .catch((err) => console.log(err));
    res.send("task done");
})
.put((req, res) => {
    res.send("Not Allowed");
})
.delete((req, res) => {
    res.send("Not Allowed");
})


module.exports = Router;
