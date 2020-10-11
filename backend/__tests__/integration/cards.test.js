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

describe("POST /cards", function () {
  test("Creates a new card", async function () {
    const response = await request(app).post("/api/cards").send({
      name: "task card",
      _token: TEST_DATA.userToken,
      list_id: TEST_DATA.list.id,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.card).toHaveProperty("name");
    expect(response.body.card.name).toBe("task card");
  });
});

describe("PATCH /card/:id", function () {
  test("Updates a single a card name", async function () {
    const response = await request(app)
      .patch(`/api/cards/${TEST_DATA.card.id}`)
      .send({
        name: "newName",
        _token: TEST_DATA.userToken,
        list_id: TEST_DATA.list.id,
      });
    expect(response.body.card).toHaveProperty("name");
    expect(response.body.card.name).toBe("newName");
  });

  test("Prevents a bad card update", async function () {
    const response = await request(app)
      .patch(`/api/cards/${TEST_DATA.list.id}`)
      .send({
        _token: TEST_DATA.userToken,
        notCard: false,
        list_id: TEST_DATA.list.id,
      });
    expect(response.statusCode).toBe(400);
  });
  test("Responds with a 404 if it cannot find the card in question", async function () {
    // delete list first
    await request(app).delete(`/cards/${TEST_DATA.card.id}`);
    const response = await request(app)
      .patch(`/cards/${TEST_DATA.card.id}`)
      .send({
        name: "newCard",
        _token: TEST_DATA.userToken,
      });
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /cards/:id", function () {
  test("Deletes a single card", async function () {
    const response = await request(app)
      .delete(`/api/cards/${TEST_DATA.card.id}`)
      .send({
        _token: TEST_DATA.userToken,
      });
    expect(response.body.card).toHaveProperty("name");
    expect(response.body.card.name).toBe("testCard");
  });

  test("Responds with a 404 if it cannot find the card in question", async function () {
    // delete board first
    const response = await request(app).delete(`/api/cards/100`).send({
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
