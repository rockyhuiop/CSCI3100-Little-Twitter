const Tweet = require ('../model/Tweet')
const User = require ('../model/User')
const Comment = require("../model/Comment")
const Counter = require('../model/Counter')

const {
    IncreTweetCount,
    IncreCommentCount,
} = require('../controller/counter')

const nextTweetID = async () => { 
    const TweetCounter = await Counter.findOne({TargetToCount:"Tweet"})
    const totalTweetCount = TweetCounter.Counter
    return totalTweetCount
}

const nextCommentID = async () => { 
    const CommentCounter = await Counter.findOne({TargetToCount:"Comment"})
    const totalCommentCount = CommentCounter.Counter
    return totalCommentCount
}

const CreateTweet = async (userID, body, files) => {

    const Content = body.Content
    const UrlList = body.UrlList

    if (Content == undefined){
        Content = ""
    }

    var tweetCount = await nextTweetID()
    tweetCount = tweetCount +1

    const d = new Date()
    
    const newTweet = new Tweet({
        tweetID : tweetCount,
        CreateTime : d,
        CreatorUserID : userID,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        ReTweetCount:0,
        SuspensionStatus: false
    })

    if (UrlList !== undefined){
        newTweet.UrlList = UrlList
    }

    if (files !== undefined && files.length > 0){

        var ImageList = []

        for (let i = 0, len = files.length; i<len; i++){
            ImageList.push(files[i].path)
        }

        newTweet.ImageList = ImageList

    }

    await newTweet.save()

    //Increment the Tweet Counter
    await IncreTweetCount()

}

const RecordRetweetID = async(userid, retweetID) => {
    const Creator = await User.findOne({tweetID: userid})
    Creator.retweetedTweetID.push(retweetID)
    await Creator.save()
}

const ReTweet = async (retweetID,userid, body, files) => {

    const Content = body.Content
    const UrlList = body.UrlList

    if (Content == undefined){
        Content = ""
    }

    var tweetCount = await nextTweetID()
    tweetCount = tweetCount +1

    const d = new Date()

    const newTweet = new Tweet({
        tweetID : tweetCount,
        CreateTime : d,
        CreatorUserID : userid,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        ReTweetCount:0,
        ReTweetID: retweetID,
        SuspensionStatus: false
    })

    if (UrlList !== undefined){
        newTweet.UrlList = UrlList
    }

    if (files !== undefined && files.length > 0){

        var ImageList = []

        for (let i = 0, len = files.length; i<len; i++){
            ImageList.push(files[i].path)
        }

        newTweet.ImageList = ImageList

    }


    await newTweet.save()

    //Increment Retweet Count
    await IncreReTweetCount(retweetID)

    //Increment the Tweet Counter
    await IncreTweetCount()

    //Record the Retweet Tweet ID
    await RecordRetweetID(userid, retweetID)

}

const CreateComment = async (tweetID, userid, body) => {
    
    var Content = body.Content
    const UrlList = body.UrlList

    if (Content == undefined){
        Content = ""
    }
    
    var commentCount = await nextCommentID()
    commentCount = commentCount +1

    const d = new Date()
    
    const newComment = new Comment({
        commentID : commentCount,
        CreateTime : d,
        CreatorUserID : userid,
        corrTweetID : tweetID,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        SuspensionStatus: false
    })

    if (UrlList !== undefined){
        newComment.UrlList = UrlList
    }

    await newComment.save()

    //Increment the Comment Counter
    await IncreCommentCount()

}

const ReplyComment = async (commentID, userid, body) => {

    const Content = body.Content
    const UrlList = body.UrlList

    if (Content == undefined){
        Content = ""
    }

    var commentCount = await nextCommentID()
    commentCount = commentCount +1

    const d = new Date()
    
    const newComment = new Comment({
        commentID : commentCount,
        CreateTime : d,
        CreatorUserID : userid,
        corrCommentID : commentID,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        SuspensionStatus: false
    })

    if (UrlList !== undefined){
        newComment.UrlList = UrlList
    }

    await newComment.save()

    //Increment the Comment Counter
    await IncreCommentCount()

}

