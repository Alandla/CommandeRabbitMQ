# Projet API & Worker

Cette application consiste en une API qui permet de créer des commandes et de les stocker dans une base de données MongoDB, ainsi qu'un worker qui écoutera les messages envoyés par l'API pour les traiter.

## Pré-requis
- Installer Docker
- Installer Node.js

## Installation
1. Clonez le répertoire du projet.
2. Depuis le terminal, se placer à la racine des projets API et Worker et lancer la commande `npm install` pour installer les dépendances.
3. Lancez les containers RabbitMQ et MongoDB avec la commande `docker-compose up`
4. Accédez à la console MongoDB en utilisant la commande `docker exec -it nom_du_container_mongo mongo`, vous pouvez connaitre le nom du container mongo avec la commande `docker ps` dans la colonne "NAMES".
5. Créez une base de données nommée `commandes_db` avec la commande `use commandes_db`
6. Créez une collection nommée `commandes` avec la commande `db.createCollection("commandes")`

## Configuration
Un fichier .env est disponible pour modifier les url de connexion et le nom de la collection mongo utilisé

## Lancement
1. Lancez les containers RabbitMQ et MongoDB avec la commande `docker-compose up`
2. Depuis le terminal, se placer à la racine du projet API et lancer la commande `npm run start` pour démarrer le serveur API.
3. Depuis le terminal, se placer à la racine du projet Worker et lancer la commande `npm run start` pour démarrer le worker.

## Utilisation
L'API offre deux routes pour gérer les commandes :
- `POST /commande` pour créer une commande
- `GET /commande/:id` pour récupérer une commande

Lorsqu'une commande est créée, le worker se chargera de la traiter et de mettre à jour son état dans la collection MongoDB "commandes".