const express = require('express')
const User = require('../model/User.js')

router = express.Router()

router.get('/', (req, res)=>{
    console.log('user logout')
    req.session.destroy()
    res.status(200).json({
        state: "Success",
    })
})

module.exports = router