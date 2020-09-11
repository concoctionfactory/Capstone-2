const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/** Related functions for boards. */

class Board {
  /** Find all boards (can filter on terms in data). */

  static async getAll(data) {
    const result = await db.query(
      `SELECT id, name
          FROM boards`
    );

    return result.rows;
  }

  /** Given a board id, return data about board. */

  static async getOne(id) {
    const BoardRes = await db.query(
      `SELECT  id, name
            FROM boards
            WHERE id = $1`,
      [id]
    );

    const board = BoardRes.rows[0];

    if (!board) {
      throw new ExpressError(`There exists no board '${id}'`, 404);
    }

    const listRes = await db.query(
      `SELECT id, name
            FROM lists
            WHERE board_id = $1`,
      [id]
    );

    let res = await Promise.all(
      listRes.rows.map((l) => {
        async function card() {
          const cardRes = await db.query(
            `SELECT id, name, due_Date, is_done
            FROM cards
            WHERE list_id = $1`,
            [l.id]
          );
          l.cards = cardRes.rows;
          return l;
        }
        return card();
      })
    );

    board.lists = res;

    return board;
  }

  /** Create a board (from data), update db, return new board data. */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO boards 
              (name)
            VALUES ($1) 
            RETURNING id, name`,
      [data.name]
    );

    return result.rows[0];
  }

  /** Update board data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed board.
   *
   */

  static async update(id, data) {
    let { query, values } = sqlForPartialUpdate("boards", data, "id", id);

    const result = await db.query(query, values);
    const board = result.rows[0];

    if (!board) {
      throw new ExpressError(`There exists no board '${id}`, 404);
    }

    return board;
  }

  /** Delete given board from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM boards 
          WHERE id = $1 
          RETURNING name`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no board '${id}`, 404);
    }
  }
}

module.exports = Board;
