import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import rootRouter from "./routes/root";
import userRouter from "./routes/user";

// load env values into process.env
dotenv.config();

const app = express();

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

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/", rootRouter);

app.listen(process.env.PORT, () => {
  // supress deprecation warning
  mongoose.set("strictQuery", false);
  // mongoose will buffer queries if the connection is not yet made
  // no need to await
  mongoose.connect(process.env.MONGO_URI);

  console.log(`Server started at port ${process.env.PORT}`);
});
