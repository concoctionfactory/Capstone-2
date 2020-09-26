/** User related routes. */

const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");

const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const User = require("../models/user");
const { validate } = require("jsonschema");
const { userNewSchema, userUpdateSchema } = require("../schemas");
const createToken = require("../helpers/createToken");

/** GET /
 *
 * Get list of users. Only logged-in users should be able to use this.
 *
 * It should return only *basic* info:
 *    {users: [{username, first_name, last_name}, ...]}
 *
 */

router.get("/", async function (req, res, next) {
  try {
    let users = await User.findAll();
    //Fixes BUG #1
    users = users.map((u) => ({
      username: u.username,
      first_name: u.first_name,
      last_name: u.last_name,
    }));
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[username] => {user: user} */

router.get("/:username", async function (req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST / {userdata}  => {token: token} */

router.post("/", async function (req, res, next) {
  try {
    const validation = validate(req.body, userNewSchema);

    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] {userData} => {user: updatedUser} */

router.patch("/:username", async function (req, res, next) {
  try {
    if ("username" in req.body || "is_admin" in req.body) {
      throw new ExpressError(
        "You are not allowed to change username or is_admin properties.",
        400
      );
    }

    const validation = validate(req.body, userUpdateSchema);
    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete("/:username", async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
