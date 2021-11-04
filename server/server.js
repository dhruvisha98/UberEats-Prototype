var constants = require("./config.json");
var mysql = require("mysql");
const cors = require("cors");
// var { Restaurant_Search } = require("./search.js");
const port = process.env.PORT || 5001; //Line 3

var express = require("express");
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require("body-parser");
//require express session
var session = require("express-session");
var cookieParser = require("cookie-parser");
//set the view engine to ejs
app.set("view engine", "ejs");
//set the directory of views
app.set("views", "./views");
//specify the path of static directory
app.use(express.static(__dirname + "/public"));

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "cmpe_273_secure_string",
    resave: false,
    saveUninitialized: true,
  })
);
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

//console.log("Aaavfvfvfvfvfvfvf");
// Restaurant_Search.init(connection);
// connection.getConnection((err) => {
//   if (err) {
//     // eslint-disable-next-line no-throw-literal
//     throw "Error occurred" + err;
//   }
//   console.log("pool created");
// });
var mongodb = require("./models/index.js");
var customer = require("./routes/customer.js");
app.use("/customer", customer);

var restaurant = require("./routes/restaurant");
app.use("/restaurant", restaurant);

var favourites = require("./routes/favourites");
app.use("/favourites", favourites);

var menu = require("./routes/menu");
app.use("/menu", menu);

var orderdetails = require("./routes/orderdetails");
app.use("/orderdetails", orderdetails);

var orderstatus = require("./routes/orderstatus");
app.use("/orderstatus", orderstatus);

var users = require("./routes/users");
app.use("/users", users);

var cart = require("./routes/cart");
app.use("/cart", cart);

const images = require("./routes/images");
app.use("/images", images);

app.listen(port, () => console.log(`Sever listening on port ${port}`));

module.exports = { app, connection };
