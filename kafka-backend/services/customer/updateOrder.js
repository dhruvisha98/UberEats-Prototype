/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const order = require("../../models/OrderDetails");
const mongoose = require("mongoose");

const handle_request = (msg, callback) => {
  try {
    const { type, address, id, notes } = msg.body;

    let newAddr = "";
    if (type === "Pickup") {
      newAddr = "Pickup From Restaurant";
    } else {
      newAddr = address;
    }

    order
      .findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(String(id)),
        },
        {
          status: "Order Placed",
          orderType: type,
          address: newAddr,
          updatedAt: new Date(),
          notes,
        },
        { new: true }
      )
      .then(() => {
        callback(null, {
          status: 201,
          message: "Order Placed",
        });
      });
  } catch (err) {
    console.log(err);
    callback(
      {
        isError: true,
        status: 500,
        message: "Error",
      },
      null
    );
    return;
  }
};

module.exports = handle_request;
