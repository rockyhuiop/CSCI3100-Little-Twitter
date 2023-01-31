import { RequestHandler } from "express";

/**
 * Checks if the user is NOT authenticated or not
 * Does not populate user object
 */
export const isNotAuthenticated: RequestHandler = async (req, res, next) => {
  const userSession = req.session?.user;
  console.log("[isNotLoggedIn] received user session", userSession);
  // if there is a sessions, that means the user is authenticated in some way
  // here I assume the user hasn't tampered with the session
  // actually it is very difficult for them to tamper unless
  // they knew the secret
  // see `index.ts`
  if (!userSession) {
    return next();
  }
  return res.redirect("/");
};
