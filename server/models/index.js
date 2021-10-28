const mongoose = require("mongoose");
const config = require("../config.json");

mongoose.connect(config.DB.host);

const CustomerDetails = require("./CustomerDetails");
const RestaurantDetails = require("./RestaurantDetails");

module.exports = { CustomerDetails, RestaurantDetails };
