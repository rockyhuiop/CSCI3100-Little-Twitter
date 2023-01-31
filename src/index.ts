import argon from "argon2";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import express, { RequestHandler } from "express";
import session from "express-session";
import mongoose from "mongoose";
import url from "url";
import { ERRORS, ERROR_MAPPINGS } from "./errors";
import { User } from "./models/User";

// load env values into process.env
dotenv.config();

const app = express();

const isNotAuthenticated: RequestHandler = async (req, res, next) => {
  const userSession = req.session?.user;
  console.log("[isNotLoggedIn] received user session", userSession);
  if (!userSession) {
    return next();
  }
  return res.redirect("/");
};

const isAuthenticated: RequestHandler = async (req, res, next) => {
  function handleInvalidUser() {
    console.log("[isAuthenticated] user cannot be found, redirecting...");
    res.redirect(
      // can you provide alternatives before deprecating APIs??
      url.format({
        pathname: "/auth/login",
        query: {
          redirect: req.url,
          error: ERRORS.NOT_AUTHENTICATED,
        },
      })
    );
  }

  const userSession = req.session?.user;
  console.log("[isAuthenticated] received user session", userSession);
  if (!userSession) {
    return handleInvalidUser();
  }
  const user = await User.findById(userSession._id).exec();
  if (!user) {
    return handleInvalidUser();
  }
  req.user = user;
  next();
};

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      // TTL index
      autoRemove: "native",
    }),
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // two hours - just an example
      maxAge: 3600 * 1000 * 2,
    },
    resave: false,
  })
);

app.get("/auth/login", isNotAuthenticated, async (req, res) => {
  const query = req.query;
  res.render("login", {
    error: query.error ? ERROR_MAPPINGS[+query.error] : "",
    redirect: query.redirect || "",
  });
});

app.get("/auth/register", async (req, res) => {
  res.render("register");
});

app.post(
  "/auth/login",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const formData = req.body as {
      email: string;
      password: string;
      redirect?: string;
    };
    const user = await User.findOne({ email: formData.email }).exec();
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
    // this is wizardry
    req.session.user = userObject;
    console.log("[login] session set, redirecting...");
    // go back to front page
    res.redirect(formData.redirect || "/");
  }
);

app.post(
  "/auth/register",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const formData = req.body as {
      email: string;
      name: string;
      password: string;
    };
    const user = new User({
      email: formData.email,
      name: formData.name,
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
  }
);

app.get("/delete", isAuthenticated, async (_, res) => {
  res.render("delete");
});

app.post("/delete", isAuthenticated, async (req, res) => {
  const user = req.session.user;
  try {
    await User.findOneAndDelete({ _id: user._id });
    req.session.destroy(() => {
      console.log("[delete] session destroyed?");
      res.redirect("/");
    });
  } catch (err) {
    console.log("[delete] this user does not exists!");
    res.redirect("/delete");
  }
});

app.get("/auth/logout", isAuthenticated, async (req, res) => {
  req.session.destroy(() => {
    console.log("[logout] session destroyed?");
    res.redirect("/");
  });
});

app.get("/", async (req, res) => {
  const query = req.query;
  // try to get the user object
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

app.get("/tweets", isAuthenticated, async (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  // supress deprecation warning
  mongoose.set("strictQuery", false);
  // mongoose will buffer queries if the connection is not yet made
  // no need to await
  mongoose.connect(process.env.MONGO_URI);

  console.log(`Server started at port ${process.env.PORT}`);
});
