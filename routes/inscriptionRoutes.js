// Importation du module Express
const express = require('express');

// Création d'un routeur Express
const router = express.Router();

// Importation du module "pool" depuis le fichier "database.js"
const { pool } = require('../config/database');

// Route POST pour l'inscription d'un utilisateur
router.post('/inscription', (req, res) => {
    const { username, password } = req.body; // Récupération des données du formulaire
  
    // Vérification si l'utilisateur existe déjà dans la base de données
    pool.query('SELECT * FROM users WHERE username = ?', [username])
      .then(([rows]) => {
        if (rows.length) {
          console.log('Nom d\'utilisateur déjà pris');
          res.send('<script>alert("Nom d\'utilisateur déjà pris"); window.location.href="/";</script>'); // Envoi d'une réponse avec une alerte JavaScript et une redirection vers la page d'inscription
        } else {
          // Requête SQL pour insérer l'utilisateur dans la base de données
          pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password])
            .then(() => { // Si la requête s'est bien déroulée
              console.log('Utilisateur inscrit avec succès !');
              res.redirect('/fdpCthulhu'); // Redirection vers la page principale
            })
            .catch((error) => { // Si une erreur s'est produite
              console.error(error);
              res.status(500).send('Erreur lors de l\'inscription'); // Envoi d'une réponse avec un code d'erreur 500
            });
        }
      })
      .catch((error) => { // Si une erreur s'est produite
        console.error(error);
        res.status(500).send('Erreur lors de la vérification de l\'existence de l\'utilisateur'); // Envoi d'une réponse avec un code d'erreur 500
      });
  });

// Exportation du routeur pour pouvoir l'utiliser dans l'application principale
module.exports = router;
