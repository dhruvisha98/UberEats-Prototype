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

const updateCustomerByEmail = async () => {};

module.exports = { createCustomer };
