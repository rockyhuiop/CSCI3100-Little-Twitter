const express = require('express')
const Conversation = require("../model/Conversation")

router = express.Router()


//new conversation

router.post("/", (req, res) => {
    (async() => {

        const newConversation = new Conversation({
            members:[req.body.senderID, req.body.receiverID]
        })
    
        try{
            const savedConverstaion = await newConversation.save()
            res.status(200).json(savedConverstaion)
        }catch(err){
            res.status(500).json(err)
        }

    }
    )()
        
    
})

//get conersation by logged in user

router.get("/:userID", (req, res) => {
    (async() => {
        const {userID:userID} = req.params
        try{
            const conversation = await Conversation.find({
                members : {$in: [userID]},
            })
            res.status(200).json(conversation)
        }catch(err){
            res.status(500).json(err)
        }
    })()

})

//get conversation by both logged in users and his friends
router.get("/search/:firstUserID/:secondUserID", (req, res) => {
    (async() => {
        const {firstUserID:firstUserID, secondUserID: secondUserID} = req.params
        try{
            const conversation = await Conversation.findOne({
                members : {$all: [firstUserID, secondUserID]},
            })
            res.status(200).json(conversation)
        }catch(err){
            res.status(500).json(err)
        }
    })()

})

module.exports = router