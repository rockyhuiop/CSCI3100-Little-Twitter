const express = require('express')
router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({state: "Success", data: {}})
})

module.exports = router