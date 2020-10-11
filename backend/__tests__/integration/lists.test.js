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

describe("POST /lists", function () {
  test("Creates a new list", async function () {
    const response = await request(app).post("/api/lists").send({
      name: "task list",
      _token: TEST_DATA.userToken,
      board_id: TEST_DATA.board.id,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.list).toHaveProperty("name");
    expect(response.body.list.name).toBe("task list");
  });
});

describe("PATCH /list/:id", function () {
  test("Updates a single a list name", async function () {
    const response = await request(app)
      .patch(`/api/lists/${TEST_DATA.list.id}`)
      .send({
        name: "newName",
        _token: TEST_DATA.userToken,
        board_id: TEST_DATA.board.id,
      });
    expect(response.body.list).toHaveProperty("name");
    expect(response.body.list.name).toBe("newName");
  });

  test("Prevents a bad list update", async function () {
    const response = await request(app)
      .patch(`/api/lists/${TEST_DATA.list.id}`)
      .send({
        _token: TEST_DATA.userToken,
        notList: false,
        board_id: TEST_DATA.board.id,
      });
    expect(response.statusCode).toBe(400);
  });
  test("Responds with a 404 if it cannot find the list in question", async function () {
    // delete list first
    await request(app).delete(`/lists/${TEST_DATA.list.id}`);
    const response = await request(app)
      .patch(`/lists/${TEST_DATA.list.id}`)
      .send({
        name: "newList",
        _token: TEST_DATA.userToken,
      });
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /lists/:id", function () {
  test("Deletes a single list", async function () {
    const response = await request(app)
      .delete(`/api/lists/${TEST_DATA.list.id}`)
      .send({
        _token: TEST_DATA.userToken,
      });
    expect(response.body.list).toHaveProperty("name");
    expect(response.body.list.name).toBe("testList");
  });

  test("Responds with a 404 if it cannot find the list in question", async function () {
    // delete board first
    const response = await request(app).delete(`/api/lists/100`).send({
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
