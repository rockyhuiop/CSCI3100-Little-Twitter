import { RequestHandler } from "express";
import url from "url";
import { ERRORS } from "../errors";
import { User } from "../models/User";

/**
 * Check if the user is authenticated or not
 * It will also populate `req.user` as a side effect
 */
export const isAuthenticated: RequestHandler = async (req, res, next) => {
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
  // if there is no session, that means the user is not authenticated
  if (!userSession) {
    return handleInvalidUser();
  }
  const user = await User.findById(userSession._id).exec();
  // if we have the session but not the user in the database
  // we still consider it to be not authenticated
  if (!user) {
    return handleInvalidUser();
  }
  // set the user object for convenience
  req.user = user;
  next();
};
