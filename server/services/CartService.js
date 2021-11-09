const cart = require("../models/Cart");
const { RestaurantDetails } = require("../models/RestaurantDetails");
const mongoose = require("mongoose");

const createCart = async (
  custId = "",
  Dish_ID = "",
  resId = "",
  qty = "",
  totalPrice = ""
) => {
  return cart.CartSchema.create({
    custId,
    dishId: Dish_ID,
    restId: resId,
    qty,
    totalPrice,
  });
};

const addItemToCart = async (req) => {
  console.log(req.body);
  const { Dish_ID, restId } = req.body;
  const custId = req.body.auth_user.id;
  if ((restId && !Dish_ID) || (!restId && Dish_ID)) {
    return { error: "Provide all details" };
  }

  const checkDish = await RestaurantDetails.findOne(
    {
      _id: mongoose.Types.ObjectId(String(restId)),
    },
    {
      RestaurantDishes: {
        $elemMatch: { _id: mongoose.Types.ObjectId(String(Dish_ID)) },
      },
    }
  );

  if (!checkDish || checkDish.RestaurantDishes.length === 0) {
    return { error: "Dish does not exist!" };
  }

  const pricePerQty = checkDish.RestaurantDishes[0].DishPrice;

  const checkCart = await cart.aggregate([
    {
      $lookup: {
        from: "RestaurantDetails",
        localField: "restId",
        foreignField: "_id",
        as: "restaurants",
      },
    },
    {
      $match: { custId: mongoose.Types.ObjectId(String(custId)) },
    },
  ]);
  req.body.custId = custId;
  req.body.totalPrice = (
    Math.round(req.body.qty * pricePerQty * 100) / 100
  ).toFixed(2);

  if (!checkCart || checkCart.length === 0) {
    const newCartItem = new cart(req.body);
    const createdCartItem = await newCartItem.save();
    const tempRes = { createdCartItem, message: "Dish added to Cart" };
    return tempRes;
  }

  if (
    checkCart &&
    checkCart.length > 0 &&
    checkCart[0].restaurants.length > 0 &&
    checkCart[0].restaurants[0]._id.toString() !== restId
  ) {
    const tempRes = {
      restId: checkCart[0].restId,
      restName: checkCart[0].restaurants[0].name,
      error: "Cannot added dishes for multiple restaurants",
    };
    return tempRes;
  }
  req.body["dishId"] = req.body.Dish_ID;
  const newCartItem = new cart(req.body);
  const createdCartItem = await newCartItem.save();
  return { message: "Dish Added to Cart" };
};

const getCartById = async (id) => {
  const cartItems = await cart.aggregate([
    {
      $lookup: {
        from: "restaurant_details",
        localField: "restId",
        foreignField: "_id",
        as: "restaurant",
      },
    },
    {
      $match: {
        custId: mongoose.Types.ObjectId(String(id)),
      },
    },
  ]);

  // Update this
  if (cartItems.length === 0) return null;

  const restId = cartItems[0].restId;
  const dishes = await RestaurantDetails.findOne({
    _id: mongoose.Types.ObjectId(String(restId)),
  })
    .select("RestaurantDishes")
    .select("RestaurantName");

  let dishMap = new Map();
  const tempData = dishes.RestaurantDishes.map((dish) => {
    dishMap.set(dish._id.toString(), dish);
  });

  cartItems.forEach((item) => {
    item["name"] = dishMap.get(item.dishId.toString()).DishName;
    item["restName"] = dishes.RestaurantName;
    delete item.restaurant;
  });
  console.log(cartItems);
  return cartItems;
  // return cart.findById(id).exec();
};

module.exports = {
  addItemToCart,
  createCart,
  getCartById,
};
