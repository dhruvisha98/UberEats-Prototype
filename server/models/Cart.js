var mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer_details",
  },
});
var CartSchema = mongoose.model("cart_Details", CartSchema);
module.exports = { OrderDetails };
