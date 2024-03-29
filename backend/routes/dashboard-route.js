const express = require('express')
const User = require('../model/User.js')
const {
    AdminDelTweet,
    AdminDelComment,
} = require('../controller/tweet.js')


router = express.Router()

//middleware checking if the user is admin
router.use((req, res, next)=>{
    if(req.session.userType !== "admin"){
        return res.status(401).json({error: "No permission"})
    }
    next()
})

router.get('/', async (req, res)=>{

    let user = await User.find({})

    return res.status(200).json({
        data: user,
        state: "Success"
    }) 
})



//ADMIN Funciton : Delete Tweet by userID
router.delete('/AdminDeleteTweet/:userID', (req, res) => {

    (async() => {
        const AdminUserID = req.session.userid
        const {userID:userID} = req.params

        const result = await AdminDelTweet(AdminUserID, userID)

        if (result){
            res.status(200).json({
                state: "Success"
            })
        }else{
            res.status(400).json({
                state: "fail", 
                message: "You are not authorized to delete the tweet"
            })
        }

    })()

})

//ADMIN Funciton : Delete Comment by userID
router.delete('/AdminDeleteComment/:userID', (req, res) => {

    (async() => {
        const AdminUserID = req.session.userid
        const {userID:userID} = req.params

        const result = await AdminDelComment(AdminUserID, userID)

        if (result){
            res.status(200).json({
                state: "Success"
            })
        }else{
            res.status(400).json({
                state: "fail", 
                message: "You are not authorized to delete the tweet"
            })
        }

    })()

})

router.delete('/:tweetID', async (req, res)=>{
    //check if user is admin
    if(req.session.userType !== "admin"){
        return res.status(401).json({error: "No permission"})
    }

    console.log(req.params.tweetID)
    let result = await User.deleteOne({tweetID: req.params.tweetID})

    await User.updateMany({}, { $pull: { followers: req.params.tweetID, followings: req.params.tweetID } }).then(result => {
        console.log(`Deleted ${result.nModified} instances of 'stringToDelete'`);
      }).catch(err => {
        console.log(err);
        return res.status(500).json({error: "Server error"})
      });

    try {
        await AdminDelTweet(req.session.userid, req.params.tweetID)
        await AdminDelComment(req.session.userid, req.params.tweetID)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({error: "Server error"})
    }

    return res.status(200).json({
        data: result,
        state: "Success"
    }) 
})

module.exports = router