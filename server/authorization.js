const cust_auth = (req, res, next) => {
  // console.log("Its there")
  // console.log(req.body.auth_user)
  try {
    if (req.body.auth_user.type === "customer") {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401).send("Not Authorised for this action");
  }
};

const rest_auth = (req, res, next) => {
  console.log("Its here");
  try {
    if (req.body.auth_user.type === "restaurant") {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401).send("Not Authorised for this action");
  }
};

exports.module = { cust_auth, rest_auth };
