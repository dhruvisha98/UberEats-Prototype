/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const bcrypt = require("bcrypt");
const { RestaurantDetails } = require("../../models/RestaurantDetails");

const handle_request = (msg, callback) => {
  try {
    const RestaurantName = msg.Restaurant_Name;
    const RestaurantEmail = msg.Restaurant_Email;
    const RestaurantDescription = msg.Restaurant_Description;
    const RestaurantContact = msg.Restaurant_Contact;
    const RestaurantType = msg.Restaurant_Type;
    const RestaurantDeliveryMode = msg.Restaurant_Delivery_Mode;
    const RestaurantLocation = msg.Restaurant_Location;

    bcrypt.hash(msg.Restaurant_Password, 12, (err, hash) => {
      if (err) {
        console.log(err);
      }
      RestaurantDetails.create({
        RestaurantName,
        RestaurantDescription,
        RestaurantContact,
        RestaurantEmail,
        RestaurantType,
        RestaurantDeliveryMode,
        RestaurantLocation,
        RestaurantPassword: hash,
      })
        .then((rest) => {
          callback(null, { rest });
        })
        .catch((err) => {
          callback({ isError: true, errorStatus: 400, error: err }, null);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handle_request;
