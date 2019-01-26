/**
 * @Imports
 */
const passport = require("passport");

/**
 * @Handlers Route Handlers
 */

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ response: "Home" });
    () => console.log("Home");
  });

  app.get("/failed", (req, res) => {
    res.send({ response: "failed" });
    () => console.log("failed redirect");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      accessType: "offline",
      prompt: "consent",
      successRedirect: "/",
      failureRedirect: "/failed",
    }),
  );
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["user_friends", "manage_pages"],
      accessType: "offline",
      prompt: "consent",
      successRedirect: "/",
      failureRedirect: "/failed",
    }),
  );

  app.get("/auth/facebook/callback", passport.authenticate("facebook"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    console.log(req);
    res.send({ user: req.user });
  });
};
