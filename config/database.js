// On importe le module MySQL2 qui permettra de créer la connexion à la base de données.
const mysql = require('mysql2/promise');

// On importe le module dotenv pour charger les variables d'environnement depuis un fichier .env.
require('dotenv').config();

// On définit les informations de configuration de la base de données à utiliser pour la connexion.
const dbConfig = {
  host: process.env.DB_HOST,        // L'adresse de l'hôte de la base de données
  user: process.env.DB_USER,        // Le nom d'utilisateur de la base de données
  password: process.env.DB_PASS,    // Le mot de passe de la base de données
  database: process.env.DB_NAME,    // Le nom de la base de données à laquelle se connecter
  connectionLimit: 10               // Le nombre maximal de connexions simultanées dans le pool
};

// On utilise les informations de configuration pour créer une connexion de type pool à la base de données.
const pool = mysql.createPool(dbConfig);

// On exporte la variable pool pour que d'autres fichiers puissent l'utiliser pour interagir avec la base de données.
module.exports = { pool };
