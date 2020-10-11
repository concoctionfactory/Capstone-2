const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");
const ExpressError = require("../helpers/ExpressError");

const BCRYPT_WORK_FACTOR = 10;

/** Related functions for users. */

class User {
  /** authenticate user with username, password. Returns user or throws err. */

  static async authenticate(data) {
    // console.log(data);
    // try to find the user first
    const result = await db.query(
      `SELECT username, 
              password, 
              first_name, 
              last_name, 
              email 
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    const user = result.rows[0];
    // console.log(user);
    data.password = data.password.toString();
    user.password = user.password.toString();

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      // console.log(isValid, data.password, user.password);
      if (isValid) {
        return user;
      }
    }

    throw new ExpressError("Invalid Password", 401);
  }

  /** Register user with data. Returns new user data. */

  static async register(data) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(
        `There already exists a user with username '${data.username}`,
        400
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    console.log(hashedPassword);

    const result = await db.query(
      `INSERT INTO users 
          (username, password, first_name, last_name, email) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING username, password, first_name, last_name, email`,
      [
        data.username,
        hashedPassword,
        data.first_name,
        data.last_name,
        data.email,
      ]
    );

    return result.rows[0];
  }

  /** Find all users. */

  static async findAll() {
    const result = await db.query(
      `SELECT username, first_name, last_name, email
        FROM users
        ORDER BY username`
    );

    return result.rows;
  }

  /** Given a username, return data about user. */

  static async findOne(username) {
    console.log(username);

    const userRes = await db.query(
      `SELECT username, first_name, last_name, email
        FROM users 
        WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];
    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }
    const boardRes = await db.query(
      `SELECT b.id, b.name, bm.is_admin
            FROM boardMembers bm JOIN boards b ON bm.board_id = b.id 
            WHERE bm.username = $1`,
      [username]
    );
    user.boards = boardRes.rows;
    if (boardRes.rows.length > 0) {
      let res = await Promise.all(
        boardRes.rows.map((b) => {
          async function members() {
            const membersRes = await db.query(
              `SELECT  username, is_admin
                FROM boardMembers
                WHERE board_id = $1`,
              [b.id]
            );

            b.members = membersRes.rows;
            return b;
          }
          return members();
        })
      );

      user.boards = res;
    }

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(username, data) {
    try {
      await this.authenticate({ ...data, username });
    } catch (error) {
      console.log("error");
      throw new ExpressError("Invalid Password", 401);
    }
    delete data.password;

    let { query, values } = partialUpdate("users", data, "username", username);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    delete user.password;
    delete user.is_admin;

    return result.rows[0];
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE FROM users 
        WHERE username = $1
        RETURNING username`,
      [username]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }
  }
}

module.exports = User;
