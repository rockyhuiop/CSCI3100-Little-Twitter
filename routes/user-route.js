const express = require('express')
const User = require('../model/User.js')
const Tweet = require("../model/Tweet.js")

router = express.Router()

router.get('/', async (req, res)=>{
    //can query by name
    let name = req.query.name
    try {
        let user = await User.find({ name: name}, '-password -userType');
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

router.post('/bookmark/:tweet_post_ID', async (req, res) =>{
    const { tweet_post_ID } = req.params;
    let tweet = await Tweet.findOne({ tweetID: tweet_post_ID });
    let user = await User.findOne({tweetID: req.session.userid})

    if(tweet === undefined){
        return res.status(400).json({error:"no tweet found"})
    }
    
    if(user.bookmark !== undefined && user.bookmark.includes(tweet_post_ID)){
        const result1 = await User.updateOne(
            { "tweetID": req.session.userid },
            { $pull: { "bookmark": tweet_post_ID } }
          );
    
        if (result1.nModified === 0) {
            return res.status(400).json({ error: "no user found" });
        }
    }else{
        const result2 = await User.updateOne(
            { "tweetID": req.session.userid },
            { $push: { "bookmark": tweet_post_ID } }
          );
    
        if (result2.nModified === 0) {
            return res.status(400).json({ error: "no user found" });
        }
    }
    let user_end = await User.findOne({tweetID: req.session.userid})
    return res.status(200).json({state:"Success", data: user_end.bookmark})
})


//follow user
router.post('/follow/:id', async (req, res) => {
    const { id } = req.params;
    let user = await User.findOne({ tweetID: id });
  
    try {
      if (user.followers !== undefined && user.followers.includes(req.session.userid)) {
        const result1 = await User.updateOne(
          { "tweetID": id },
          { $pull: { "followers": `${req.session.userid}` } }
        );
  
        if (result1.nModified === 0) {
          return res.status(400).json({ error: "no user found" });
        }
  
        const result2 = await User.updateOne(
          { "tweetID": req.session.userid },
          { $pull: { "followings": `${id}` } }
        );
  
        if (result2.nModified === 0) {
          return res.status(400).json({ error: "no user found" });
        }
      } else {
        const result3 = await User.updateOne(
          { "tweetID": id },
          { $push: { "followers": `${req.session.userid}` } }
        );
  
        if (result3.nModified === 0) {
          return res.status(400).json({ error: "no user found" });
        }
  
        const result4 = await User.updateOne(
          { "tweetID": req.session.userid },
          { $push: { "followings": `${id}` } }
        );
  
        if (result4.nModified === 0) {
          return res.status(400).json({ error: "no user found" });
        }
      }

      return res.status(200).json({
        state: "Success",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  });


//find user
router.get('/:id', async (req, res)=>{
    const { id } = req.params
    try {
        let user = await User.findOne({ tweetID: id}).select('-password -userType');
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
