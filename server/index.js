require('dotenv').config();

const pool = require('./db');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
// Import bcrypt and jsonwebtoken
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3000'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));

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
            ($6 = '' OR (d.title ILIKE '%' || $6 || '%' OR d.actors ILIKE '%' || $6 || '%'))
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
            ($4 = '' OR (d.title ILIKE '%' || $4 || '%' OR d.actors ILIKE '%' || $4 || '%'))
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

// Endpoint untuk mengambil drama berdasarkan ID
app.get('/dramas/:id', (req, res) => {
    // Mengambil drama id dari parameter URL dan memvalidasinya
    const dramaId = parseInt(req.params.id, 10);
    console.log(`Fetching drama with ID: ${dramaId}`); 
    if (isNaN(dramaId)) {
        return res.status(400).json({ error: 'Invalid drama ID' }); // Mengembalikan 400 jika ID tidak valid
    }

    const query = `
        SELECT 
            d.*, 
            ARRAY_AGG(DISTINCT g.genre) AS genres,
            ARRAY_AGG(DISTINCT jsonb_build_object('id', a.id, 'name', a.name, 'country_id', a.country_id, 'birth_date', a.birth_date, 'url_photo', a.url_photo)) AS actors
        FROM 
            dramav2 d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genre g ON dg.genre_id = g.id
        JOIN 
            drama_actor da ON d.id = da.drama_id
        JOIN 
            actor a ON da.actor_id = a.id
        WHERE 
            d.id = $1
        GROUP BY 
            d.id;
    `;
    console.log('Executing query:', query, 'with ID:', dramaId);

    pool.query(query, [dramaId], (error, results) => {
        if (error) {
            console.error(error); // Log the error to the console
            return res.status(500).json({ error: 'Internal Server Error' }); // Mengembalikan 500 jika ada kesalahan server
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Drama not found' }); // Mengembalikan 404 jika drama tidak ditemukan
        }

        res.status(200).json(results.rows[0]); // Mengembalikan data drama yang ditemukan
    });
});


// Login endpoint
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log(process.env.JWT_SECRET);

        // Create and sign JWT
        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({ token });
    } catch (error) {
        console.error(error.message);
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
    console.log(`Server listening on ${PORT}`);
});