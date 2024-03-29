const express = require('express')
const Message = require("../model/Message")

router = express.Router()

//add message

router.post('/', (req, res) => {
    (async() => {
        const newMessage = new Message(
            {
                conversationID : req.body.conversationID,
                sender : req.body.sender,
                text : req.body.text
            }
        )

        try {
            console.log(req.body)
            const savedMessage = await newMessage.save()
            res.status(200).json(savedMessage)
        }catch(err){
            res.status(500).json(err)
        }
    })()
    
})

//get message

router.get('/:conversationID', (req, res) => {

    (async() => {
        const {conversationID: conversationID} = req.params
        try{
            const messages = await Message.find({
                conversationID: conversationID,
            })
            res.status(200).json(messages)
        }catch(err){
            res.status(500).json(err)
        }
    })()
})

module.exports = router