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
        let user = await User.find({ $or: [{ tweetID: id }, { name: id }]}).select('-password -userType');
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


module.exports = router