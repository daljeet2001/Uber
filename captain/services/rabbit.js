const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBIT_URL;

let connection, channel;

async function connect() {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
}

async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, (message) => {
        try {
            if (message !== null) {
                callback(message.content.toString());
               if(channel && channel.connection) channel.ack(message); // Acknowledge after processing
            }
        } catch (error) {
            console.error("Error processing message:", error);
            // Optional: Reject message instead of infinite retry
            if(channel && channel.connection)channel.nack(message, false, true);
        }
    }, { noAck: false }); // noAck: false ensures messages must be acknowledged
}

async function publishToQueue(queueName, data) {
    if (!channel) await connect();
    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(data), { persistent: true });
}

module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect,
};
