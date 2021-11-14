const { CustomerDetails } = require("../models/CustomerDetails");
const mongoose = require("mongoose");

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
  var address = body["address"];
  var query = {};
  for (var r of names) {
    if (body[r] !== null && body[r] !== undefined) {
      query[r] = body[r];
    }
  }

  if (address !== null) {
    await CustomerDetails.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(String(id)),
      },
      {
        $push: {
          CustomerAddress: [address],
        },
      }
    );
  }
  // console.log(query);
  return await CustomerDetails.findByIdAndUpdate(id, query);
};
const getAddress = async (cust_id) => {
  const custDetails = await CustomerDetails.findOne({ _id: cust_id });
  return custDetails.CustomerAddress;
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
  getAddress,
  updateCustomerById,
  addFavourite,
  getFavouriteRestaurants,
};
