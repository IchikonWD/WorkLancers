const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.SQL_URL,
});

<<<<<<< HEAD
=======
client.connect();
client.on("connect", () => {
  console.log("Connection to SQL established");
});
>>>>>>> 2aa25b932d016d84c4305fa15e36ce22fb52f4ce

module.exports = {
  query: (text, params) => client.query(text, params),
};
