// const express = require('express');
const User = require('../models/userSchema');

const verifyUser = async (req, res, next) => {
    if(req.body == undefined && req.body.email == undefined && req.body.accessToken == undefined){
        res.send("Not authorised");
    }

    const email = req.headers.email;
    const accessToken = req.headers.accesstoken;
    console.log(req.headers);
    console.log(accessToken);
    console.log(email);
    await User.findOne({email: email, accessToken : accessToken})
    .then((response) => {
        console.log(response);
        if(response == null){
            res.send("Not authorised2");
            return;
        }
    })
    .catch((err) => console.log(err));
    next();
}

module.exports = verifyUser;