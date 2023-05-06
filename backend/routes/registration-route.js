const express = require('express')
const User = require("../model/User")
const Follow = require("../model/Follow.js")

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({state: "Success"})
})

router.post('/',async (req, res) =>{
    User.findOne({$or: [
        { email: req.body.email },
        { tweetID: req.body.tweetID}
      ]}).then(async (user) => {
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
                dislikedCommentID: [],
                bookmark: []
            })
            const newFollow = new Follow({
                tweetID: req.body.tweetID,
                followers: []
            })
            await newFollow.save()
            await newUser.save()
            return res.status(200).json({message: "account created"})
        }
    })
})

module.exports = router