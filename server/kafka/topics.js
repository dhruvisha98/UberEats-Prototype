const kafka = require("kafka-node");

const createKafkaTopics = () => {
  const client = new kafka.KafkaClient("localhost:2181");
  const admin = new kafka.Admin(client);
  admin.createTopics(
    [
      // Response topic
      {
        topic: "response_topic",
        partitions: 1,
        replicationFactor: 1,
      },
      // Restaurant topics

      {
        topic: "restaurant.create",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "restaurant.login",
        partitions: 1,
        replicationFactor: 1,
      },
    ],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};

module.exports = {
  createKafkaTopics,
};
