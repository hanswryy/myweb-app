// server/index.js

const pool = require('./db');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// endpoint to get count of all dramas
app.get('/count', (req, res) => {
    pool.query('SELECT COUNT(*) FROM drama', (error, results) => {
        if (error) {
            console.error(error); // Log the error to the console
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows[0]);
    });
});

app.get('/dramas', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 12; // Default to 12 items per page if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    const query = `
        SELECT 
            d.*,
            ARRAY_AGG(g.genre) AS genres
        FROM 
            drama d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genre g ON dg.genre_id = g.id
        GROUP BY 
            d.id
        ORDER BY
            d.title
        LIMIT $1 OFFSET $2;  -- Use placeholders for query parameters
    `;
    
    pool.query(query, [limit, offset], (error, results) => {
        if (error) {
            console.error(error); // Log the error to the console
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
    });
});


// get all users from users table
app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});