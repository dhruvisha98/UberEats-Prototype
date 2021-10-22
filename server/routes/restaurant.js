const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const bcrypt = require("bcrypt");
const verify_token = require("../verifyToken").module;
const jwt = require("jsonwebtoken");
const { cust_auth } = require("../authorization").module;
const saltRounds = 10;
let { Restaurant_Search } = require("../search.js");
const { IoTFleetHub } = require("aws-sdk");
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});
// console.log(verify_token);
router.get("/", verify_token, cust_auth, async function (req, res) {
  //console.log(req)
  //console.log(res)
  await connection.query(
    "SELECT * FROM RESTAURANT_DETAILS",
    async function (error, results) {
      if (error) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(error.code);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

// app.get("/getLocationRestaurant", async function (req, res) {
//   //console.log(req)
//   //console.log(res)
//   await connection.query(
//     "SELECT * FROM RESTAURANT_DETAILS where Restaurant_Location='" +
//       req.body.Restaurant_Location +
//       "'",
//     async function (error, results) {
//       if (error) {
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         res.end(error.code);
//       } else {
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         res.end(JSON.stringify(results));
//       }
//     }
//   );
// });

router.put("/", verify_token, async function (req, res) {
  console.log(req.body);
  await connection.query(
    "UPDATE RESTAURANT_DETAILS SET Restaurant_Name='" +
      req.body.Restaurant_Name +
      "',Restaurant_Description='" +
      req.body.Restaurant_Description +
      "',Restaurant_Contact='" +
      req.body.Restaurant_Contact +
      "',Restaurant_Type='" +
      req.body.Restaurant_Type +
      "',Restaurant_Time='" +
      req.body.Restaurant_Time +
      "',Restaurant_Delivery_Mode='" +
      req.body.Restaurant_Delivery_Mode +
      "',Restaurant_Day='" +
      req.body.Restaurant_Day +
      +"',Restaurant_Location='" +
      req.body.Restaurant_Location +
      "',Restaurant_Image='" +
      req.body.Restaurant_Image +
      "' WHERE Restaurant_ID='" +
      req.body.Restaurant_ID +
      "'",
    async function (error, results) {
      if (error) {
        console.log(error);
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end(error.code);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

// router.put("/", verify_token, async function (req, res) {
//   console.log(req.body);
//   var body = req.body;
//   const sqlput =
//     "UPDATE  RESTAURANT_DETAILS SET Restaurant_Name=?,Restaurant_Email=?,Restaurant_Description=?,Restaurant_Contact=?, Restaurant_Type=?, Restaurant_Time=?,  Restaurant_Delivery_Mode=?,  Restaurant_Day=?,Restaurant_Location=? WHERE Restaurant_ID=?";
//   var values = [
//     body.Restaurant_Name,
//     body.Restaurant_Email,
//     body.Restaurant_Description,
//     body.Restaurant_Contact,
//     body.Restaurant_Type,
//     body.Restaurant_Time,
//     body.Restaurant_Delivery_Mode,
//     body.Restaurant_Day,
//     body.Restaurant_Location,
//     body.Restaurant_ID,
//   ];
//   console.log(values);

//   connection.query(sqlput, values, async function (error, results) {
//     console.log(query.toString);
//     if (error) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(error.code);
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(results));
//     }
//   });
// });
// router.post("/", async function (req, res) {
//   var body = req.body;
//   console.log(req.body);
//   const sqlput =
//     "INSERT INTO RESTAURANT_DETAILS (Restaurant_Name, Restaurant_Email,Restaurant_Description, Restaurant_Contact, Restaurant_Type, Restaurant_Time, Restaurant_Delivery_Mode, Restaurant_Day, Restaurant_Location) VALUES (?,?,?,?,?,?,?,?,?)";
//   var values = [
//     body.Restaurant_Name,
//     body.Restaurant_Email,
//     body.Restaurant_Description,
//     body.Restaurant_Contact,
//     body.Restaurant_Type,
//     body.Restaurant_Time,
//     body.Restaurant_Delivery_Mode,
//     body.Restaurant_Day,
//     body.Restaurant_Location,
//   ];

//   connection.query(sqlput, values, async function (error, results) {
//     console.log(query.toString + "asdfg");
//     console.log(error + "mnbv");
//     if (error) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(error.code);
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(results));
//     }
//   });
// });

router.post("/", (req, res) => {
  const Restaurant_Name = req.body.Restaurant_Name;
  const Restaurant_Email = req.body.Restaurant_Email;
  const Restaurant_Description = req.body.Restaurant_Description;
  const Restaurant_Contact = req.body.Restaurant_Contact;
  const Restaurant_Type = req.body.Restaurant_Type;
  const Restaurant_Time = req.body.Restaurant_Time;
  const Restaurant_Delivery_Mode = req.body.Restaurant_Delivery_Mode;
  const Restaurant_Day = req.body.Restaurant_Day;
  const Restaurant_Location = req.body.Restaurant_Location;
  const Restaurant_Password = req.body.Restaurant_Password;

  bcrypt.hash(Restaurant_Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    connection.query(
      "INSERT INTO RESTAURANT_DETAILS (Restaurant_Name, Restaurant_Email,Restaurant_Description, Restaurant_Contact, Restaurant_Type, Restaurant_Time, Restaurant_Delivery_Mode, Restaurant_Day, Restaurant_Location,Restaurant_Password) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        Restaurant_Name,
        Restaurant_Email,
        Restaurant_Description,
        Restaurant_Contact,
        Restaurant_Type,
        Restaurant_Time,
        Restaurant_Delivery_Mode,
        Restaurant_Day,
        Restaurant_Location,
        hash,
      ],
      (err, result) => {
        console.log(err);
        if (err) {
        } else {
          return res.status(200).send(result);
        }
      }
    );
  });
});

router.post("/rlogin", (req, res) => {
  const Restaurant_Email = req.body.Restaurant_Email;
  const Restaurant_Password = req.body.Restaurant_Password;
  connection.query(
    "SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_Email = ? ;",
    Restaurant_Email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(
          Restaurant_Password,
          result[0].Restaurant_Password,
          (error, response) => {
            if (response) {
              let token = jwt.sign(
                {
                  id: result[0].Restaurant_ID,
                  email: result[0].Restaurant_Email,
                  type: "restaurant",
                },
                constants.secret
              );
              res.send({ message: "Success", result: result[0], token });
            } else {
              res.send({ message: "Wrong Combination" });
            }
          }
        );
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

router.get("/search", async function (req, res) {
  let sql_query =
    "SELECT * FROM RESTAURANT_DETAILS WHERE (Restaurant_Name LIKE '%" +
    (req.query.searchvalue || "") +
    "%' OR RESTAURANT_LOCATION LIKE '%" +
    (req.query.searchvalue || "") +
    "%' OR RESTAURANT_ID IN(SELECT Restaurant_ID FROM RESTAURANT_MENU WHERE DISH_NAME LIKE '%" +
    (req.query.searchvalue || "") +
    "%'))";
  if (req.query.restype && req.query.restype != "") {
    sql_query += "AND Restaurant_Type = '" + (req.query.restype || "") + "';";
  }
  console.log(sql_query);
  await connection.query(sql_query, async function (error, results) {
    if (error) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      res.status(200).json(results);
      ``;
    }
  });
});

module.exports = router;
// router.post("/searchResult", verify_token, async function (req, res) {
//   var search_res = req.body.Search;
//   console.log(search_res);
//   console.log(Restaurant_Search);
//   Restaurant_Search.search(search_res).then((ans) => {
//     res.send(ans);
//   });
// await connection.query(
//   "SELECT RESTAURANT_DETAILS.Restaurant_Name FROM RESTAURANT_DETAILS,RESTAURANT_MENU WHERE (RESTAURANT_DETAILS.Restaurant_Location='" +
//     search_res +
//     "' OR RESTAURANT_DETAILS.Restaurant_Delivery_Mode='" +
//     search_res +
//     "'OR RESTAURANT_MENU.Dish_Name='" +
//     search_res +
//     "') AND RESTAURANT_DETAILS.Restaurant_ID = RESTAURANT_MENU.Restaurant_ID",
//   async function (error, results) {
//     if (error) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(error.code);
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(results));
//     }
//   }
// );
// });

// app.put("/addDish", async function (req, res) {
//   var body = req.body;
//   console.log(req.body);
//   const sqlput =
//     "INSERT INTO RESTAURANT_MENU (Dish_Name, Ingredients, Dish_Category, Dish_Description, Dish_Cost, Restaurant_Name) VALUES (?,?,?,?,?,?)";
//   var values = [
//     body.Dish_Name,
//     body.Ingredients,
//     body.Dish_Category,
//     body.Dish_Description,
//     body.Dish_Cost,
//     body.Restaurant_Name,
//   ];

//   connection.query(sqlput, values, async function (error, results) {
//     console.log(query.toString + "asdfg");
//     console.log(error + "mnbv");
//     if (error) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(error.code);
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(results));
//     }
//   });
// });
module.exports = router;
