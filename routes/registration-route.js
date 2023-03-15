const express = require('express')
const User = require("../model/User")

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>registration page</h1>`)
})

router.post('/', (req, res) =>{
    User.findOne({email: req.body.email}).then((user) => {
        if(user){
            return res.status(400).json({error: "Account already exist"})
        } else {
            const newUser = new User({
                tweetID: req.body.tweetID,
                userType: "user",
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                followers: [],
                followings: [],
                likedTweetID: [],
                dislikedTweetID: [],
                likedCommentID: [],
                dislikedCommentID: []
            })
            newUser.save()
            return res.status(200).json({message: "success, return to login page"})
        }
    })
})

module.exports = router