const jwt = require("jsonwebtoken");
const config = require("./config.json");

const verify_token = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    let value = jwt.verify(req.headers.authorization, config.secret);

    req.body["auth_user"] = value;
    next();
  } catch {
    res.status(401).send("Not Authorised ");
  }
};

exports.module = verify_token;
