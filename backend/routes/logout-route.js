const express = require('express')
const User = require('../model/User.js')
const Follow = require('../model/Follow.js')

router = express.Router()

//logout
router.get('/', async (req, res)=>{
    console.log('user logout')
    let user_id = req.session.userid
    req.session.destroy()
    
    let user = await User.findOne({tweetID: user_id})

    if(user){
        try {
            if(user.followers){
                await Follow.updateOne({tweetID: user_id},{tweetID: user.tweetID, followers: user.followers },{upsert: true})
            }
        } catch (error){
            return res.status(500).json({error: "failed to save user status"})
        }

    }else{
        return res.status(200).json({error: "cannot save user info"})
    }
    return res.status(200).json({
        state: "Success",
    })
})

module.exports = router