const cart = require("../models/Cart");
const order = require("../models/OrderDetails");
const { RestaurantDetails } = require("../models/RestaurantDetails");
const mongoose = require("mongoose");

const getFilteredOrders = async (req, res) => {
  const id = req.body.auth_user.id;
  console.log(id);
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

  if (role === "customer") {
    let temp = {
      custId: mongoose.Types.ObjectId(String(id)),
      status,
    };

    checkProperties(temp);

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
    let temp = {
      restId: mongoose.Types.ObjectId(String(id)),
      status,
    };

    checkProperties(temp);
    const filteredOrders = await order.aggregate([
      {
        $match: temp,
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
  orderObj["status"] = "Initialised";
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
  const { status, id } = req.body;

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

const getOrders = async (req, res) => {
  const role = req.body.auth_user.type;
  const id = req.body.auth_user.id;
  let orders;
  if (role === "customer") {
    orders = await order.aggregate([
      {
        $lookup: {
          from: "restaurant_details",
          localField: "restId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $match: { custId: mongoose.Types.ObjectId(String(id)) },
      },
    ]);
    orders.forEach((item) => {
      item["restName"] = item.restaurant[0].name;
      if (item.restaurant[0].restaurantImages.length > 0)
        item["restImage"] = item.restaurant[0].restaurantImages[0];
      else item["restImage"] = "";
      delete item.restaurant;
    });

    return orders;
  } else if (role === "restaurant") {
    orders = await order.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "custId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $match: { restId: mongoose.Types.ObjectId(String(id)) },
      },
    ]);

    orders.forEach((item) => {
      item["custName"] = item.customer[0].name;
      item["custImage"] = item.customer[0].profile_img;
      delete item.customer;
    });

    return orders;
  }
};
const placeOrder = async (req, res) => {
  const { type, address, id, notes } = req.body;

  console.log(req.body);
  let newAddr = "";
  if (type === "Pickup") {
    newAddr = "Pickup From Restaurant";
  } else {
    newAddr = address;
  }
  try {
    const updateOrder = await order.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(String(id)),
      },
      {
        status: "Order Placed",
        orderType: type,
        address: newAddr,
        updatedAt: new Date(),
        notes,
      }
    );
    return { message: "Order Placed" };
  } catch (err) {
    return { messagr: "Error" };
  }
};

const getOrderById = async (req, res) => {
  const role = req.body.auth_user.type;
  const oid = req.params.oid;

  const id = req.body.auth_user.id;

  let orderDetails = {};
  if (role === "restaurant") {
    orderDetails = await order.aggregate([
      {
        $lookup: {
          from: "customer_details",
          localField: "custId",
          foreignField: "_id",
          as: "customer",
        },
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
        $match: {
          _id: mongoose.Types.ObjectId(String(oid)),
          restId: mongoose.Types.ObjectId(String(id)),
        },
      },
    ]);
    if (orderDetails) {
      orderDetails.forEach((item) => {
        item["custName"] = item.customer[0].name;
        item["delType"] = item.restaurant[0].del_type;
        if (
          item.restaurant[0].restaurantImages &&
          item.restaurant[0].restaurantImages.length > 0
        )
          item["restImage"] = item.restaurant[0].restaurantImages[0];
        else item["restImage"] = "";
        delete item.restaurant;
        delete item.customer;
      });
      return orderDetails[0];
    }

    return { error: "Restuarant Order Not Found" };
  }

  orderDetails = await order.aggregate([
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
        _id: mongoose.Types.ObjectId(String(oid)),
        custId: mongoose.Types.ObjectId(String(id)),
      },
    },
  ]);
  // return;

  if (orderDetails) {
    orderDetails.forEach((item) => {
      item["restName"] = item.restaurant[0].RestaurantName;
      item["delType"] = item.restaurant[0].RestaurantDeliveryMode;
      if (
        item.restaurant[0].restaurantImages &&
        item.restaurant[0].restaurantImages.length > 0
      )
        item["restImage"] = item.restaurant[0].restaurantImages[0];
      else item["restImage"] = "";
      delete item.restaurant;
    });
    return orderDetails[0];
  }

  return { error: "Customer Order Not Found" };
};

module.exports = {
  createOrder,
  getFilteredOrders,
  updateOrder,
  getOrders,
  getOrderById,
  placeOrder,
};
