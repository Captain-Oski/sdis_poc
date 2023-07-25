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


// Middleware CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Route pour interroger les données
app.get('/pop_data', (req, res) => {
   const arr = req.query.arr; // Récupère les paramètres de requête nommés "motsCles" (Ex: /index_pct?motsCles=acp_sociale,acp_econo)
   console.log(arr) 

   let query = `
    SELECT 
    SUM(pop2021) AS total_population,
    (SUM(pop2021) * 100.0 / (SELECT SUM(pop2021) FROM sdis.indice_emv_hex_200m_result)) AS percentage_of_total_population,
    COUNT(*) AS total_entries_with_indice_emv_gte_4
    FROM sdis.indice_emv_hex_200m_result
    WHERE indice_emv >= 4.0 
    `
    if (arr) {
      const arrValues = arr.split(',').map(value => `'${value}'`);
      query += ` AND nom IN (${arrValues.join(',')});`;
    }

    console.log(query)

    pool.query(query, (err, result) => {
        if (err) {
        console.error('Erreur lors de l\'interrogation de la base de données', err);
        return res.status(500).json({ error: 'Erreur lors de l\'interrogation de la base de données' });
        }
        // Renvoyer les données en format JSON
        res.json(result.rows);
    });
});

app.get('/index_pct', (req, res) => {
   const arr = req.query.arr;
   console.log(arr) 

    let query = `
      SELECT 
          (SUM(acp_sociale) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_sociale,
          (SUM(acp_econo) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_econo,
          (SUM(acp_enviro) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_enviro,
          (SUM(acp_securite) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_securite,
          (SUM(acp_proximite) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_proximite,
          (SUM(acp_cultsportloisir) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_cultsportloisir
      FROM sdis.indice_emv_hex_200m_result
      WHERE indice_emv >= 4.0 
    `;

    if (arr) {
      const arrValues = arr.split(',').map(value => `'${value}'`);
      query += ` AND nom IN (${arrValues.join(',')});`;
    }
  
    // Exécutez la requête dans la base de données
    pool.query(query, (err, result) => {
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