var mongoose = require("mongoose");

var OrderDetailsSchema = new mongoose.Schema({
  restId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  custId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  totalOrderPrice: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  finalOrderPrice: {
    type: Number,
  },
  dishes: [
    {
      dishId: { type: mongoose.Schema.Types.ObjectId },
      qty: { type: Number },
      totalPrice: { type: Number },
      name: { type: String },
    },
  ],
  orderType: {
    type: String,
  },
  status: {
    type: String,
  },

  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("order", OrderDetailsSchema);
