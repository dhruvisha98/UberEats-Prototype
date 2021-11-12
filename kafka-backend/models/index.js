const mongoose = require("mongoose");
const config = require("../config.json");

mongoose.connect(config.DB.host);

const RestaurantDetails = require("./RestaurantDetails");
const CustomerDetails = require("./CustomerDetails");

module.exports = { CustomerDetails, RestaurantDetails };
