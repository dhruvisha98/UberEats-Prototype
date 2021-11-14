/* eslint-disable no-multi-assign */
/* eslint-disable camelcase */
const kafka = require("kafka-node");

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient({
      kafkaHost: "10.0.0.222:9092",
    });
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", () => {
      console.log("client ready!");
    });

    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({
        kafkaHost: "10.0.0.222:9092",
      });
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      // this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
