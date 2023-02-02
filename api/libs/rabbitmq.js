const amqp = require('amqplib/callback_api')

let channel = null

// Fonction pour établir la connexion avec RabbitMQ
function connectToRabbitMQ (url) {
  amqp.connect(url, function (error0, connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1, ch) {
      if (error1) {
        throw error1
      }
      channel = ch
      console.log('Connected to RabbitMQ')
    })
  })
}

// Fermeture de la connexion à RabbitMQ
function closeConnection () {
  channel.close()
  console.log('Closed RabbitMQ connection')
}

// Fonction pour envoyer un message à RabbitMQ
function sendMessage (queue, message) {
  channel.assertQueue(queue, {
    durable: true
  })
  channel.sendToQueue(queue, Buffer.from(message))
  console.log(`Message sent to queue ${queue}: ${message}`)
}

// Fonction pour recevoir un message à RabbitMQ
function receiveMessage (queue, onMessageReceived) {
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
}

module.exports = {
  connectToRabbitMQ,
  closeConnection,
  sendMessage,
  receiveMessage
}
