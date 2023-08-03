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
  const arr = req.query.arr;
  const method = req.query.method;

  if (arr) {
    var arrValues = arr.split(',');
  }

  // Helper function to generate the filter clause based on the provided array parameter
  function getFilterClause(arr, method) {
    if (!arr && !method) return ['',''];
    
    const placeholders = arrValues.map((_, index) => `$${index + 1}`);

    if (method) {
      // If method is provided, use null as the first parameter
      return [` AND nom IN (${placeholders.join(', ')})`, ''];
    } else if (arr) {
      // If arr is provided, use regular filter with nom values
      return ['', ` AND nom IN (${placeholders.join(', ')})`];
    }

    return ['', ''];
  }

  const filterClauses = getFilterClause(arr, method);

  let query = `
    SELECT 
      round(SUM(pop2021_id)) as total_population,
      (SUM(pop2021_id) * 100.0 / (SELECT SUM(pop2021_id) FROM sdis.sdis_results
      WHERE 1=1 ${filterClauses[0]};
      )) AS percentage_of_total_population,
      COUNT(*) AS total_entries_with_indice_emv_gte_4
    FROM sdis.sdis_results
    WHERE indice_emv >= 4.0 ${filterClauses[1]}
  `;

  // Execute the query
  pool.query(query, arrValues, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'interrogation de la base de données', err);
      return res.status(500).json({ error: 'Erreur lors de l\'interrogation de la base de données' });
    }
    // Renvoyer les données en format JSON
    console.log(result.rows)
    res.json(result.rows);
  });
});





app.get('/index_pct', (req, res) => {
  const arr = req.query.arr;
  const index = req.query.index;

  let query = `
    SELECT 
      (SUM(acp_sociale) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_sociale,
      (SUM(acp_econo) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_econo,
      (SUM(acp_enviro) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_enviro,
      (SUM(acp_securite) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_securite,
      (SUM(acp_proximite) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_proximite,
      (SUM(acp_cultsportloisir) * 100.0 / SUM(indice_emv)) AS percentage_of_total_acp_cultsportloisir
    FROM sdis.sdis_results
    WHERE 1=1 
  `;

  if (index) {
    query += ` AND indice_emv IN (${index})`;
  }

  if (arr) {
    const arrValues = arr.split(',');
    const placeholders = arrValues.map((_, index) => `$${index + 1}`);
    query += ` AND nom IN (${placeholders.join(', ')});`;

    console.log(query)
    // Execute the query with the array values as parameters
    pool.query(query, arrValues, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'interrogation de la base de données', err);
        return res.status(500).json({ error: 'Erreur lors de l\'interrogation de la base de données' });
      }
      // Renvoyer les données en format JSON
      res.json(result.rows);
    });

  } else {
    // Execute the query without parameters
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'interrogation de la base de données', err);
        return res.status(500).json({ error: 'Erreur lors de l\'interrogation de la base de données' });
      }
      // Renvoyer les données en format JSON
      console.log(result.rows)

      res.json(result.rows);
    });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://${process.env.DB_HOST}:${port}`);
});