const AmendTweetLike = async (tweetID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const tweet = await Tweet.findOne({tweetID : tweetID})
    if (RelatedUser){
        // amend the user liked tweet list and tweet like count
        if(RelatedUser.likedTweetID.includes(tweetID)){

            const index = RelatedUser.likedTweetID.indexOf(tweetID)
            RelatedUser.likedTweetID.splice(index, 1)
            
            tweet.LikeCount = tweet.LikeCount - 1

        }else{
            RelatedUser.likedTweetID.push(tweetID)
            tweet.LikeCount = tweet.LikeCount + 1

            if(RelatedUser.dislikedTweetID.includes(tweetID)){

                const index = RelatedUser.dislikedTweetID.indexOf(tweetID)
                RelatedUser.dislikedTweetID.splice(index, 1)
                
                tweet.DisLikeCount = tweet.DisLikeCount - 1
            }

        }

        await RelatedUser.save()
        await tweet.save()

        return ({
            LikeCount: tweet.LikeCount,
            DisLikeCount: tweet.DisLikeCount,
        })

    }
}

const AmendTweetDisLike = async (tweetID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const tweet = await Tweet.findOne({tweetID : tweetID})
    if (RelatedUser){
        // amend the user liked tweet list and tweet like count
        if(RelatedUser.dislikedTweetID.includes(tweetID)){

            const index = RelatedUser.dislikedTweetID.indexOf(tweetID)
            RelatedUser.dislikedTweetID.splice(index, 1)
            
            tweet.DisLikeCount = tweet.DisLikeCount - 1

        }else{
            RelatedUser.dislikedTweetID.push(tweetID)
            tweet.DisLikeCount = tweet.DisLikeCount + 1

            if(RelatedUser.likedTweetID.includes(tweetID)){

                const index = RelatedUser.likedTweetID.indexOf(tweetID)
                RelatedUser.likedTweetID.splice(index, 1)
                
                tweet.LikeCount = tweet.LikeCount - 1
            }

        }

        await RelatedUser.save()
        await tweet.save()

        return ({
            LikeCount: tweet.LikeCount,
            DisLikeCount: tweet.DisLikeCount,
        })
    }
}

const IncreReTweetCount = async(retweetID) => {
    const retweet = await Tweet.findOne({tweetID: retweetID})
    retweet.ReTweetCount = retweet.ReTweetCount + 1
    await retweet.save()
}

const EditTweetContent= async (tweetID, body) => {
    const content = body.Content
    const UrlList = body.UrlList
    const tweet = await Tweet.findOne({tweetID : tweetID})
    if (content !== undefined){
        tweet.Content = content
    } 
    if (UrlList !== undefined){
        tweet.UrlList = UrlList
    }
    await tweet.save()
}

const EditCommentContent= async (commentID, body) => {
    const content = body.Content
    const UrlList = body.UrlList
    const comment = await Comment.findOne({commentID : commentID})
    if (content !== undefined){
        comment.Content = content
    }
    if (UrlList !== undefined){
        comment.UrlList = UrlList
    }
    await comment.save()
}

const AmendCommentLike = async (commentID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const comment = await Comment.findOne({commentID : commentID})
    if (RelatedUser){
        // amend the user liked comment list and tweet like count
        if(RelatedUser.likedCommentID.includes(commentID)){

            const index = RelatedUser.likedCommentID.indexOf(commentID)
            RelatedUser.likedCommentID.splice(index, 1)
            
            comment.LikeCount = comment.LikeCount - 1

        }else{
            RelatedUser.likedCommentID.push(commentID)
            comment.LikeCount = comment.LikeCount + 1

            if(RelatedUser.dislikedCommentID.includes(commentID)){

                const index = RelatedUser.dislikedCommentID.indexOf(commentID)
                RelatedUser.dislikedCommentID.splice(index, 1)
                
                comment.DisLikeCount = comment.DisLikeCount - 1
            }

        }

        await RelatedUser.save()
        await comment.save()

        return ({
            LikeCount: comment.LikeCount,
            DisLikeCount: comment.DisLikeCount,
        })
        
    }
}

const AmendCommentDisLike = async (commentID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const comment = await Comment.findOne({commentID : commentID})
    if (RelatedUser){
        // amend the user liked comment list and tweet like count
        if(RelatedUser.dislikedCommentID.includes(commentID)){

            const index = RelatedUser.dislikedCommentID.indexOf(commentID)
            RelatedUser.dislikedCommentID.splice(index, 1)
            
            comment.DisLikeCount = comment.DisLikeCount - 1

        }else{
            RelatedUser.dislikedCommentID.push(commentID)
            comment.DisLikeCount = comment.DisLikeCount + 1

            if(RelatedUser.likedCommentID.includes(commentID)){

                const index = RelatedUser.likedCommentID.indexOf(commentID)
                RelatedUser.likedCommentID.splice(index, 1)
                
                comment.LikeCount = comment.LikeCount - 1
            }

        }

        await RelatedUser.save()
        await comment.save()

        
        return ({
            LikeCount: comment.LikeCount,
            DisLikeCount: comment.DisLikeCount,
        })
    }
}

