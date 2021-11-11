const cart = require("../models/Cart");
const order = require("../models/OrderDetails");
const { RestaurantDetails } = require("../models/RestaurantDetails");
const mongoose = require("mongoose");

const getFilteredOrders = async (req, res) => {
  const id = req.body.auth_user.id;
  const { page = 1, limit = 3, status } = req.query;

  const checkProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      }
    });
  };

  const role = req.body.auth_user.type;

  let temp = {
    custId: mongoose.Types.ObjectId(String(id)),
    status,
  };

  checkProperties(temp);

  if (role === "customer") {
    const custOrders = await order.find(temp);

    const count = custOrders.length;

    const filteredOrders = await order.aggregate([
      {
        $match: temp,
      },
      {
        $lookup: {
          from: "restaurant_details",
          localField: "restId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: {
          path: "$restaurant",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit * 1,
      },
    ]);
    return {
      totalDocs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      filteredOrders,
    };
  } else if (role === "restaurant") {
    const filteredOrders = await order.aggregate([
      {
        $match: {
          restId: mongoose.Types.ObjectId(String(id)),
          status,
        },
      },
      {
        $lookup: {
          from: "customer_details",
          localField: "custId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: {
          path: "$customer",
        },
      },
    ]);
    return filteredOrders;
  }
};

const createOrder = async (req, res) => {
  const custId = req.body.auth_user.id;
  console.log(custId);
  const cartDetails = await cart.aggregate([
    {
      $match: {
        custId: mongoose.Types.ObjectId(String(custId)),
      },
    },
    {
      $lookup: {
        from: "restaurant_details",
        localField: "restId",
        foreignField: "_id",
        as: "restaurants",
      },
    },
    {
      $unwind: {
        path: "$restaurants",
      },
    },
  ]);

  if (cartDetails.length === 0) {
    return { error: "No Items in Cart" };
  }

  let dishes = new Map();
  if (
    cartDetails &&
    cartDetails.length > 0 &&
    cartDetails[0].restaurants &&
    cartDetails[0].restaurants.RestaurantDishes &&
    cartDetails[0].restaurants.RestaurantDishes.length > 0
  ) {
    cartDetails[0].restaurants.RestaurantDishes.forEach((dish) => {
      dishes.set(dish._id.toString(), dish);
    });
  }

  let sumTotal = 0;
  let orderDishArray = [];

  cartDetails.forEach((item) => {
    sumTotal += item.totalPrice;
    orderDishArray.push({
      dishId: item.dishId,
      qty: item.qty,
      totalPrice: item.totalPrice,
      name: dishes.get(item.dishId.toString()).DishName,
    });
  });

  let orderObj = {};
  orderObj["restId"] = cartDetails[0].restaurants._id;
  orderObj["custId"] = cartDetails[0].custId;
  orderObj["totalOrderPrice"] = sumTotal;
  orderObj["tax"] = (sumTotal * 0.18).toFixed(2);
  orderObj["finalOrderPrice"] = (sumTotal * 1.18).toFixed(2);
  orderObj["dishes"] = orderDishArray;
  orderObj["status"] = "Initialized";
  orderObj["createdAt"] = new Date();
  orderObj["updatedAt"] = new Date();

  console.log(orderObj);
  const newOrder = new order(orderObj);
  const createdOrder = await newOrder.save();

  if (createdOrder) {
    await cart.deleteMany({
      custId: mongoose.Types.ObjectId(String(custId)),
    });

    return { orderId: createdOrder._id, message: "Order Created" };
  }
  return { error: "Error Creating Order" };
};

const updateOrder = async (req, res) => {
  const status = req.body.status;
  const id = req.body.id;

  const orderDetails = await order.findOne({
    _id: mongoose.Types.ObjectId(String(id)),
  });

  const orderStatus = orderDetails.status;

  console.log(orderStatus);
  if (
    req.body.type === "customer" &&
    status === "Cancelled" &&
    orderStatus !== "Order Recieved" &&
    orderStatus !== "Placed"
  ) {
    console.log(status);
    return { error: "Order cannot be Cancelled" };
  }
  try {
    console.log(status);
    const updateStatus = await order.updateOne(
      {
        _id: mongoose.Types.ObjectId(String(id)),
      },
      {
        status,
      },
      {
        new: true,
      }
    );

    console.log("asdmsam", updateStatus);
    return { message: "Order Status Updated" };
  } catch (err) {
    console.log(err);
    return { message: "Error" };
  }
};

module.exports = {
  createOrder,
  getFilteredOrders,
  updateOrder,
};
