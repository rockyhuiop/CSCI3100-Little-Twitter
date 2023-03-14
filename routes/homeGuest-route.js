const express = require('express')
router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>guest in home</h1>`)
})

module.exports = router