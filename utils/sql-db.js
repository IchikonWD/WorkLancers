const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.SQL_URL
});
client.connect()
client.on('connect', () => {
  console.log('Connection to SQL established');
});


module.exports = {
  query: (text, params) => client.query(text, params),
};
