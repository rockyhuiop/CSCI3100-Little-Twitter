import argon from "argon2";
import express from "express";
import url from "url";
import { ERRORS, ERROR_MAPPINGS } from "../errors";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isNotAuthenticated } from "../middlewares/isNotAuthenticated";
import { User } from "../models/User";

const authRouter = express.Router();

/**
 * GET /login return the login form
 * POST /login processes login and create session
 */
authRouter
  .route("/login")
  // we want to only show the login page when the user is NOT logged in
  .get(isNotAuthenticated, async (req, res) => {
    const query = req.query;
    // the login form may redirect with some query parameters
    // `error` refers to the error message of the fields
    // flashing error messages is probably better but who cares
    // `redirect` is for redirecting the user to a previous page where
    // the user does not have access before logging in, such as liking
    // a post, visiting profile etc.
    res.render("login", {
      error: query.error ? ERROR_MAPPINGS[+query.error] : "",
      redirect: query.redirect || "",
    });
  })
  .post(express.urlencoded({ extended: true }), async (req, res) => {
    const formData = req.body as {
      email: string;
      password: string;
      redirect?: string;
    };
    const user = await User.findOne({ email: formData.email }).exec();
    // other applications just return "email or password does not exist"
    // but I hate it
    if (user === null) {
      console.log("[login] user is null");
      return res.redirect(
        url.format({
          pathname: "/auth/login",
          query: {
            error: ERRORS.USERS_DOES_NOT_EXIST,
          },
        })
      );
    }
    // we don't have to hash the password ourselves
    const correctPassword = await argon.verify(
      user.password,
      formData.password
    );
    if (!correctPassword) {
      console.log("[login] password is incorrect");
      return res.redirect(
        url.format({
          pathname: "/auth/login",
          query: { error: ERRORS.PASSWORD_INCORRECT },
        })
      );
    }

    const userObject = {
      email: user.email,
      name: user.name,
      // how should I do it??
      _id: user._id.toString(),
    };
    // this is wizardry (see README.md)
    req.session.user = userObject;
    console.log("[login] session set, redirecting...");
    // go back to front page OR the previous page
    res.redirect(formData.redirect || "/");
  });

/**
 * GET /register returns the register page
 * POST /register processes the form and that user to the database
 */
authRouter
  .route("/register")
  .get(async (req, res) => {
    res.render("register");
  })
  .post(express.urlencoded({ extended: true }), async (req, res) => {
    const formData = req.body as {
      email: string;
      name: string;
      password: string;
    };
    // I think you can also call User.create() whatever
    const user = new User({
      email: formData.email,
      name: formData.name,
      // don't store plain passwords
      password: await argon.hash(formData.password),
    });
    try {
      await user.save();
      // go to login page
      res.redirect("/auth/login");
    } catch (err) {
      console.log(err.message);
      res.redirect("/auth/register");
    }
  });

/**
 * GET /logout destory user session
 */
authRouter.get("/logout", isAuthenticated, async (req, res) => {
  // this one is too simple, see `index.ts` for the session store
  req.session.destroy(() => {
    console.log("[logout] session destroyed?");
    res.redirect("/");
  });
});

export default authRouter;