const DelComment = async(commentID, userID) => {
    const comment = await Comment.findOne({commentID : commentID})
    const user = await User.findOne({tweetID : userID})
    if (comment.CreatorUserID == userID || user.userType == 'admin'){
        await comment.deleteOne()
        // Update likedCommentID/dislikedCommentID List of each user
        RemovelikeCommentID(commentID)
        RemovedislikeCommentID(commentID)
        return true
    } else {
        return false
    }
}

const DelTweet = async(tweetID, userID) => {
    const tweet = await Tweet.findOne({tweetID : tweetID})
    const user = await User.findOne({tweetID : userID})
    if (tweet.CreatorUserID == userID || user.userType == 'admin'){
        await tweet.deleteOne()
        // Update likedTweetID/dislikedTweetID List of each user
        RemovelikeTweetID(tweetID)
        RemovedislikeTweetID(tweetID)
        return true
    } else {
        return false
}
}

const AdminDelTweet = async(adminUserID, userID) => {
    const ReqUser = await User.findOne({tweetID: adminUserID})
    if (ReqUser.userType == 'admin'){
        const filter = {CreatorUserID : userID}
        const result = await Tweet.deleteMany(filter,{multi: true})
        console.log(result)
        return true
    }else{
        return false
    }

    
}

const AdminDelComment = async(adminUserID, userID) => {
    const ReqUser = await User.findOne({tweetID: adminUserID})
    if (ReqUser.userType == 'admin'){
        const filter = {CreatorUserID : userID}
        const result = await Comment.deleteMany(filter,{multi: true})
        console.log(result)
        return true
    }else{
        return false
    }

    
}

