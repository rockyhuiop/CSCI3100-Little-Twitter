const express = require('express')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({state: "Sucess", data: {}})
})

module.exports = router

