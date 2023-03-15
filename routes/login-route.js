const express = require('express')
const User = require('../model/User.js')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({
        state: "Success",
        data: {}
    })
})

router.post('/', async (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    try {
        // check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            //check if password matches
            const result = req.body.password === user.password;
            //save in session
            req.session.userid = user.tweetID
            if (result) {
                return res.status(200).redirect(`https://${req.headers.host}/home`)
            } else {
                return res.status(400).json({error: "password doesn't match" });
            }
        } else {
            return res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }

})

module.exports = router