const express = require('express')
const Counter = require('../model/Counter')
const {
    initializeDB,
    initizalizedRetweetID,
    resetRetweetID,
} = require('../controller/initizalizer')

router = express.Router()

router.post('/setup', (req, res)=>{

    Counter.findOne({TargetToCount: "Tweet"}).then((counter)=>{
        if (counter) {
            return res.status(400).json({error: "Counter already exist"})
        } else {

            (async () => {
                await initializeDB()
            })()
            

            return res.status(200).json({message:"sucess"})
        }
})
})

router.post('/initizalizeRetweetIDInUser', (req, res) => {
    (async() => {

        await initizalizedRetweetID()

    })()

    return res.status(200).json({message: "success"})
})


module.exports = router