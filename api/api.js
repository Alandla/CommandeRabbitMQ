require('dotenv').config()
const mongodbLib = require('./libs/mongodb')
const rabbitmqLib = require('./libs/rabbitmq')
const express = require('express')

const app = express()
app.use(express.json())

// Connexion MongoDB
mongodbLib.connectToMongoDB(process.env.MONGO_URL)

// Connexion RabbitMQ
rabbitmqLib.connectToRabbitMQ(process.env.RABBITMQ_URL)

const q = process.env.QUEUE_NAME

app.post('/commande', (req, res) => {
  const newCommande = {
    etat: 'en attente'
  }
  mongodbLib.addCommande(newCommande)
    .then(result => {
      // Envoi du message à RabbitMQ
      rabbitmqLib.sendMessage(q, JSON.stringify(newCommande))
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

app.get('/commande/:id', (req, res) => {
  const id = req.params.id
  mongodbLib.getCommande(id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

process.on('exit', () => {
  rabbitmqLib.closeConnection()
})

app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})
