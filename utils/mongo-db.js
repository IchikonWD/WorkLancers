const mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to MONGODB established"));


module.exports = mongoose;