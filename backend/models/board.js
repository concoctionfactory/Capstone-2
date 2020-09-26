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

    const membersRes = await db.query(
      `SELECT username, is_admin
      FROM boardMembers
      WHERE board_id= $1`,
      [id]
    );
    board.members = membersRes.rows;
    const listRes = await db.query(
      `SELECT id, name, board_id
            FROM lists
            WHERE board_id = $1`,
      [id]
    );

    board.lists = listRes.rows;
    if (listRes.rows.length > 0) {
      let res = await Promise.all(
        listRes.rows.map((l) => {
          async function card() {
            const cardRes = await db.query(
              `SELECT id, name, text, due_Date, status, list_id
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
    }

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

    let board = result.rows[0];
    if (!data.members) data.members = [data.username];
    let membersPromises = data.members.map((m) => {
      return db.query(
        `INSERT INTO boardMembers
        (board_id, username, is_admin)
        VALUES ($1, $2, $3) 
        RETURNING username, is_admin`,
        [board.id, m, m === data.username]
      );
    });

    let membersResults = await Promise.all(membersPromises);
    board.members = membersResults.map((mr) => mr.rows[0]);

    return board;
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
    // let { query, values } = sqlForPartialUpdate("boards", data, "id", id);

    // const result = await db.query(query, values);
    // const board = result.rows[0];
    console.log("B1", data);

    const result = await db.query(
      `UPDATE boards 
        SET name = $2 
        WHERE id = $1 
        RETURNING *`,
      [id, data.name]
    );
    const board = result.rows[0];

    console.log("B2", board);
    if (!board) {
      throw new ExpressError(`There exists no board '${id}`, 404);
    }

    const membersRes = await db.query(
      `SELECT username
      FROM boardMembers
      WHERE board_id= $1`,
      [id]
    );

    let currMembers = membersRes.rows.map((m) => m.username);
    let newMembers = data.members;
    console.log("B3", currMembers);

    let remove = currMembers.filter((cm) => !newMembers.includes(cm));
    let add = newMembers.filter((nm) => !currMembers.includes(nm));
    console.log("ADD", add, "REMOVE", remove);

    if (add.length > 0) {
      console.log("ADDING");

      let membersPromises = add.map((m) => {
        console.log(m, board.id);
        return db.query(
          `INSERT INTO boardMembers
          (board_id, username, is_admin)
          VALUES ($1, $2, $3) 
          RETURNING username, is_admin`,
          [board.id, m, m === data.username]
        );
      });
      await Promise.all(membersPromises);
    }

    if (remove.length > 0) {
      console.log("REMOVING");
      let membersPromises = remove.map((m) => {
        console.log(m, board.id);
        return db.query(
          `DELETE FROM boardMembers
          WHERE username = $1 AND  board_id = $2 `,
          [m, board.id]
        );
      });
      await Promise.all(membersPromises);
    }
    // const newMembersRes = await db.query(
    //   `SELECT username, is_admin
    //   FROM boardMembers
    //   WHERE board_id= $1`,
    //   [id]
    // );
    // board.members = newMembersRes.rows;
    // console.log(board.members);
    // return board;
    return this.getOne(board.id);
  }

  /** Delete given board from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM boards 
          WHERE id = $1 
          RETURNING id, name`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no board '${id}`, 404);
    }
    return result.rows[0];
  }
}

module.exports = Board;
