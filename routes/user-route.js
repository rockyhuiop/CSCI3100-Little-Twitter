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
    let user = User.findOne({tweetID: id})

    if(user.followers.includes(req.session.userid)){
        await User.updateOne(
            { tweetID: id },
            { $pull: { followers : req.session.userid } },
            function(err, result) {
                if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server error" })
                } else if (result.nModified === 0) {
                console.log('No documents were modified.');
                return res.status(400).json({ error: "no user found" })
                }
            }
        );
    
        await User.updateOne(
            { tweetID: req.session.id },
            { $pull: { followings : id } },
            function(err, result) {
                if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server error" })
                } else if (result.nModified === 0) {
                console.log('No documents were modified.');
                return res.status(400).json({ error: "no user found" })
                }
            }
        );
    }else{
        await User.updateOne(
            { tweetID: id },
            { $push: { followers : req.session.userid } },
            function(err, result) {
                if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server error" })
                } else if (result.nModified === 0) {
                console.log('No documents were modified.');
                return res.status(400).json({ error: "no user found" })
                }
            }
        );
    
        await User.updateOne(
            { tweetID: req.session.id },
            { $push: { followings : id } },
            function(err, result) {
                if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server error" })
                } else if (result.nModified === 0) {
                console.log('No documents were modified.');
                return res.status(400).json({ error: "no user found" })
                }
            }
        );
    }
    
    return res.status(200).json({
        state: "Success"
    })

})

module.exports = router
