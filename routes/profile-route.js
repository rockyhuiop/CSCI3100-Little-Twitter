const express = require('express')
const User = require('../model/User.js')
//setting options for multer
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router = express.Router()

router.get('/', async (req, res)=>{
    try {
        let user = await User.findOne({ tweetID: req.session.userid}).select('-password');
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

router.post('/update', upload.fields([{ name: "avatar" }, { name: "banner" }]) ,async (req, res)=>{
    // req.file can be used to access all file properties
  try {
    let user = await User.findOne({ tweetID: req.session.userid});

    let {name, email, password} = req.body
    //check if the request has an image or not
    if (!req.files.avatar || !req.files.banner) {
      return res.status(400).json({
        error: "both file is needed"
      });
    } else {
      user.avatar.data = req.files['avatar'][0].buffer
      user.avatar.contentType = req.files['avatar'][0].mimetype
      // saving the object into the database
      user.banner.data = req.files['banner'][0].buffer
      user.banner.contentType = req.files['banner'][0].mimetype
      
    }
    if(name){
        user.name = name
    }
    if(email){
        user.email = email 
    }
    if(password){
        user.password = password
    }

    await user.save()
    return res.status(200).json({
        state: "Success",
        data: user
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})

module.exports = router

