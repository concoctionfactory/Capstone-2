/** User related routes. */

const List = require("../models/list");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/ExpressError");
const { validate } = require("jsonschema");
const { listSchema, listUpdateSchema } = require("../schemas");

/** GET /
 *
 * Get list of lists.
 *
 * It should return only *basic* info:
 *    {lists: [{name, id}, ...]}
 *
 */

router.get("/", async function (req, res, next) {
  try {
    let lists = await List.getAll();
    return res.json({ lists });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[list] => {list: list} */

router.get("/:id", async function (req, res, next) {
  try {
    const list = await List.getOne(req.params.id);
    return res.json({ list });
  } catch (err) {
    return next(err);
  }
});

/** POST / {list}  => {list: listData} */

router.post("/", async function (req, res, next) {
  try {
    const validation = validate(req.body, listSchema);

    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }
    const list = await List.create(req.body);
    return res.status(201).json({ list });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] {listData} => {list: updatedList} */

router.patch("/:id", async function (req, res, next) {
  console.log(req.body);

  try {
    // if ("username" in req.body || "is_admin" in req.body) {
    //   throw new ExpressError(
    //     "You are not allowed to change username or is_admin properties.",
    //     400
    //   );
    // }

    const validation = validate(req.body, listSchema);
    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const list = await List.update(req.params.id, req.body);
    return res.json({ list });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  {message: "list deleted"}  */

router.delete("/:id", async function (req, res, next) {
  try {
    const list = await List.remove(req.params.id);
    return res.json({ list });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
