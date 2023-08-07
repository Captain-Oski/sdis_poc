const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

// Database configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Use environment variable or default PostgreSQL port
});

// Middleware: Enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/**
 * Generate filter clauses for SQL query.
 * @param {Array} arrValues - Array of values for filtering.
 * @param {boolean} method - Filter method.
 * @returns {Array} An array of two filter clauses.
 */
function getFilterClauses(arrValues, method) {
    if (!arrValues && !method) return ['', ''];

    const placeholders = arrValues.map((_, index) => `$${index + 1}`);

    if (method) {
        return [` AND nom IN (${placeholders.join(', ')})`, ''];
    } else if (arrValues) {
        return ['', ` AND nom IN (${placeholders.join(', ')})`];
    }

    return ['', ''];
}

// Route to query population data
app.get('/pop_data', (req, res) => {
    const arr = req.query.arr;
    const method = req.query.method;

    if (arr) {
        var arrValues = arr.split(',');
    }

    const [filterClause1, filterClause2] = getFilterClauses(arrValues, method);

    const query = `
        SELECT 
            round(SUM(pop2021_id)) as total_population,
            (SUM(pop2021_id) * 100.0 / (SELECT SUM(pop2021_id) FROM sdis.sdis_results
            WHERE 1=1 ${filterClause1}
            )) AS percentage_of_total_population,
            COUNT(*) AS total_entries_with_indice_emv_gte_4
        FROM sdis.sdis_results
        WHERE indice_emv >= 4.0 ${filterClause2}
    `;

    pool.query(query, arrValues, (err, result) => {
        if (err) {
            console.error('Error querying the database', err);
            return res.status(500).json({ error: 'Error querying the database' });
        }
        res.json(result.rows);
    });
});

// Route to query index percentage data
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

        pool.query(query, arrValues, (err, result) => {
            if (err) {
                console.error('Error querying the database', err);
                return res.status(500).json({ error: 'Error querying the database' });
            }
            res.json(result.rows);
        });
    } else {
        pool.query(query, (err, result) => {
            if (err) {
                console.error('Error querying the database', err);
                return res.status(500).json({ error: 'Error querying the database' });
            }
            res.json(result.rows);
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
