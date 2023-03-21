const express = require('express')
const User = require('../model/User.js')

router = express.Router()

router.get('/',(req, res)=>{
    return res.status(200).send(`<h1>user page</h1>`)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    try {
        let user = await User.find({ tweetID: id}).select('-password');
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
