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

// Ajout d'une commande
async function addCommande (commande) {
  try {
    const result = await collection.insertOne(commande)
    console.log(`Commande ajoutée avec succès: ${result.insertedId}`)
    return result
  } catch (err) {
    console.log(err)
  }
}

// Récupération d'une commande
async function getCommande (id) {
  try {
    const result = await collection.findOne({ _id: new mongodb.ObjectId(id) })
    console.log(`Commande récupérée avec succès: ${JSON.stringify(result)}`)
    return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connectToMongoDB,
  addCommande,
  getCommande
}
