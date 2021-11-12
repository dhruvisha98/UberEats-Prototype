const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var constants = require("../../config.json");

const { RestaurantDetails } = require("../../models/RestaurantDetails");
const handle_request = (msg, callback) => {
  try {
    RestaurantDetails.findOne({
      RestaurantEmail: msg.Restaurant_Email,
    }).then((restaurant) => {
      return bcrypt
        .compare(msg.Restaurant_Password, restaurant.RestaurantPassword)
        .then((check) => {
          if (!check) {
            callback(
              {
                isError: true,
                errorStatus: 401,
                error: "Invalid password!",
              },
              null
            );
            return;
          }
          let token = jwt.sign(
            {
              id: restaurant._id,
              email: restaurant.RestaurantEmail,
              type: "restaurant",
            },
            constants.secret
          );
          console.log("llelelelelelelelelelele");
          callback(null, { resp: true });
        })
        .catch((err) => {
          console.log(err);
          callback({ isError: true, errorStatus: 404, error: err }, null);
        });
    });
  } catch (err) {
    console.log(err);
    callback({ isError: true, errorStatus: 500, error: err });
  }
  // .then((rest) => {
  //   callback(null, { rest });
  // })
  // .catch((err) => {
  //   callback({ isError: true, errorStatus: 400, error: err }, null);
  // });
};

module.exports = handle_request;
