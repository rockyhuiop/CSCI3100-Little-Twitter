const express = require('express')

router = express.Router()

router.get('/:id',(req, res)=>{
    const { id } = req.params
    console.log(`${id}`)
    res.status(200).send(`<h1>${id}</h1>`)
})

module.exports = router