const RemovelikeTweetID = async(tweetID) => {
    const filter = {likedTweetID : {$in : [tweetID]}}
    const query = {$pull:{likedTweetID :tweetID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const RemovedislikeTweetID = async(tweetID) => {
    const filter = {dislikedTweetID : {$in : [tweetID]}}
    const query = {$pull:{dislikedTweetID :tweetID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const RemovelikeCommentID = async(commentID) => {
    const filter = {likedCommentID : {$in : [commentID]}}
    const query = {$pull:{likedCommentID :commentID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const RemovedislikeCommentID = async(commentID) => {
    const filter = {dislikedCommentID : {$in : [commentID]}}
    const query = {$pull:{dislikedCommentID :commentID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const TweetCommentCount = async(tweetID) => {
    var commentCount = 0
    const CommentList = await Comment.find({corrTweetID: tweetID, SuspensionStatus:false})

    commentCount += CommentList.length

    var ReplyCommentList = []
    for (let i = 0, len = CommentList.length; i<len; i++){
        ReplyCommentList = await Comment.find({corrCommentID: CommentList[i].commentID, SuspensionStatus:false})
        commentCount += ReplyCommentList.length
    }

    return commentCount
}

const FetchFollowing = async(userID) => {
    const targetUser = await User.findOne({tweetID:userID})
    const followings = targetUser.followings
    return followings
}

const FetchReplyComment = async(commentID) => {

    const FetchReplyCommentList = await Comment.find({corrCommentID:commentID, SuspensionStatus:false})

    var ReplyCommentList = []
    var replyComment = {}

    for (let i = 0, len = FetchReplyCommentList.length; i<len; i++){

        var fetchReplyComment = FetchReplyCommentList[i]

        const Creator = await User.findOne({tweetID:fetchReplyComment.CreatorUserID})
        const CreatorUserName = Creator.name

        replyComment = {
            CommentID: fetchReplyComment.commentID,
            CorrCommentID: fetchReplyComment.corrCommentID,
            CreatorUserID: fetchReplyComment.CreatorUserID,
            CreatorUserName: CreatorUserName,
            CreatTime : fetchReplyComment.CreateTime,
            Content: fetchReplyComment.Content,
            LikeCount: fetchReplyComment.LikeCount,
            DisLikeCount: fetchReplyComment.DisLikeCount,
        }

        if (fetchReplyComment.UrlList !== undefined){
            replyComment["UrlList"] = fetchReplyComment.UrlList
        }

        ReplyCommentList.push(replyComment)

    }

    return ReplyCommentList
}

const FetchComment = async(commentID) => {
    const targetComment = await Comment.find({commentID: commentID, SuspensionStatus: false})
    
    var fetchedCommet = []
    
    if (targetComment.length > 0){

        const Creator = await User.findOne({tweetID:targetComment[0].CreatorUserID})
        const CreatorUserName = Creator.name

        const Commentobj = {
            CommentID: targetComment[0].commentID,
            CreatorUserID: targetComment[0].CreatorUserID,
            CreatorUserName: CreatorUserName,
            CreatTime : targetComment[0].CreateTime,
            Content: targetComment[0].Content,
            LikeCount: targetComment[0].LikeCount,
            DisLikeCount: targetComment[0].DisLikeCount,
        }

        //finding the corrTweetID
        if ( targetComment[0].corrTweetID !== undefined){
            Commentobj['CorrTweetID'] = targetComment[0].corrTweetID
        }else{
            const ParentComment = await Comment.findOne({CommentID: targetComment[0].corrCommentID})
            Commentobj['CorrTweetID'] = ParentComment.corrTweetID
            Commentobj['CorrCommentID'] =  targetComment[0].corrCommentID
        }

        //collecting the reply accordingly
        const ReplyCommentList = await FetchReplyComment(targetComment[0].commentID)

        Commentobj['ReplyComment'] = ReplyCommentList

        fetchedCommet.push(Commentobj)
    }

    return fetchedCommet
}

const FetchTweetComment = async(tweetID) => {
    const FetchCommentList = await Comment.find({corrTweetID:tweetID, SuspensionStatus:false})
    
    var CommentList = []
    var comment = {}

    //collecting the related comment accordingly

    for (let i = 0, len = FetchCommentList.length; i<len; i++){

        var fetchComment = FetchCommentList[i]

        const Creator = await User.findOne({tweetID:fetchComment.CreatorUserID})
        const CreatorUserName = Creator.name

        comment = {
            CommentID: fetchComment.commentID,
            CorrTweetID: fetchComment.corrTweetID,
            CreatorUserID: fetchComment.CreatorUserID,
            CreatorUserName: CreatorUserName,
            CreatTime : fetchComment.CreateTime,
            Content: fetchComment.Content,
            LikeCount: fetchComment.LikeCount,
            DisLikeCount: fetchComment.DisLikeCount,
        }

        if (fetchComment.UrlList !== undefined){
            comment["UrlList"] = fetchComment.UrlList
        }

        //collecting the reply accordingly

        const ReplyCommentList = await FetchReplyComment(fetchComment.commentID)

        comment['ReplyComment'] = ReplyCommentList

        CommentList.push(comment)

    }

    return CommentList

}

const FetchTweet = async(tweetID) => {
    const FetchTweetList = await Tweet.find({tweetID:tweetID, SuspensionStatus:false})
    var TweetList = []
    var tweet = {}
    // collecting the tweet from the followings

    for (let i = 0, len = FetchTweetList.length; i<len; i++){

        var fetchTweet = FetchTweetList[i]

        const Creator = await User.findOne({tweetID:fetchTweet.CreatorUserID})
        const CreatorUserName = Creator.name

        tweet = {
            TweetID: fetchTweet.tweetID,
            CreatorUserID : fetchTweet.CreatorUserID,
            CreatorUserName: CreatorUserName,
            CreateTime : fetchTweet.CreateTime,
            Content : fetchTweet.Content,
            LikeCount : fetchTweet.LikeCount,
            DisLikeCount : fetchTweet.DisLikeCount,
            ReTweetCount : fetchTweet.ReTweetCount,
            }

        //determine whether it is a retweet
        let reTweet =  fetchTweet.ReTweetID
        
        if (reTweet !== undefined){

            const ReTweetInfo = await Tweet.find({tweetID: fetchTweet.ReTweetID, SuspensionStatus:false})

            if (ReTweetInfo.length == 0){
                tweet['ReTweet'] = {
                    Status: "fail", 
                    message : "The Tweet is banned or removed!"
                }

            }else{

                const ReTweetCreator = await User.findOne({tweetID:ReTweetInfo[0].CreatorUserID})
                const ReTweetCreatorUserName = ReTweetCreator.name

                tweet['ReTweet'] = {
                    Status: "Success",
                    TweetID: ReTweetInfo[0].tweetID,
                    CreatorUserID: ReTweetInfo[0].CreatorUserID,
                    CreatorUserName: ReTweetCreatorUserName,
                    CreateTime : ReTweetInfo[0].CreateTime,
                    Content: ReTweetInfo[0].Content,
                }
            }

        }

        if (fetchTweet.UrlList !== undefined){
            tweet["UrlList"] = fetchTweet.UrlList
        }

        if (fetchTweet.ImageList !== undefined){
            tweet["ImageList"] = fetchTweet.ImageList
        }
        
        //collecting the related comments

        const CommentList = await FetchTweetComment(fetchTweet.tweetID)

        tweet['Comment'] = CommentList

        TweetList.push(tweet)

        }

    return TweetList
}

const AggregTweetSummary = async(fetchTweet, CreatorUserName, Avastar) => {

    var tweet = {}

    tweet = {
        TweetID: fetchTweet.tweetID,
        CreatorUserID : fetchTweet.CreatorUserID,
        CreatorUserName: CreatorUserName,
        CreatorAvastar: Avastar,
        CreateTime : fetchTweet.CreateTime,
        Content : fetchTweet.Content,
        LikeCount : fetchTweet.LikeCount,
        DisLikeCount : fetchTweet.DisLikeCount,
        ReTweetCount : fetchTweet.ReTweetCount,
        }

    //determine whether it is a retweet
    let reTweet =  fetchTweet.ReTweetID
    
    if (reTweet !== undefined){

        const ReTweetInfo = await Tweet.find({tweetID: fetchTweet.ReTweetID, SuspensionStatus:false})

        if (ReTweetInfo.length == 0){
            tweet['ReTweet'] = {
                Status: "fail", 
                message : "The Tweet is banned or removed!"
            }

        }else{

            const ReTweetCreator = await User.findOne({tweetID:ReTweetInfo[0].CreatorUserID})
            const ReTweetCreatorUserName = ReTweetCreator.name

            tweet['ReTweet'] = {
                Status: "Success",
                CreatorUserID: ReTweetInfo[0].CreatorUserID,
                CreatorUserName: ReTweetCreatorUserName,
                CreateTime : ReTweetInfo[0].CreateTime,
                Content: ReTweetInfo[0].Content,
            }
        }

    }

    if (fetchTweet.UrlList !== undefined){
        tweet["UrlList"] = fetchTweet.UrlList
    }

    if (fetchTweet.ImageList !== undefined){
        tweet["ImageList"] = fetchTweet.ImageList
    }

    //counting the related comments

    const commentCount  = await TweetCommentCount(fetchTweet.tweetID)

    tweet['CommentCount'] = commentCount

    return tweet
}


const FetchHomeTweet = async(userID) => {

    var FetchTweetList = []

    if (userID == ""){
        FetchTweetList = await Tweet.find({SuspensionStatus:false})
    }else{
        FetchTweetList = await Tweet.find({CreatorUserID:userID, SuspensionStatus:false})
    }

    var TweetList = []
    var tweet = {}
    // collecting the tweet from the followings

    for (let i = 0, len = FetchTweetList.length; i<len; i++){

        var fetchTweet = FetchTweetList[i]
        const Creator = await User.findOne({tweetID:fetchTweet.CreatorUserID})
        const CreatorUserName = Creator.name
        const Avastar = Creator.avatar

        tweet = await AggregTweetSummary(fetchTweet, CreatorUserName, Avastar)

        TweetList.push(tweet)

        }

    
    return TweetList

}

// Tweet Recommendation Functionality
const TweetRecommandation = async(relatedUserList) => {

    const targetUserID = relatedUserList[relatedUserList.length - 1]
    const targetUser = await User.findOne({tweetID: targetUserID})
    const DislikeTweetList = targetUser.dislikedTweetID

    var possibleTweet = []
    const filter = relatedUserList.length ? { CreatorUserID: { $nin: relatedUserList } } : {}
    filter["tweetID"] = {$nin : DislikeTweetList}
    filter["SuspensionStatus"] = false
    
    // fetching all tweets that the creator is not linked to the users
    possibleTweet = await Tweet.find(filter)
    console.log(possibleTweet)
    if (possibleTweet.length == 0){
        possibleTweet = await Tweet.find({CreatorUserID: { $ne : relatedUserList[relatedUserList.length-1]}, tweetID : {$nin : DislikeTweetList},SuspensionStatus: false})
    }

    // ranking the fetched tweets
    const TotalUser = await User.find({userType : {$ne : "admin"}})
    const TotalUserCount = TotalUser.length 
    const FollowingCount = relatedUserList.length - 1
    var RankedTweetList = []
    var fetchedTweet = {}
    var score = 0.0
    var commentCount = 0.0
    var FollowingLikeCount = 0
    var FollowingDisLikeCount = 0
    var LikedFollowingUserList = []
    var DisLikedFollowingUserList = []
    var LikedFollowingUserIDList = []
    var DisLikedFollowingUserIDList = []

    for (let i = 0, len = possibleTweet.length; i<len; i++){
        score = 0.0
        FollowingLikeCount = 0
        FollowingDisLikeCount = 0
        fetchedTweet = possibleTweet[i]
        // adding the score according to the like count and dislike count
        score += (fetchedTweet.LikeCount - fetchedTweet.DisLikeCount) * 2.0
        // adding the score according to the comment numbers (reflecting the activities)
        commentCount = await TweetCommentCount(fetchedTweet.tweetID)
        score += commentCount * 1.0
        // adding the score according to followings behaviors
        if (FollowingCount > 0){
            LikedFollowingUserList = await User.find({likedTweetID : {$in : [fetchedTweet.tweetID]}})
            LikedFollowingUserIDList = LikedFollowingUserList.map(user => user.tweetID)
            DisLikedFollowingUserList = await User.find({dislikedTweetID : {$in : [fetchedTweet.tweetID]}})
            DisLikedFollowingUserIDList = DisLikedFollowingUserList.map(user => user.tweetID)
            for (j = 0; j < FollowingCount; j++){
                if (relatedUserList[j] in LikedFollowingUserIDList){
                    FollowingLikeCount += 1
                }
                if (relatedUserList[j] in DisLikedFollowingUserIDList){
                    FollowingDisLikeCount += 1
                }
            }
            score += (FollowingLikeCount - FollowingDisLikeCount) * (TotalUserCount / FollowingCount)
        }

        RankedTweetList.push({
            tweetID: fetchedTweet.tweetID,
            score: score
        })

    }

    //sorting the tweetID by score
    RankedTweetList.sort((a,b) => b.score - a.score)
    RecommendedTweetIDList = RankedTweetList.map(rankedTweetObject => rankedTweetObject.tweetID)
    
    var RecommendedTweetList = []
    var tweet = {}
    // collecting the tweet from the followings

    for (let i = 0, len = RecommendedTweetIDList.length; i<len; i++){

        var recommandedTweet = await Tweet.findOne({tweetID: RecommendedTweetIDList[i]})
        const Creator = await User.findOne({tweetID:recommandedTweet.CreatorUserID})
        const CreatorUserName = Creator.name
        const Avastar = Creator.avatar

        tweet = await AggregTweetSummary(recommandedTweet, CreatorUserName, Avastar)

        RecommendedTweetList.push(tweet)

        }


    return RecommendedTweetList
    
}

// Searching Tweet by specific content
const FetchTweetByContent = async(specificContent) => {
    const ContentFilter = {$regex: specificContent}
    const FetchedTweet = await Tweet.find({Content: ContentFilter, SuspensionStatus: false})
    var SearchedTweet = []
    var fetchedTweet = {}
    var tweet = {}
    for (let i = 0, len = FetchedTweet.length; i<len; i++){
        fetchedTweet = FetchedTweet[i]
        const Creator = await User.findOne({tweetID:fetchedTweet.CreatorUserID})
        const CreatorUserName = Creator.name
        const Avastar = Creator.avatar
        tweet = await AggregTweetSummary(fetchedTweet, CreatorUserName, Avastar)
        SearchedTweet.push(tweet)
    }
    return SearchedTweet
}

module.exports = {
    CreateTweet,
    ReTweet,
    CreateComment,
    ReplyComment,
    AmendTweetLike,
    AmendTweetDisLike,
    IncreReTweetCount,
    AmendCommentLike,
    AmendCommentDisLike,
    EditTweetContent,
    EditCommentContent,
    DelComment,
    DelTweet,
    AdminDelTweet,
    AdminDelComment,
    FetchFollowing,
    FetchTweet,
    FetchHomeTweet,
    FetchTweetComment,
    FetchComment,
    TweetRecommandation,
    FetchTweetByContent,
}