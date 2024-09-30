const pool = require('./db');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.get('/dramas', async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

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
        LIMIT $1 OFFSET $2;
    `;

    const countQuery = `
        SELECT COUNT(DISTINCT d.id) AS total
        FROM 
            drama d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genre g ON dg.genre_id = g.id;
    `;

    try {
        const results = await pool.query(query, [limit, offset]);
        const countResult = await pool.query(countQuery);
        const totalItems = countResult.rows[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            data: results.rows,
            totalItems,
            totalPages,
            currentPage: parseInt(page, 10),
        });
    } catch (error) {
        console.error('Error fetching dramas:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
    console.log(`Server is running on port ${PORT}`);
});