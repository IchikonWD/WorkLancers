const express = require("express");
require("dotenv").config();
require("./utils/mongo-db");
require("./utils/sql-db");
require ('./middleware/passport.midd')
const routes_users = require("./routes/users.routes");
const routes_api = require("./routes/api.routes");
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors())
app.use(express.static('public')) //Para que el pug coja el CSS e imagenes
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//View Engine

app.set("view engine", "pug");
app.set("views", "./views");

//Routes

app.use("/", routes_users);
app.use("/api", routes_api);

app.get("*", (req, res) => {
  res.status(404).send("404");
});

app.listen(port, () => {
  console.log(`Server working on: http://localhost:${port}`);
});



