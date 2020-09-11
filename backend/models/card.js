const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/** Related functions for companies. */

class Card {
  /** Find all companies (can filter on terms in data). */

  static async getAll(data) {
    const result = await db.query(
      `SELECT id, name, due_date, is_done
          FROM cards`
    );

    return result.rows;
  }

  /** Given a company handle, return data about company. */

  static async getOne(id) {
    const CardRes = await db.query(
      `SELECT  id, name, due_date, is_done
            FROM cards
            WHERE id = $1`,
      [id]
    );

    const card = CardRes.rows[0];

    if (!card) {
      throw new ExpressError(`There exists no card '${id}'`, 404);
    }

    return card;
  }

  /** Create a card (from data), update db, return new card data. */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO cards 
              (name, list_id, due_date)
            VALUES ($1, $2, $3) 
            RETURNING  name, id, due_Date, is_done`,
      [data.name, data.list_id, data.due_date]
    );

    return result.rows[0];
  }

  /** Update card data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed card.
   *
   */

  static async update(id, data) {
    let { query, values } = sqlForPartialUpdate("cards", data, "id", id);

    const result = await db.query(query, values);
    const card = result.rows[0];

    if (!card) {
      throw new ExpressError(`There exists no card '${id}`, 404);
    }

    return card;
  }

  /** Delete given card from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM cards 
          WHERE id = $1 
          RETURNING name`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no card '${id}`, 404);
    }
  }
}

module.exports = Card;
