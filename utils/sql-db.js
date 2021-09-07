const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.SQL_URL
});
client.connect()
client.on('connect', () => {
  console.log('Connection to SQL established');
});

/*
(async function main() {
  await client.connect();
  console.log("Connection to SQL established")
  const per = await client.query("SELECT * FROM users");
  // console.log(per.rows);
  await client.end();
})();
*/

module.exports = {
  query: (text, params) => client.query(text, params),
};
