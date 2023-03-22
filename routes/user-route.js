const express = require('express')
const User = require('../model/User.js')

router = express.Router()

router.get('/', async (req, res)=>{
    //can query by name
    let name = req.query.name
    try {
        let user = await User.find({ name: name}, 'name tweetID');
        if (user) {
            return res.status(200).json({
                data: user,
                state: "Success"
            })
        } else {
            return res.status(200).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error });
    }
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params
    try {
        let user = await User.findOne({ tweetID: id}).select('-password');
        if (user) {
            return res.status(200).json({
                data: user,
                state: "Success"
            })
        } else {
            return res.status(200).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error });
    }
    
})

//follow user
router.post('/:id', async(req, res)=>{
    const { id } = req.params
    try {

        let follow_user = await User.findOne({ tweetID: id}).select('-password');
        let user = await User.findOne({ tweetID: req.session.userid}).select('-password');
        
        // either follow or unfollow, check user exist
        if (follow_user) {
            if(follow_user.followers.includes(user.tweetID)){
                follow_user.followers.pop(user.tweetID)
            }else{
                follow_user.followers.push(req.session.userid)
            }
        } else {
            return res.status(400).json({ error: "User you try to follow doesn't exist" });
        }
        
        //authenticate the session
        if (user){
            if(user.followings.includes(follow_user.tweetID)){
                user.followings.pop(follow_user.tweetID)
            }else{
                user.followings.push(follow_user.tweetID)
            }
        }else{
            return res.status(401).json({ error: "Not authenticated" });
        }
        
        await follow_user.save()
        await user.save()

        return res.status(200).json({
            state: "Success"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error });
    } 
})
module.exports = router
