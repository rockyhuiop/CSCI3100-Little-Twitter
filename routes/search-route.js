const express = require('express')
const User = require('../model/User.js')

const {
    FetchTweetByContent,
} = require('../controller/tweet')

router = express.Router()

//Searching Tweet by Specific Content

router.get('/SearchTweetByContent/:Content', (req, res) => {
    (async() => {
        const {Content:specificContent} = req.params
        const SearchedTweet = await FetchTweetByContent(specificContent)
        res.status(200).json({message : SearchedTweet})
    })()
})

//find user
router.get('/SearchUserById/:id', async (req, res)=>{
    const { id } = req.params
    try {
        let user = await User.find({ $or: [{ tweetID: {$regex: new RegExp(`^${id}`)} }, { name: {$regex: new RegExp(`^${id}`)} }]}).select('-password -userType');
        if (user) {
            return res.status(200).json({
                data: user,
                state: "Success"
            })
        } else {
            return res.status(200).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error });
    }
    
})

//User Recommendation
router.get('/UserRecommendation/', async (req, res) => {

    const currUser = await User.findOne({tweetID: req.session.userid})
    console.log(currUser)
    const followingLists = currUser.followings
    const User_Recommend = await User.find({tweetID: {$nin : followingLists}, followers : {$in : followingLists}}).select('-password -userType')
    return res.status(200).json({User_Recommend})
  
  })


module.exports = router