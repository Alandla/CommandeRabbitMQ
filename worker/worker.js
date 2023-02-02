require('dotenv').config()

const mongodbLib = require('./libs/mongodb')
const rabbitmqLib = require('./libs/rabbitmq')

const q = process.env.QUEUE_NAME

// Connexion MongoDB
mongodbLib.connectToMongoDB(process.env.MONGO_URL)

// Connexion RabbitMQ
rabbitmqLib.connectToRabbitMQ(process.env.RABBITMQ_URL)
  .then(() => {
    rabbitmqLib.receiveMessage(q, (msg) => {
      console.log(msg)
      const commande = JSON.parse(msg);
      mongodbLib.updateCommandeTraite(commande._id);
    });
  })
  .catch(error => {
    console.error('Error connecting to RabbitMQ:', error);
  });

process.on('exit', () => {
  rabbitmqLib.closeConnection()
})