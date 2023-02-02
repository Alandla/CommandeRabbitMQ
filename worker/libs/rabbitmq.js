const amqp = require('amqplib/callback_api')

let channel = null

// Fonction pour établir la connexion avec RabbitMQ
function connectToRabbitMQ (url) {
  return new Promise((resolve, reject) => {
    amqp.connect(url, (error, connection) => {
      if (error) {
        reject(error);
      }
      connection.createChannel((error, ch) => {
        if (error) {
          reject(error);
        }
        channel = ch;
        console.log('Connected to RabbitMQ');
        resolve();
      });
    });
  });
}

// Fermeture de la connexion à RabbitMQ
function closeConnection () {
  channel.close()
  console.log('Closed RabbitMQ connection')
}

// Fonction pour recevoir un message à RabbitMQ
function receiveMessage (queue, onMessageReceived) {
    if (channel) {
      channel.assertQueue(queue, {
        durable: true
      })
      channel.consume(queue, function (message) {
        if (message !== null) {
          console.log(`Message received from queue ${queue}: ${message.content.toString()}`)
          onMessageReceived(message.content.toString())
          channel.ack(message)
        }
      })
    } else {
      console.log('RabbitMQ connection not established')
      console.error('RabbitMQ connection not established')
    }
  }

module.exports = {
  connectToRabbitMQ,
  closeConnection,
  receiveMessage
}
