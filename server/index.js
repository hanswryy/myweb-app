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
    pool.query('SELECT COUNT(*) FROM dramav2', (error, results) => {
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
    const platform = req.query.platform || ''; // Get platform from query params, default to empty string
    const year = req.query.year || ''; // Get year from query params, default to empty string
    const genre = req.query.genre || ''; // Get genre from query params, default to empty string
    const title = req.query.title || ''; // Get title from query params, default to empty string

    const query = `
        SELECT 
            d.*,
            ARRAY_AGG(g.genre) AS genres
        FROM 
            dramav2 d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genre g ON dg.genre_id = g.id
        WHERE 
            d.availability ILIKE '%' || $3 || '%'
        AND
            d.year ILIKE '%' || $4 || '%'
        AND
            d.title ILIKE '%' || $6 || '%'
        OR
            d.actors ILIKE '%' || $6 || '%'
        GROUP BY 
            d.id
        HAVING ($5 = '' OR $5 = ANY(ARRAY_AGG(g.genre)))
        ORDER BY
            d.title
        LIMIT $1 OFFSET $2;
    `;

    const countQuery = `
        SELECT 
            COUNT(*)
        FROM 
            dramav2 d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genre g ON dg.genre_id = g.id
        WHERE 
            d.availability ILIKE '%' || $1 || '%'
        AND
            d.year ILIKE '%' || $2 || '%'
        AND
            d.title ILIKE '%' || $4 || '%'
        OR
            d.actors ILIKE '%' || $4 || '%'
        GROUP BY 
            d.id
        HAVING ($3 = '' OR $3 = ANY(ARRAY_AGG(g.genre)));
    `;

    pool.query(query, [limit, offset, platform, year, genre, title], (error, results) => {
        if (error) {
            console.error(error); // Log the error to the console
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        pool.query(countQuery, [platform, year, genre, title], (error, countResults) => {
            if (error) {
                console.error(error); // Log the error to the console
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ dramas: results.rows, total: countResults.rowCount });
        });
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