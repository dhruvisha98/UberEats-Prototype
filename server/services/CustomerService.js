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
  CustomerImage = "",
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
    CustomerImage,
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
    "CustomerImage",
  ];
  var query = {};
  for (var r of names) {
    if (body[r] !== null && body[r] !== undefined) {
      query[r] = body[r];
    }
  }
  console.log(query);
  return await CustomerDetails.findByIdAndUpdate(id, query);
};

const addFavourite = (cust_id, rest_id) => {
  var query = CustomerDetails.updateOne(
    { _id: cust_id },
    {
      $push: {
        CustomerFavourites: rest_id,
      },
    }
  );

  return query.exec();
};

const getFavouriteRestaurants = (cust_id) => {
  var query = CustomerDetails.findById(cust_id)
    .select("CustomerFavourites")
    .populate("CustomerFavourites");
  return query.exec();
};
module.exports = {
  createCustomer,
  findCustomerByEmail,
  updateCustomerById,
  addFavourite,
  getFavouriteRestaurants,
};
