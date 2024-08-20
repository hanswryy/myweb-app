// server/index.js

const pool = require('./db');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
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