require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "development-secret-key";

const PORT = process.env.PORT || 5000;

const BCRYPT_WORK_FACTOR = 10;

// const DB_URI =
//   process.env.NODE_ENV === "test"
//     ? "postgresql:///workflow_test"
//     : "postgresql:///workflow";

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "workflow_test";
} else {
  DB_URI = process.env.DATABASE_URL || "workflow";
}

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI,
};
