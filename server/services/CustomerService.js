const { CustomerDetails } = require("../models/CustomerDetails");

const createCustomer = async (
  CustomerName = "",
  CustomerEmail = "",
  CustomerDob = "",
  CustomerNickname = "",
  CustomerPhone = "",
  CustomerPassword = "",
  CustomerCity = "",
  CustomerState = "",
  CustomerCountry = "",
  CustomerFavourites = []
) => {
  return CustomerDetails.create({
    CustomerName,
    CustomerEmail,
    CustomerDob,
    CustomerNickname,
    CustomerPhone,
    CustomerPassword,
    CustomerCity,
    CustomerState,
    CustomerCountry,
    CustomerFavourites,
  });
};

const findCustomerByEmail = async (CustomerEmail) => {
  return await CustomerDetails.findOne({ CustomerEmail }).exec();
};
const findCustomerById = async (id) => {
  return await CustomerDetails.findById(id).exec();
};

const updateCustomerById = async (id, body) => {
  var names = [
    "CustomerName",
    "CustomerEmail",
    "CustomerDob",
    "CustomerNickname",
    "CustomerPhone",
    "CustomerPassword",
    "CustomerCity",
    "CustomerState",
    "CustomerCountry",
  ];
  var query = {};
  for (var r of names) {
    if (body[r] !== null && body[r] !== undefined) {
      query[r] = body[r];
    }
  }
  return await CustomerDetails.findByIdAndUpdate(id, query);
};
module.exports = { createCustomer, findCustomerByEmail, updateCustomerById };
