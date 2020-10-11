const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/** Related functions for lists. */

class List {
  /** Find all list (can filter on terms in data). */

  static async getAll(data) {
    const result = await db.query(
      `SELECT id, name
          FROM lists`
    );

    return result.rows;
  }

  /** Given a list id, return data about list. */

  static async getOne(id) {
    const ListRes = await db.query(
      `SELECT  id, name
            FROM lists
            WHERE id = $1`,
      [id]
    );

    const list = ListRes.rows[0];

    if (!list) {
      throw new ExpressError(`There exists no list '${id}'`, 404);
    }

    const listRes = await db.query(
      `SELECT id, name, due_Date, is_done
            FROM cards
            WHERE list_id = $1`,
      [id]
    );

    list.cards = listRes.rows;

    return list;
  }

  /** Create a list (from data), update db, return new list data. */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO lists 
              (name, board_id)
            VALUES ($1, $2) 
            RETURNING  id, name, board_id`,
      [data.name, data.board_id]
    );

    return result.rows[0];
  }

  /** Update list data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed list.
   *
   */

  static async update(id, data) {
    console.log(data);

    let { query, values } = sqlForPartialUpdate("lists", data, "id", id);

    const result = await db.query(query, values);
    const list = result.rows[0];
    console.log("UPDATE", list);
    if (!list) {
      throw new ExpressError(`There exists no list '${id}`, 404);
    }

    return list;
  }

  /** Delete given list from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM lists 
          WHERE id = $1 
          RETURNING id, name, board_id`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no lists '${id}`, 404);
    }
    return result.rows[0];
  }
}

module.exports = List;
