const express = require('express')
const User = require('../model/User.js')

router = express.Router()

router.get('/', async (req, res)=>{
    //can query by name
    let name = req.query.name
    try {
        let user = await User.find({ name: name}, 'name tweetID');
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

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    try {
        let user = await User.findOne({ tweetID: id}).select('-password');
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

//follow user
router.post('/:id', async (req, res) => {
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

module.exports = router
