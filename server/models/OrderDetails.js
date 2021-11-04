var mongoose = require("mongoose");

var OrderDetailsSchema = new mongoose.Schema({
  OrderStatus: {
    type: "String",
  },
  DeliveryStatus: {
    type: "String",
  },
  Dishes: [
    {
      DishName: "String",
      DishPrice: "Number",
      Ingredients: "Array",
      DishDescription: "String",
      DishCategory: "String",
      DishImage: "String",
    },
  ],
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer_details",
  },
});
var OrderDetails = mongoose.model("Order_Details", OrderDetailsSchema);
module.exports = { OrderDetails };
