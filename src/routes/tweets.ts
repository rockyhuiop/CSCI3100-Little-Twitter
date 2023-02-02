import express from "express";
import { Types } from "mongoose";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Tweet } from "../models/Tweet";

const tweetsRouter = express.Router();

/**
 * GET /tweets a dedicated page for tweets
 */
tweetsRouter.get("/tweets", async (_req, res) => {
  res.send("Hello World!");
});

/**
 * GET /add-tweet add tweet form
 * POST /add-tweet add the tweet inputs into the database
 */
tweetsRouter
  .route("/add-tweet")
  .get(isAuthenticated, async (req, res) => {
    res.render("add-tweet", { user: req.user });
  })
  .post(
    isAuthenticated,
    express.urlencoded({ extended: true }),
    async (req, res) => {
      const user = req.user;
      const formData = req.body;
      // create a tweet and save it
      const tweet = new Tweet({
        authorId: user._id,
        body: formData.body,
        comments: [],
        reactions: [],
      });
      await tweet.save();
      res.redirect("/");
    }
  );

/**
 * POST /like/:id perform like on tweet with _id :id
 */
tweetsRouter.post("/like/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  const _id = new Types.ObjectId(req.user._id);
  const tweet = await Tweet.findById(id).exec();
  if (!tweet) {
    return res.redirect("/");
  }
  // check if the user has liked yet
  const hasLiked = tweet.likes.some((t) => t._id.equals(_id));
  if (hasLiked) {
    return res.redirect("/");
  }
  // add that like
  tweet.likes.push(_id);
  await tweet.save();
  return res.redirect("/");
});

/**
 * POST /unlike/:id perform unlike on tweet with _id :id
 */
tweetsRouter.post("/unlike/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  const _id = new Types.ObjectId(req.user._id);
  const tweet = await Tweet.findById(id).exec();
  if (!tweet) {
    return res.redirect("/");
  }
  // only keep likes that are not keeped by that user
  tweet.likes = tweet.likes.filter((t) => {
    return !t._id.equals(_id);
  });
  await tweet.save();
  return res.redirect("/");
});

export default tweetsRouter;
