// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// model imports
const User = require("../../models/user");

const {
  TEST_DATA,
  afterEachHook,
  afterAllHook,
  beforeEachHook,
} = require("./config");

beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});

afterEach(async function () {
  await afterEachHook();
});

afterAll(async function () {
  await afterAllHook();
});

// describe("POST /users", async function () {
//   test("Creates a new user", async function () {
//     let dataObj = {
//       username: "newTester",
//       first_name: "tester_first",
//       password: "test_test",
//       last_name: "tester_last",
//       email: "tester@gmail.com",
//     };
//     const response = await request(app).post("/api/users").send(dataObj);
//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty("token");
//     const userInDb = await User.findOne("newTester");
//     ["username", "first_name", "last_name"].forEach((key) => {
//       expect(dataObj[key]).toEqual(userInDb[key]);
//     });
//   });

//   test("Prevents creating a user with duplicate username", async function () {
//     const response = await request(app).post("/api/users").send({
//       username: "tester",
//       first_name: "somethingFirst",
//       password: "pword",
//       last_name: "somethingLast",
//       email: "somethingSomething@gmail.com",
//     });
//     expect(response.statusCode).toBe(400);
//   });

//   test("Prevents creating a user without required password field", async function () {
//     const response = await request(app).post("/api/users").send({
//       username: "newTester",
//       first_name: "tester_first",
//       last_name: "tester_last",
//       email: "tester@gmail.com",
//     });
//     expect(response.statusCode).toBe(400);
//   });
// });

describe("GET /users/:username", function () {
  test("Gets a single a user", async function () {
    const response = await request(app)
      .get(`/api/users/${TEST_DATA.currentUsername}`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.body.user).toHaveProperty("username");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("tester");
  });

  test("Responds with a 404 if it cannot find the user in question", async function () {
    const response = await request(app)
      .get(`/api/users/brok`)
      .send({ _token: `${TEST_DATA.userToken}` });
    expect(response.statusCode).toBe(404);
  });
});

// describe("PATCH /users/:username", function () {
//   test("Updates a single a user's first_name with a selective update", async function () {
//     const response = await request(app)
//       .patch(`/api/users/${TEST_DATA.currentUsername}`)
//       .send({ first_name: "new FirstName", _token: `${TEST_DATA.userToken}` });
//     const user = response.body.user;
//     expect(user).toHaveProperty("username");
//     expect(user).not.toHaveProperty("password");
//     expect(user.first_name).toBe("new FirstName");
//     expect(user.username).not.toBe(null);
//   });

//   test("Prevents a bad user update", async function () {
//     const response = await request(app)
//       .patch(`/api/users/${TEST_DATA.currentUsername}`)
//       .send({ nonTest: false, _token: `${TEST_DATA.userToken}` });
//     expect(response.statusCode).toBe(400);
//   });

//   test("Responds with a 404 if it cannot find the user in question", async function () {
//     // delete user first
//     await request(app)
//       .delete(`/users/${TEST_DATA.currentUsername}`)
//       .send({ _token: `${TEST_DATA.userToken}` });
//     const response = await request(app)
//       .patch(`/users/${TEST_DATA.currentUsername}`)
//       .send({ password: "pword", _token: `${TEST_DATA.userToken}` });
//     expect(response.statusCode).toBe(404);
//   });
// });

// describe("DELETE /users/:username", function () {
//   test("Deletes a single a user", async function () {
//     const response = await request(app)
//       .delete(`/api/users/${TEST_DATA.currentUsername}`)
//       .send({ _token: `${TEST_DATA.userToken}` });
//     expect(response.body).toEqual({ message: "User deleted" });
//   });

//   test("Responds with a 404 if it cannot find the user in question", async function () {
//     // delete user first
//     await request(app)
//       .delete(`/api/users/${TEST_DATA.currentUsername}`)
//       .send({ _token: `${TEST_DATA.userToken}` });
//     const response = await request(app)
//       .delete(`/api/users/${TEST_DATA.currentUsername}`)
//       .send({ _token: `${TEST_DATA.userToken}` });
//     expect(response.statusCode).toBe(404);
//   });
// });
