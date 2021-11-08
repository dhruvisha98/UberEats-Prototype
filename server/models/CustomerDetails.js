var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var CustomerDetailsSchema = new mongoose.Schema({
  CustomerName: {
    type: "String",
  },
  CustomerEmail: {
    type: "String",
  },
  CustomerDob: {
    type: "Date",
  },
  CustomerNickname: {
    type: "String",
  },
  CustomerPhone: {
    type: "Number",
  },
  CustomerPassword: {
    type: "String",
  },
  CustomerCity: {
    type: "String",
  },
  CustomerState: {
    type: "String",
  },
  CustomerCountry: {
    type: "String",
  },
  CustomerImage: {
    type: "String",
  },
  CustomerFavourites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant_Details" },
  ],
});

CustomerDetailsSchema.pre("save", async function (next) {
  const cust = this;
  if (cust.isModified("password")) {
    cust.CustomerPassword = bcrypt.hash(cust.CustomerPassword, 8);
  }
  next();
});
var CustomerDetails = mongoose.model("Customer_Details", CustomerDetailsSchema);
module.exports = { CustomerDetails };
