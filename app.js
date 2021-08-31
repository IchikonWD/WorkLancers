const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const routes_users = require("./routes/users.routes");
const routes_api = require("./routes/api.routes");

const port = process.env.PORT;

//Middleware
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//View Engine

app.set("view engine", "pug");
app.set("views", "./views");

//Routes

app.use("/", routes_users);
app.use("/api", routes_api);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Server working on: http://localhost:${port}`);
});
