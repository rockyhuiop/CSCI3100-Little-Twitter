const express = require('express')
router = express.Router()

router.get('/game', (req, res) =>{
    console.log(req.path)
    res.status(200).send('ok')
})

router.post('/game', (req, res) => {
    console.log('POST')
    res.status(201).send('POST received')
})

//demo for showing controller, check out foodController.js
const { getFood } = require('../controller/foodController.js')
router.get('/food', getFood)

module.exports = router