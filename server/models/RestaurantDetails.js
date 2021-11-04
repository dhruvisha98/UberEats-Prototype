var mongoose = require("mongoose");

var RestaurantDetailsSchema = new mongoose.Schema({
  RestaurantName: {
    type: "String",
  },
  RestaurantEmail: {
    type: "String",
  },
  RestaurantDescription: {
    type: "String",
  },
  RestaurantPhone: {
    type: "Number",
  },
  RestaurantType: {
    type: "String",
  },
  RestaurantDeliveryMode: {
    type: "String",
  },
  RestaurantLocation: {
    type: "String",
  },
  RestaurantPassword: {
    type: "String",
  },
  RestaurantDishes: [
    {
      DishName: "String",
      DishPrice: "Number",
      Ingredients: "String",
      DishDescription: "String",
      DishCategory: "String",
      DishImage: "String",
    },
  ],
});
var RestaurantDetails = mongoose.model(
  "Restaurant_Details",
  RestaurantDetailsSchema
);
module.exports = { RestaurantDetails };
