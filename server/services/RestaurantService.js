const { RestaurantDetails } = require("../models/RestaurantDetails");
const bcrypt = require("bcrypt");
// const { resolve } = require("path/posix");
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
  RestaurantPassword = "",
  RestaurantImage = ""
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
    RestaurantImage,
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
    "RestaurantImage",
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

const updateDishByID = async (id, body) => {
  // console.log(body);

  return RestaurantDetails.updateOne(
    {
      "RestaurantDishes.id": id,
    },
    {
      $set: {
        "RestaurantDishes.$.DishName": body.DishName,
        "RestaurantDishes.$.DishPrice": body.DishPrice,
        "RestaurantDishes.$.Ingredients": body.Ingredients,
        "RestaurantDishes.$.DishDescription": body.DishDescription,
        "RestaurantDishes.$.DishCategory": body.DishCategory,
        "RestaurantDishes.$.DishImage": body.DishImage,
      },
    }
  ).exec();
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
  return RestaurantDetails.findById(id).exec();
};
const searchRestaurant = async (query, resmode, restype) => {
  const checkProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      }
    });
  };

  const tempObj = {
    RestaurantType: restype,
    RestaurantDeliveryMode: resmode,
  };

  checkProperties(tempObj);
  console.log("search", tempObj);
  const rests = await RestaurantDetails.find({
    $and: [
      {
        $and: [tempObj],
      },
      {
        $or: [
          {
            RestaurantName: {
              $regex: query,
            },
          },
          { RestaurantLocation: { $regex: query } },
          { "RestaurantDishes.DishName": { $regex: query } },
        ],
      },
    ],
  });

  return rests;
};

const getRestaurantById = (id) => {
  return RestaurantDetails.findById(id).exec();
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  RestaurantLogin,
  updateRestaurantById,
  addDish,
  getDishList,
  searchRestaurant,
  getRestaurantById,
  updateDishByID,
};
