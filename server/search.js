// const { MeiliSearch } = require("meilisearch");

// let restaurants = new MeiliSearch({ host: "http://127.0.0.1:7700" });

// let Restaurant_Search = {
//   init: function (connection) {
//     connection.query("SELECT * FROM RESTAURANT_DETAILS;", (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send({ err: err });
//       }
//       restaurants
//         .index("restaurants")
//         .addDocuments(result)
//         .then((res) => {
//           console.log("Hurray");
//         });
//     });
//   },
//   search: function (text) {
//     return restaurants
//       .index("restaurants")
//       .search(text)
//       .then((r) => {
//         return r;
//       });
//   },
// };

// module.exports = { Restaurant_Search };
