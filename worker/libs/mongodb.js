const mongodb = require('mongodb')
const { MongoClient } = require('mongodb')

const dbName = process.env.DB_NAME
let db = null
let collection = null

// Connexion à MongoDB
async function connectToMongoDB (url) {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected to MongoDB')
    db = client.db(dbName)
    collection = db.collection('commandes')
  } catch (err) {
    console.log(err)
  }
}

//Mise à jour de la commande
async function updateCommandeTraite (id) {
  try {
    collection.updateOne({ _id: new mongodb.ObjectId(id) }, {
      $set: { etat: 'Traité' }
    })
      .then(result => {
        console.log("Commande update with success");
      })
      .catch(err => {
        console.log("Erreur lors de la mise à jour de la commande: ", err);
      })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connectToMongoDB,
  updateCommandeTraite
}
