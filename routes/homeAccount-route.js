const express = require('express')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>logged in Home page</h1>`)
})

module.exports = router