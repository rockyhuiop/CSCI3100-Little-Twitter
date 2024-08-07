const express = require('express')
const User = require('../model/User.js')
const Follow = require('../model/Follow.js')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({
        state: "Success",
        data: {}
    })
})

//login
router.post('/', async (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    try {
        // check if the email exists
        const user_pw = await User.findOne({
            $or: [{ email: req.body.email }, { tweetID: req.body.email }]
          }).select("+password");
        if (user_pw) {
            //check if password matches
            const result = req.body.password === user_pw.password;
            //save in session
            const user = await User.findOne({
                $or: [{ email: req.body.email }, { tweetID: req.body.email }]
              }).select("-password");
            req.session.name = user.name
            req.session.userid = user.tweetID
            req.session.userType = user.userType
            if (result) {
                return res.status(200).json({state: "Success", data: user});
            } else {
                return res.status(401).json({error: "password doesn't match" });
            }

           

        } else {
            return res.status(401).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }

})

module.exports = router