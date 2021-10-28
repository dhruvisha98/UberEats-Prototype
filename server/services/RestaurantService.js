const { RestaurantDetails } = require("../models/RestaurantDetails");

const createRestaurant = async (
  RestaurantName = "",
  RestaurantEmail = "",
  RestaurantDescription = "",
  RestaurantPhone = "",
  RestaurantType = "",
  RestaurantDeliveryMode = "",
  RestaurantLocation = "",
  RestaurantPassword = ""
) => {
  return RestaurantDetails.create({
    RestaurantName,
    RestaurantEmail,
    RestaurantDescription,
    RestaurantPhone,
    RestaurantType,
    RestaurantDeliveryMode,
    RestaurantLocation,
    RestaurantPassword,
  });
};

module.exports = { createRestaurant };
