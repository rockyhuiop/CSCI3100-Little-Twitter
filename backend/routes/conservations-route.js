const express = require('express')
const Conversation = require("../model/Conversation")
const User = require('../model/User.js')

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

router.get("/search/:firstUserID", (req, res) => {

    (async() => {
        const {firstUserID:firstUserID} = req.params
        try{
            const conversation = await Conversation.find({
                members : {$in: [firstUserID]},
            })
            console.log(conversation)
            console.log(conversation.length)
            var conservatedUserID = []
            var conservatedmember = []
            for (let i = 0, len = conversation.length; i<len; i++){
                conservatedmember = conversation[i].members
                
                if (conservatedmember[0] == firstUserID){
                    conservatedUserID.push(conservatedmember[1])
                }else{
                    conservatedUserID.push(conservatedmember[0])
                }
            }
            const user = await User.find({tweetID: {$in: conservatedUserID}})
            res.status(200).json({data: user})
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    })()

})

//creating the conversation for inputed IDs

router.post("/create/:firstUserID/:secondUserID", (req, res) => {
    (async() => {
        const {firstUserID:firstUserID, secondUserID: secondUserID} = req.params
        try{
            const conversation = new Conversation({
                members: [firstUserID, secondUserID]
            })
            await conversation.save()
            res.status(200).json(conversation)
        }catch(err){
            res.status(500).json(err)
        }

    })()
})

module.exports = router