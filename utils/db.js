const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connection to db established"), initial());

module.exports = mongoose;