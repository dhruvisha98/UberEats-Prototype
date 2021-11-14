/* eslint-disable camelcase */
/* eslint-disable no-new-require */
// eslint-disable-next-line new-cap
const connection = new require("./kafka/connection");
const mongoose = require("mongoose");

const config = require("./config.json");

// Restaurant topics
const createRestaurant = require("./services/restaurants/create");
const loginRestaurant = require("./services/restaurants/login");
const updateOrder = require("./services/customer/updateOrder");

async function handleTopicRequest(topic_name, fname) {
  await mongoose.connect(config.DB.host);

  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();
  consumer.on("message", (message) => {
    try {
      const data = JSON.parse(message.value);
      fname(data.data, (err, res) => {
        const payloads = [
          {
            topic: "response_topic",
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        if (err) {
          payloads[0].messages = JSON.stringify({
            correlationId: data.correlationId,
            data: err,
          });
        }

        producer.send(payloads, (error) => {
          if (error) {
            console.log("Error from backend: ", JSON.stringify(error));
            return;
          }
          console.log("Sent data from backend1: ", JSON.stringify(res));
        });
      });
    } catch (e) {
      const payloads = [
        {
          topic: "response_topic",
          messages: JSON.stringify({
            data: e,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (error, producerData) => {
        if (error) {
          console.log("Error with kafka: ", JSON.stringify(error));
          return;
        }
        console.log("Kafka backend reponse: ", JSON.stringify(producerData));
      });
    }
  });
}

// Add your TOPICs here
// First argument is topic name
// Second argument is a function that will handle this topic request

// Restaurant topic handlers
handleTopicRequest("restaurant.create", createRestaurant);
handleTopicRequest("customer.updateOrder", updateOrder);
handleTopicRequest("restaurant.login", loginRestaurant);
