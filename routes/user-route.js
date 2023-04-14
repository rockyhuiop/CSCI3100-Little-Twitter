const express = require('express')
const User = require('../model/User.js')
const Tweet = require("../model/Tweet.js")
const Follow = require("../model/Follow.js")

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

    if(tweet === null){
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


//get update
router.get('/notification' , async(req, res) =>{
    let user_follow = await Follow.findOne({tweetID: req.session.userid})
    let user = await User.findOne({tweetID: req.session.userid})
    let old_list;
    let new_list;

    if(user_follow === null || user_follow.followers === null){
        old_list = []
    }else{
        old_list = user_follow.followers
    }

    if(user === undefined){
        return res.status(400).json({error: "no user found"})
    }

    if(user.followers === undefined){
        new_list = []
    }else{
        new_list = user.followers
    }
    
    const set1 = new Set(new_list);
    const set2 = new Set(old_list);
    let new_followers = []

    for (const element of set1) {
        if (!set2.has(element)) {
            new_followers.push(element)
        }
    }

    let new_followers_detail = [];
    for (let i = 0; i<new_followers.length; i++){
        let user_info = await User.findOne({tweetID: new_followers[i]}).select("tweetID name")
        new_followers_detail.push(user_info)
    }

    return res.status(200).json({data: new_followers_detail})
})

//get user followings

router.get('/followings/:id', async(req, res) => {
    const {id} = req.params
    try{
      let user = await User.findOne({tweetID: id})
      if (user) {
        const followings = await Promise.all(
          user.followings.map((userID) => {
            return User.findOne({tweetID: userID})
          })
        )
        let followingslist = []
        followings.map((followinguser) => {
          const {tweetID, name, avastar} = followinguser
          followingslist.push({tweetID, name, avastar})
        })
        return res.status(200).json({followingslist})
      }else{
        return res.status(200).json({error: "User doesn't exist"})
      }
    }catch (error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  })

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

//User Recommendation
router.get('/recommendation', async (req, res) => {

  console.log("done")

  const currUser = await User.findOne({tweetID: req.session.userid})
  const followingLists = currUser.followings
  const User_Recommend = await User.find({followers : {$in : followingLists}})
  return res.status(200).json({User_Recommend})

})



module.exports = router
