const express = require('express')

router = express.Router()

router.get('/:id', (req, res)=>{
    res.status(200).send(`<h1>Chatbox page</h1>`)
})