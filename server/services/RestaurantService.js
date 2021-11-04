const { RestaurantDetails } = require("../models/RestaurantDetails");
const bcrypt = require("bcrypt");
const { resolve } = require("path/posix");
const jwt = require("jsonwebtoken");
var constants = require("../config.json");

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
  // console.log("HHHH");
  console.log(RestaurantPassword);
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
const RestaurantLogin = (username, password) =>
  new Promise((resolve, reject) => {
    RestaurantDetails.findOne({
      RestaurantEmail: username,
    })
      .exec()
      .then((restaurant) => {
        return bcrypt
          .compare(password, restaurant.RestaurantPassword)
          .then((check) => {
            console.log(check);
            if (!check) return reject();
            let token = jwt.sign(
              {
                id: restaurant._id,
                email: restaurant.Restaurant_Email,
                type: "restaurant",
              },
              constants.secret
            );
            return resolve({ result: restaurant, token });
          })
          .catch((err) => {
            console.log("Weeeeeeeee");
            return reject(err);
          });
      });
  });
const updateRestaurantById = async (id, body) => {
  var names = [
    "RestaurantName",
    "RestaurantEmail",
    "RestaurantDescription",
    "RestaurantPhone",
    "RestaurantType",
    "RestaurantDeliveryMode",
    "RestaurantLocation",
    "RestaurantPassword",
  ];
  var query = {};
  for (var r of names) {
    if (body[r] !== null && body[r] !== undefined) {
      query[r] = body[r];
    }
  }
  return await RestaurantDetails.findByIdAndUpdate(id, query);
};
const getAllRestaurants = async () => {
  return RestaurantDetails.find();
};

const addDish = (
  id,
  DishName,
  DishPrice,
  Ingredients,
  DishDescription,
  DishCategory,
  DishImage
) => {
  var query = RestaurantDetails.updateOne(
    { _id: id },
    {
      $push: {
        RestaurantDishes: {
          DishName,
          DishPrice,
          Ingredients,
          DishDescription,
          DishCategory,
          DishImage,
        },
      },
    }
  );
  return query.exec();
};

const getDishList = (id) => {
  return RestaurantDetails.find({ _id: id }).exec();
};
const searchRestaurant = (query) => {
  return RestaurantDetails.find({
    $or: [
      {
        RestaurantName: {
          $regex: query,
        },
      },
      { RestaurantLocation: { $regex: query } },
      { "RestaurantDishes.DishName": { $regex: query } },
    ],
  }).exec();
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  RestaurantLogin,
  updateRestaurantById,
  addDish,
  searchRestaurant,
};
