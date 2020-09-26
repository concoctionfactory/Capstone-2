const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/** Related functions for companies. */

class Card {
  /** Find all companies (can filter on terms in data). */

  static async getAll(data) {
    const result = await db.query(
      `SELECT  id, name, text, due_Date, status, list_id
          FROM cards`
    );

    return result.rows;
  }

  /** Given a company handle, return data about company. */

  static async getOne(id) {
    const CardRes = await db.query(
      `SELECT  id, name, text, due_Date, status, list_id
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
              (name, list_id, due_date, text, status)
            VALUES ($1, $2, $3, $4, $5 ) 
            RETURNING id, name, text, due_Date, status, list_id`,
      [data.name, data.list_id, data.due_date, data.text, data.status]
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
          RETURNING name, id, list_id`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no card '${id}`, 404);
    }
    return result.rows[0];
  }
}

module.exports = Card;
