require('dotenv').config();
const pool = require('./db');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

var validator = require('validator');

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

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
    const country_id = req.query.country_id || null;

    const query = `
        SELECT d.*, ARRAY_AGG(g.genre) AS genres
        FROM dramav2 d
        JOIN drama_genre dg ON d.id = dg.drama_id
        JOIN genre g ON dg.genre_id = g.id
        WHERE d.availability ILIKE '%' || $3 || '%'
        AND d.year ILIKE '%' || $4 || '%'
        AND ($6 = '' OR (d.title ILIKE '%' || $6 || '%' OR d.actors ILIKE '%' || $6 || '%'))
        AND ($7 IS NULL OR d.country_id = $7)
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
        AND ($5 IS NULL OR d.country_id = $5)
        GROUP BY d.id
        HAVING ($3 = '' OR $3 = ANY(ARRAY_AGG(g.genre)));
    `;

    pool.query(query, [limit, offset, platform, year, genre, title, country_id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        pool.query(countQuery, [platform, year, genre, title, country_id], (error, countResults) => {
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

    // use isNan from js to check if dramaId is an integer
    if (isNaN(dramaId)) {
        return res.status(400).json({ error: 'Invalid drama ID' });
    }

    const query = `
        SELECT 
            d.*, 
            ARRAY_AGG(DISTINCT g.genre) AS genres,
            ARRAY_AGG(DISTINCT jsonb_build_object('id', a.id, 'name', a.name, 'country_id', a.country_id, 'birth_date', a.birth_date, 'url_photo', a.url_photo)) FILTER (WHERE a.id IS NOT NULL) AS actors
        FROM 
            dramav2 d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genre g ON dg.genre_id = g.id
        LEFT JOIN 
            drama_actor da ON d.id = da.drama_id
        LEFT JOIN 
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

// Endpoint to toggle the watchlist status
app.post('/watchlist/toggle', async (req, res) => {
    const { user_id, drama_id } = req.body;

    // check if user_id and drama_id are integers with isNaN from js
    if (isNaN(user_id) || isNaN(drama_id)) {
        return res.status(400).json({ error: 'Invalid user or drama ID' });
    }
  
    try {
      const result = await pool.query(
        'SELECT * FROM user_watchlist WHERE user_id = $1 AND drama_id = $2',
        [user_id, drama_id]
      );
  
      if (result.rows.length > 0) {
        // Drama is already in watchlist, remove it
        await pool.query(
          'DELETE FROM user_watchlist WHERE user_id = $1 AND drama_id = $2',
          [user_id, drama_id]
        );
        return res.json({ message: 'Removed from watchlist' });
      } else {
        // Drama is not in watchlist, add it
        await pool.query(
          'INSERT INTO user_watchlist (user_id, drama_id) VALUES ($1, $2)',
          [user_id, drama_id]
        );
        return res.json({ message: 'Added to watchlist' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// create an endpoint to get the user's watchlist from table user_watchlist, just get the list of drama_id
app.get('/watchlist/check', async (req, res) => {
    const { user_id, drama_id } = req.query; // Get user and drama IDs from query params

    // check if user_id and drama_id are integers with isNaN from js
    if (isNaN(user_id) || isNaN(drama_id)) {
        return res.status(400).json({ error: 'Invalid user or drama ID' });
    }
  
    try {
      const result = await pool.query(
        'SELECT * FROM user_watchlist WHERE user_id = $1 AND drama_id = $2',
        [user_id, drama_id]
      );
  
      // If a record exists, the drama is already watchlisted
      if (result.rows.length > 0) {
        return res.json({ isWatchlisted: true });
      } else {
        return res.json({ isWatchlisted: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});

  // Endpoint to fetch all dramas watchlisted by the user
app.get('/watchlist', async (req, res) => {
    const { user_id } = req.query; // Get user ID from query params

    // check if user_id is an integer with isNaN from js
    if (isNaN(user_id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    try {
      const result = await pool.query(
        'SELECT d.* FROM dramav2 d INNER JOIN user_watchlist w ON d.id = w.drama_id WHERE w.user_id = $1',
        [user_id]
      );
  
      return res.json(result.rows); // Return the watchlisted dramas
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
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

    // sanitize input
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ error: 'Invalid username' });
    }
    // check if password is empty
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    // sanitize username and password from escapeHTML
    const sanitizedUsername = escapeHTML(username);
    const sanitizedPassword = escapeHTML(password);

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [sanitizedUsername]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(sanitizedPassword, user.rows[0].password);
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

    // sanitize input
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ error: 'Invalid username' });
    }
    // check if password length is less than 8
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }
    // check email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    // sanitize username and password from escapeHTML
    const sanitizedUsername = escapeHTML(username);
    const sanitizedPassword = escapeHTML(password);
    const sanitizedEmail = escapeHTML(email);

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [sanitizedUsername]);
        if (user.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // check if password is empty
        if (!sanitizedPassword) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);
        const date = new Date();

        const newUser = await pool.query(
            'INSERT INTO users (username, password, email, role_id, created_at) VALUES ($1, $2, $3, 1, $4) RETURNING *',
            [sanitizedUsername, hashedPassword, sanitizedEmail, date]
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
