const { Client } = require("pg");

const client = new Client({
  host: process.env.SQL_HOST,
  user: process.env.BBDD_USER,
  database: process.env.BBDD_USER,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
});


(async function main() {
  await client.connect();
  console.log("Connection to SQL established")
  const per = await client.query("SELECT * FROM users");
  console.log(per.rows);
  await client.end();
})();
