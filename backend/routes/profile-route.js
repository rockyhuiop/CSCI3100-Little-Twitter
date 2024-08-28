const express = require('express')
const User = require('../model/User.js')
//setting options for multer
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  })
  
const upload = multer({ storage })

router = express.Router()

//get user
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

//update profile
router.post('/update', upload.fields([{ name: "avatar" }, { name: "banner" }]) ,async (req, res)=>{
    // req.file can be used to access all file properties
  try {
    let user = await User.findOne({ tweetID: req.session.userid});

    let {name, email, password, biography } = req.body

    if(req.files.avatar){
        if(user.avatar){
            fs.unlink(path.resolve(user.avatar), (err) => {
                if (err) {
                console.error(err);
                }
                console.log('File deleted successfully');
            });
        }
        user.avatar = req.files['avatar'][0].path
    }
    if(req.files.banner){
        if(user.banner){
            fs.unlink(path.resolve(user.banner), (err) => {
                if (err) {
                    console.error(err);
                }
                console.log('File deleted successfully');
            });
        }
        user.banner = req.files['banner'][0].path
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
    if(biography){
        user.biography = biography
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

