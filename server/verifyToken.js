const jwt = require("jsonwebtoken");
const config = require("./config.json");

const verify_token = (req, res, next) => {
  try {
    let value = jwt.verify(req.headers.authorization, config.secret);
    req.body["auth_user"] = value;
    next();
  } catch {
    res.status(403).send("Not Authorised / Access Required ");
  }
};

exports.module = verify_token;
