const request = require("supertest");

const app = require("../../app");

const {
  TEST_DATA,
  afterEachHook,
  beforeEachHook,
  afterAllHook,
} = require("./config");

beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});

describe("POST /boards", function () {
  test("Creates a new board", async function () {
    const response = await request(app).post("/api/boards").send({
      name: "Night",
      _token: TEST_DATA.userToken,
      username: TEST_DATA.currentUsername, //needs username or members updates the boardMembers at the same time
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.board).toHaveProperty("name");
    expect(response.body.board.name).toBe("Night");
  });
});

describe("GET/ boards", function () {
  test("Gets boards", async function () {
    const response = await request(app).get("/api/boards").send({
      _token: TEST_DATA.userToken,
    });
    expect(response.body.boards).toHaveLength(1);
  });

  test("Gets a single boards", async function () {
    const response = await request(app)
      .get(`/api/boards/${TEST_DATA.board.id}`)
      .send({
        _token: TEST_DATA.userToken,
      });
    // console.log(response.body);
    expect(response.body.board).toHaveProperty("name");
    expect(response.body.board.name).toBe("testBoard");
    expect(response.body.board).toHaveProperty("members");
    expect(response.body.board).toHaveProperty("lists");
  });

  test("Responds with a 404 if it cannot find the board", async function () {
    const response = await request(app).get(`/api/boards/21`).send({
      _token: TEST_DATA.userToken,
    });
    console.log(response.body);
    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /boards/:id", function () {
  test("Updates a single a boards name", async function () {
    const response = await request(app)
      .patch(`/api/boards/${TEST_DATA.board.id}`)
      .send({
        name: "newName",
        _token: TEST_DATA.userToken,
        username: TEST_DATA.currentUsername, //needs username or members updates the boardMembers at the same time
      });
    expect(response.body.board).toHaveProperty("name");
    expect(response.body.board.name).toBe("newName");
  });

  ///test with add member/ remove members
});

describe("DELETE /board/:id", function () {
  test("Deletes a single a board", async function () {
    const response = await request(app)
      .delete(`/api/boards/${TEST_DATA.board.id}`)
      .send({
        _token: TEST_DATA.userToken,
      });
    expect(response.body.board).toHaveProperty("name");
    expect(response.body.board.name).toBe("testBoard");
  });

  test("Responds with a 404 if it cannot find the board in question", async function () {
    // delete board first
    const response = await request(app).delete(`/api/boards/100`).send({
      _token: TEST_DATA.userToken,
    });
    expect(response.statusCode).toBe(404);
  });
});
afterEach(async function () {
  await afterEachHook();
});

afterAll(async function () {
  await afterAllHook();
});
