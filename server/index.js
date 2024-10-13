require('dotenv').config();
const pool = require('./db');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth2 client with your client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3000']
};
app.use(cors(corsOptions)); // Use CORS middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware for urlencoded bodies

// Example endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Endpoint to get count of all dramas
app.get('/count', (req, res) => {
    pool.query('SELECT COUNT(*) FROM dramav2', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows[0]);
    });
});

// Dramas pagination
app.get('/dramas', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const platform = req.query.platform || '';
    const year = req.query.year || '';
    const genre = req.query.genre || '';
    const title = req.query.title || '';

    const query = `
        SELECT d.*, ARRAY_AGG(g.genre) AS genres
        FROM dramav2 d
        JOIN drama_genre dg ON d.id = dg.drama_id
        JOIN genre g ON dg.genre_id = g.id
        WHERE d.availability ILIKE '%' || $3 || '%'
        AND d.year ILIKE '%' || $4 || '%'
        AND ($6 = '' OR (d.title ILIKE '%' || $6 || '%' OR d.actors ILIKE '%' || $6 || '%'))
        GROUP BY d.id
        HAVING ($5 = '' OR $5 = ANY(ARRAY_AGG(g.genre)))
        ORDER BY d.title
        LIMIT $1 OFFSET $2;
    `;

    const countQuery = `
        SELECT COUNT(*)
        FROM dramav2 d
        JOIN drama_genre dg ON d.id = dg.drama_id
        JOIN genre g ON dg.genre_id = g.id
        WHERE d.availability ILIKE '%' || $1 || '%'
        AND d.year ILIKE '%' || $2 || '%'
        AND ($4 = '' OR (d.title ILIKE '%' || $4 || '%' OR d.actors ILIKE '%' || $4 || '%'))
        GROUP BY d.id
        HAVING ($3 = '' OR $3 = ANY(ARRAY_AGG(g.genre)));
    `;

    pool.query(query, [limit, offset, platform, year, genre, title], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        pool.query(countQuery, [platform, year, genre, title], (error, countResults) => {
            if (error) {
                console.error(error);
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


// Google authentication endpoint
app.post('/auth/google', async (req, res) => {
    const { idToken } = req.body; // Get idToken from request body

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload(); // Get user info from the token

        const { email, name } = payload;

        // Check if user exists in the database
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (user.rows.length === 0) {
            // If user does not exist, create a new user
            const date = new Date();
            const newUser = await pool.query(
                'INSERT INTO users (username, email, role_id, created_at) VALUES ($1, $2, 1, $3) RETURNING *',
                [name, email, date]
            );

            const userId = newUser.rows[0].id; // Get the new user ID
            
            // Sign JWT
            const token = jwt.sign(
                { id: userId, username: name, role: 1 },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({ token });
        } else {
            // User exists: reject login if they have a password
            const existingUser = user.rows[0];
            
            if (existingUser.password) {
                // If the existing user has a password, reject the login
                return res.status(400).json({ error: 'An account with this email already exists. Please log in using your username and password.' });
            }
            // If user does not have a password, they may already be registered via Google
            // (this condition should ideally not be met unless you've created users without passwords)
        }

        // If we reach here, it means the user exists but has no password,
        // and we can optionally provide a response or redirect.
        // sign jwt for the user with id and username and role
        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username, role: user.rows[0].role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username, role: user.rows[0].role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Register endpoint
app.post('/auth/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // check if password is empty
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const date = new Date();

        const newUser = await pool.query(
            'INSERT INTO users (username, password, email, role_id, created_at) VALUES ($1, $2, $3, 1, $4) RETURNING *',
            [username, hashedPassword, email, date]
        );

        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all users endpoint
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
