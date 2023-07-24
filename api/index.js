const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurations de la base de données
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, // Utilisez la variable d'environnement pour le nom d'hôte
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Port de la base de données PostgreSQL
});

// Route pour interroger les données
app.get('/data', (req, res) => {
  // Exemple : interroger une table "ma_table"
  pool.query('SELECT indice_emv FROM sdis.indice_emv_hex_200m_result limit 10', (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'interrogation de la base de données', err);
      return res.status(500).json({ error: 'Erreur lors de l\'interrogation de la base de données' });
    }
    // Renvoyer les données en format JSON
    res.json(result.rows);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://${process.env.DB_HOST}:${port}`);
});