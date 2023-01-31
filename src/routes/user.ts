import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { User } from "../models/User";

const userRouter = express.Router();

/**
 * GET /delete renders the delete user button
 * POST /delete delete user and destroys session
 */
userRouter
  .route("/delete")
  .get(isAuthenticated, async (_, res) => {
    res.render("delete");
  })
  .post(isAuthenticated, async (req, res) => {
    const user = req.session.user;
    try {
      // mongoose shortcut, it is basically deleteOne({ _id: ... })
      await User.findOneAndDelete({ _id: user._id });
      req.session.destroy(() => {
        console.log("[delete] session destroyed?");
        // you can just go back to anywhere
        // or maybe the login page
        res.redirect("/");
      });
    } catch (err) {
      console.log("[delete] this user does not exist!");
      // just go back to the same delete page??
      // in theory this error should NEVER happen
      res.redirect("/delete");
    }
  });

export default userRouter;
