const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = require("../../app");
const db = require("../../db");

const TEST_DATA = {};

/** Hooks to insert a user, board, list, card**/
async function beforeEachHook(TEST_DATA) {
  try {
    const hashedPassWord = await bcrypt.hash("pword", 1);
    await db.query(
      `INSERT INTO users(username, password, first_name, last_name, email)
                VALUES('tester', $1, 'test_first', 'test_last', 'tester@gmail.com')
            `,
      [hashedPassWord]
    );
    const response = await request(app).post("/api/auth/login").send({
      username: "tester",
      password: "pword",
    });
    // console.log(response.body);
    TEST_DATA.userToken = response.body.token;
    TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username;

    const newBoard = await db.query(
      `INSERT INTO boards(name) VALUES ($1) RETURNING *`,
      ["testBoard"]
    );
    TEST_DATA.board = newBoard.rows[0];

    const newBoardMemeber = await db.query(
      `INSERT INTO boardMembers(board_id, username, is_admin) VALUES ($1, $2, $3) RETURNING *`,
      [TEST_DATA.board.id, TEST_DATA.currentUsername, false]
    );
    TEST_DATA.boardMember = newBoardMemeber.rows[0];

    const newList = await db.query(
      `INSERT INTO lists(name, board_id) VALUES ($1, $2) RETURNING *`,
      ["testList", TEST_DATA.board.id]
    );
    TEST_DATA.list = newList.rows[0];

    const newCard = await db.query(
      `INSERT INTO cards(name, text, list_id, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        "testCard",
        "testing words for testing times",
        TEST_DATA.list.id,
        "completed",
        "2020-10-3",
      ]
    );
    TEST_DATA.card = newCard.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function afterEachHook() {
  try {
    await db.query("DELETE FROM cards");
    await db.query("DELETE FROM lists");
    await db.query("DELETE FROM boardMembers");
    await db.query("DELETE FROM boards");
    await db.query("DELETE FROM users");
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    await db.end();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  afterAllHook,
  afterEachHook,
  TEST_DATA,
  beforeEachHook,
};
