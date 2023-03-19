// Importation des modules nécessaires
const express = require('express'); // Importation du framework Node.js Express
const mysql = require('mysql2'); // Importation du module mysql2 pour la connexion à une base de données MySQL
const bodyParser = require('body-parser'); // Importation du middleware body-parser pour récupérer les données d'un formulaire
require('dotenv').config(); // Chargement des variables d'environnement à partir d'un fichier .env

// Création d'une instance de l'application Express
const app = express();

// Configuration de l'application pour servir des fichiers statiques à partir d'un répertoire appelé "public"
app.use(express.static('public'));

// Importation des routes d'inscription depuis le fichier inscriptionRoutes.js
const inscriptionRoutes = require('./routes/inscriptionRoutes');

// Middleware pour récupérer les données d'un formulaire
app.use(express.urlencoded({ extended: true }));

// Montage des routes d'inscription
app.use(inscriptionRoutes);

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
host: process.env.DB_HOST, // Nom d'hôte de la base de données MySQL
user: process.env.DB_USER, // Nom d'utilisateur de la base de données MySQL
password: process.env.DB_PASS, // Mot de passe de la base de données MySQL
database: process.env.DB_NAME, // Nom de la base de données MySQL
});

// Middleware pour récupérer les données d'un formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour afficher la page de login
app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/login.html'); // Envoi du fichier login.html lorsqu'on accède à la racine de l'application
});

// Route pour afficher la page de feuille perso Cthulhu
app.get('/fdpCthulhu', (req, res) => {
res.sendFile(__dirname + '/public/fdpCthulhu.html'); // Envoi du fichier fdpCthulhu.html lorsqu'on accède à la route /fdpCthulhu
});

// Connexion à la base de données MySQL
connection.connect((err) => {
if (err) {
console.error('Erreur de connexion à la base de données :', err); // Affichage du message d'erreur dans la console en cas d'erreur de connexion
return;
}
console.log('Connecté à la base de données MySQL', process.env.DB_NAME); // Affichage d'un message de confirmation de connexion dans la console
});

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
console.log('Le serveur est démarré et accessible sur le port 3000'); // Affichage d'un message dans la console pour confirmer que le serveur est démarré
});