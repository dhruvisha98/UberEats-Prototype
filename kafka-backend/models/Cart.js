var mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
  custId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dishId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  restId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  qty: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});
module.exports = mongoose.model("cart", CartSchema);
