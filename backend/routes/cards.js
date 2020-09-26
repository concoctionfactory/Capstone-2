/** Card related routes. */

const Card = require("../models/card");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const { validate } = require("jsonschema");
const { cardSchema } = require("../schemas");

/** GET /
 *
 * Get list of cards. Only logged-in users should be able to use this.
 *
 *    {card: [{id, name, is_done}, ...]}
 *
 */

router.get("/", async function (req, res, next) {
  try {
    let cards = await Card.getAll();
    return res.json({ cards });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[id] => {card: card} */

router.get("/:id", async function (req, res, next) {
  try {
    const card = await Card.getOne(req.params.id);
    return res.json({ card });
  } catch (err) {
    return next(err);
  }
});

/** POST / {cardData}  => {card: newCard} */

router.post("/", async function (req, res, next) {
  try {
    const validation = validate(req.body, cardSchema);

    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }
    const card = await Card.create(req.body);
    return res.status(201).json({ card });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] {cardData} => {card: updatedCard} */

router.patch("/:id", async function (req, res, next) {
  console.log(req.body);

  try {
    // if ("username" in req.body || "is_admin" in req.body) {
    //   throw new ExpressError(
    //     "You are not allowed to change username or is_admin properties.",
    //     400
    //   );
    // }

    const validation = validate(req.body, cardSchema);
    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const card = await Card.update(req.params.id, req.body);
    return res.json({ card });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  {message: "card deleted"}  */

router.delete("/:id", async function (req, res, next) {
  try {
    let card = await Card.remove(req.params.id);
    return res.json({ card });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
