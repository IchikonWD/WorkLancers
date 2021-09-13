const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

const generateToken = (res, id, email) => {
  const token = jwt.sign({
        id, email
    }, config.secret, {
        expiresIn: "1d"
    });
  return res.cookie('token', token, {
    secure: false,
    httpOnly: true,
  });
};
module.exports = generateToken