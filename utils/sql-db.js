const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.SQL_HOST,
  database: process.env.SQL_NAME,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT
  //connectionString: process.env.SQL_URL,
});
pool.on("connect", () => {

  console.log("Connection to SQL established");
});

module.exports = pool;