/** User related routes. */

const Board = require("../models/board");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/ExpressError");
const { validate } = require("jsonschema");
const { boardSchema } = require("../schemas");

/** GET /
 *
 * Get list of boards.
 *
 *    {boards: [{id,name}, ...]}
 *
 */

router.get("/", async function (req, res, next) {
  try {
    let boards = await Board.getAll();
    return res.json({ boards });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[id] => {board: board} */

router.get("/:id", async function (req, res, next) {
  try {
    const board = await Board.getOne(req.params.id);
    return res.json({ board });
  } catch (err) {
    return next(err);
  }
});

/** POST / {boardData}  => {board: board} */

router.post("/", async function (req, res, next) {
  try {
    const validation = validate(req.body, boardSchema);

    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const board = await Board.create(req.body);
    return res.status(201).json({ board });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] {boardData} => {baord: boardData} */

router.patch("/:id", async function (req, res, next) {
  try {
    // if ("username" in req.body || "is_admin" in req.body) {
    //   throw new ExpressError(
    //     "You are not allowed to change username or is_admin properties.",
    //     400
    //   );
    // }
    // const validation = validate(req.body, boardSchema);
    // if (!validation.valid) {
    //   throw new ExpressError(
    //     validation.errors.map((e) => e.stack),
    //     400
    //   );
    // }
    console.log("REQ", req.body, req.params.id);

    const board = await Board.update(req.params.id, req.body);
    return res.json({ board });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  {message: "board deleted"}  */

router.delete("/:id", async function (req, res, next) {
  try {
    const board = await Board.remove(req.params.id);
    return res.json({ board });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
