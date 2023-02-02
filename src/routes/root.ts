import express from "express";
import { Tweet } from "../models/Tweet";
import { User } from "../models/User";

const rootRouter = express.Router();

/**
 * GET / return home page (a bunch of tweets)
 */
rootRouter.get("/", async (req, res) => {
  // if the user is logged in, we will check
  // if he likes any of the tweets being shown
  // if he is not logged in, all of them will be false
  const userSession = req.session.user;
  let user = null;

  // only serach for the user if there is session
  if (userSession) {
    user = await User.findById(userSession._id).exec();
  }

  const id = user?._id;

  // a demonstration of the aggregation pipeline
  const tweets = await Tweet.aggregate([
    {
      $lookup: {
        as: "author",
        from: "users",
        foreignField: "_id",
        localField: "authorId",
      },
    },
    {
      $project: {
        body: 1,
        createdAt: 1,
        // $lookup returns an array instead of a single element
        // useful for many-to-many relations but not this time
        author: { $arrayElemAt: ["$author", 0] },
        likes: 1,
        // obtain the number of likes
        likesCount: { $size: ["$likes"] },
        userLiked: {
          $cond: {
            // is that user id in the likes array
            if: { $in: [id, "$likes"] },
            then: true,
            else: false,
          },
        },
      },
    },
  ])
    .sort({ createdAt: -1 })
    .exec();
  return res.render("index", {
    tweets: tweets,
    user,
  });
});

export default rootRouter;
