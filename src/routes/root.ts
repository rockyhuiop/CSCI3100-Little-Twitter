import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { User } from "../models/User";

const rootRouter = express.Router();

/**
 * GET / return home page (a bunch of tweets)
 */
rootRouter.get("/", async (req, res) => {
  const query = req.query;
  // try to get the user object since we don't have the middleware
  // in this route
  const userSession = req.session.user;
  if (!userSession) {
    return res.render("index", {
      tweets: [],
      user: null,
    });
  }
  const user = await User.findById(userSession._id).exec();
  return res.render("index", {
    tweets: [],
    user,
  });
});

/**
 * GET /tweets a dedicated page for tweets
 */
rootRouter.get("/tweets", isAuthenticated, async (req, res) => {
  res.send("Hello World!");
});

export default rootRouter;
