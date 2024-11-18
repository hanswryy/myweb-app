require('dotenv').config();
const pool = require('./db');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary
cloudinary.config({
    cloud_name: 'dg77cnrws',
    api_key: '846173411699422',
    api_secret: 'Pm2FtGHisXbEgquwypFrR1VQU54',
  });

const multer = require('multer');
  
const storage = multer.memoryStorage();
const uploadimg = multer({ storage: multer.memoryStorage() });

app.post('/uploadimg', uploadimg.single('file'), async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          res.json({ url: result.secure_url }); // URL gambar yang berhasil diunggah
        }
      );
      req.file.stream.pipe(result);
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
  });
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

// fetch for genres
app.get('/genres', (req, res) => {
    pool.query('SELECT genre_name FROM genrev2 ORDER BY genre_name ASC', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows.map(row => row.genre_name));
    });
});

// fetch for countries
app.get('/countries', (req, res) => {
    pool.query('SELECT * FROM country ORDER BY name ASC', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
    });
});

// fetch actors
app.get('/actors', (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const query = `
        SELECT * FROM actor
        WHERE name ILIKE $1
        ORDER BY name ASC
    `;
    const values = [`%${searchTerm}%`];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
    });
});

app.get('/dramas', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const platform = req.query.platform || '';
    const year = req.query.year || '';
    const genre = req.query.genre || '';
    const title = req.query.title || '';
    const country_id = req.query.country_id || null;
    const sort = req.query.sort || ''; // Default sorting

    let orderBy;
    switch (sort) {
        case 'title_asc':
            orderBy = 'd.title ASC';
            break;
        case 'title_desc':
            orderBy = 'd.title DESC';
            break;
        case 'date_asc':
            orderBy = 'd.year ASC';
            break;
        case 'date_desc':
            orderBy = 'd.year DESC';
            break;
        default:
            orderBy = 'd.title ASC';
    }

    const query = `
        SELECT d.*, ARRAY_AGG(g.genre_name) AS genres
        FROM dramav2 d
        JOIN drama_genre dg ON d.id = dg.drama_id
        JOIN genrev2 g ON dg.genre_id = g.id
        WHERE d.availability ILIKE '%' || $3 || '%'
        AND d.year ILIKE '%' || $4 || '%'
        AND ($6 = '' OR (d.title ILIKE '%' || $6 || '%' OR d.actors ILIKE '%' || $6 || '%'))
        AND ($7::int IS NULL OR d.country_id = $7::int)
        GROUP BY d.id
        HAVING ($5 = '' OR $5 = ANY(ARRAY_AGG(g.genre_name)))
        ORDER BY ${orderBy}
        LIMIT $1 OFFSET $2;
    `;

    const countQuery = `
        SELECT COUNT(*)
        FROM dramav2 d
        JOIN drama_genre dg ON d.id = dg.drama_id
        JOIN genrev2 g ON dg.genre_id = g.id
        WHERE d.availability ILIKE '%' || $1 || '%'
        AND d.year ILIKE '%' || $2 || '%'
        AND ($4 = '' OR (d.title ILIKE '%' || $4 || '%' OR d.actors ILIKE '%' || $4 || '%'))
        AND ($5::int IS NULL OR d.country_id = $5::int)
        GROUP BY d.id
        HAVING ($3 = '' OR $3 = ANY(ARRAY_AGG(g.genre_name)));
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
            ARRAY_AGG(DISTINCT g.genre_name) AS genres,
            ARRAY_AGG(DISTINCT jsonb_build_object('id', a.id, 'name', a.name, 'country_id', a.country_id, 'birth_date', a.birth_date, 'url_photo', a.url_photo)) FILTER (WHERE a.id IS NOT NULL) AS actors
        FROM 
            dramav2 d
        JOIN 
            drama_genre dg ON d.id = dg.drama_id
        JOIN 
            genrev2 g ON dg.genre_id = g.id
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
        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0 || user.rows[0].status === 'banned') {
            return res.status(400).json({ error: 'Invalid credentials or account banned' });
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

// fetch all years
app.get('/years', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT DISTINCT year FROM dramav2 ORDER BY year DESC');
        res.json(rows.map(row => row.year));
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all countries from country table
app.get('/country', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM country ORDER BY id DESC ');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Endpoint to create a new country
app.post('/country', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Country name is required' });
    }

    try {
        const newCountry = await pool.query(
            'INSERT INTO country (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(newCountry.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to update country
app.put('/country/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        const updatedCountry = await pool.query(
            'UPDATE country SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        res.json(updatedCountry.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to delete country
app.delete('/country/:id', async (req, res) => {
    const countryId = req.params.id;

    try {
        // Set country_id in actor table to null where country_id matches
        await pool.query(
            'UPDATE actor SET country_id = NULL WHERE country_id = $1',
            [countryId]
        );

        // Delete the country from the country table
        await pool.query('DELETE FROM country WHERE id = $1', [countryId]);

        res.json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all genres from genre table
app.get('/genre', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM genrev2 ORDER BY id DESC');
        res.set('Cache-Control', 'no-store');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Create new genre
app.post('/genre', async (req, res) => {
    const { genre } = req.body;
    if (!genre) {
        return res.status(400).json({ error: 'Genre name is required' });
    }

    try {
        const newGenre = await pool.query(
            'INSERT INTO genrev2 (genre_name) VALUES ($1) RETURNING *',
            [genre]
        );
        res.status(201).json(newGenre.rows[0]);
    } catch (error) {
        console.error('Error adding genre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update genre
app.put('/genre/:id', async (req, res) => {
    const { id } = req.params;
    const { genre } = req.body;

    try {
        const updatedGenre = await pool.query(
            'UPDATE genrev2 SET genre_name = $1 WHERE id = $2 RETURNING *',
            [genre, id]
        );
        res.json(updatedGenre.rows[0]);
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete genre
app.delete('/genre/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM genrev2 WHERE id = $1', [id]);
        res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all actors
app.get('/actor', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM actor ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add new actor
app.post('/actor', uploadimg.single('url_photo'), async (req, res) => {
    const { name, country_id, birth_date } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Photo is required' });
        }      
        
        // Upload the image to Cloudinary and get the URL
        const url_photo = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result.secure_url); // Capture the secure URL from the result
            });
            uploadStream.end(req.file.buffer); // Pass the file buffer to Cloudinary
        });

        const result = await pool.query(
            'INSERT INTO actor (name, country_id, birth_date, url_photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, country_id, birth_date, url_photo]
        );
        return res.json({ success: true, actor: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update actor
app.put('/actor/:id', uploadimg.single('url_photo'), async (req, res) => {
    const { id } = req.params;
    const { name, country_id, birth_date} = req.body;
    let url_photo = null;

    try {
        if (req.file) {
            // Upload to Cloudinary if a new photo is provided
            const cloudinaryResult = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                  return reject(new Error('Cloudinary upload error'));
                }
                resolve(result.secure_url);
              }).end(req.file.buffer); // Use the file buffer from multer
            });
            url_photo = cloudinaryResult;
        }

        await pool.query(
            'UPDATE actor SET name = $1, country_id = $2, birth_date = $3, url_photo = $4 WHERE id = $5 RETURNING *',
            [name, country_id, birth_date, url_photo, id]
        );
        res.json({ success: true, message: 'Actor updated' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete actor
app.delete('/actor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM actor WHERE id = $1', [id]);
        res.json({ message: 'Actor deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch awards
app.get("/award", async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM award ORDER BY id DESC`); // Ganti dengan query sesuai struktur database Anda
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching awards:", error);
      res.status(500).send("Server error");
    }
  });
  
app.post("/award", async (req, res) => {
    const { award, year, country_id } = req.body;
  
    if (!award || !year || !country_id) {
        return res.status(400).json({ error: 'Award, year, and country_id are required' });
    }

    try {
        const newAward = await pool.query(
            'INSERT INTO award (award, year, country_id) VALUES ($1, $2, $3) RETURNING *',
            [award, year, country_id]
        );
        res.status(201).json(newAward.rows[0]);
    } catch (error) {
        console.error('Error adding award:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.put("/award/:id", async (req, res) => {
    const { id } = req.params;
    const { award, year, country_id } = req.body;

    if (!award || !year || !country_id) {
        return res.status(400).json({ error: 'Award, year, and country_id are required' });
    }
  
    try {
      await pool.query(
        'UPDATE award SET award = $1, year = $2, country_id = $3 WHERE id = $4 RETURNING *',
        [award, year, country_id, id]
      );
      res.send("Award updated successfully");
    } catch (error) {
      console.error("Error updating award:", error);
      res.status(500).send("Server error");
    }
});
  
app.delete("/award/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Hapus data terkait dari tabel movie_award terlebih dahulu
      await pool.query('DELETE FROM drama_award WHERE award_id = $1 RETURNING *', [id]);
      // Lalu hapus dari tabel awards
      await pool.query("DELETE FROM award WHERE id = $1", [id]);
      res.send("Award deleted successfully");
    } catch (error) {
      console.error("Error deleting award:", error);
      res.status(500).send("Server error");
    }
  });

// get all users from users table
app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error fetching users" });
    }
});

app.put('/users/suspend/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['banned', id]);
        res.status(200).json({ message: 'User suspended successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error suspending user" });
    }
});

app.put('/users/role/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE users SET role_id = $1 WHERE id = $2', [0, id]); // Role admin sebagai contoh role_id 0
        res.status(200).json({ message: 'User role updated to admin' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error updating user role" });
    }
});

//delete users
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error deleting user" });
    }
});

// Create endpoint for creating a new drama with POST method
app.post('/new_drama', async (req, res) => {
    const { title, alt_title, year, synopsis, url_photo, country_id, availability, genres, actors, trailer_link } = req.body;
    console.log(req.body);

    // Check if title is empty
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // actors is an array of actor id, so we need to convert it to an array of actor name
        const actorQuery = `
            SELECT name FROM actor WHERE id = ANY($1::int[]);
        `;
        const actorResult = await client.query(actorQuery, [actors]);

        // Insert new drama into dramav2 table
        const insertDramaQuery = `
            INSERT INTO dramav2 (title, alternative_title, year, synopsis, url_photo, country_id, availability, actors, link_trailer)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id;
        `;
        const dramaResult = await client.query(insertDramaQuery, [title, alt_title, year, synopsis, url_photo, country_id, availability, actorResult.rows.map(row => row.name), trailer_link]);
        const dramaId = dramaResult.rows[0].id;

        // Get genre IDs from genrev2 table
        const genreQuery = `
            SELECT id FROM genrev2 WHERE genre_name = ANY($1::text[]);
        `;
        const genreResult = await client.query(genreQuery, [genres]);
        const genreIds = genreResult.rows.map(row => row.id);

        // Insert genres into drama_genre table
        const insertGenreQuery = `
            INSERT INTO drama_genre (drama_id, genre_id)
            VALUES ($1, $2);
        `;
        for (const genreId of genreIds) {
            await client.query(insertGenreQuery, [dramaId, genreId]);
        }

        // Insert actors into drama_actor table
        const insertActorQuery = `
            INSERT INTO drama_actor (drama_id, actor_id)
            VALUES ($1, $2);
        `;
        for (const actorId of actors) {
            await client.query(insertActorQuery, [dramaId, actorId]);
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'New drama created successfully', dramaId });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating new drama:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Create endpoint for updating an existing drama with PUT method
app.put('/update_drama/:id', async (req, res) => {
    const { id } = req.params;
    const { title, alt_title, year, synopsis, url_photo, country_id, availability, genres, actors, trailer_link } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Update existing drama in dramav2 table
        const updateDramaQuery = `
            UPDATE dramav2
            SET title = $1, alternative_title = $2, year = $3, synopsis = $4, url_photo = $5, country_id = $6, availability = $7, actors = $8, link_trailer = $9
            WHERE id = $10
            RETURNING id;
        `;
        const dramaResult = await client.query(updateDramaQuery, [title, alt_title, year, synopsis, url_photo, country_id, availability, actors, trailer_link, id]);
        const dramaId = dramaResult.rows[0].id;

        // Delete existing genres and actors associations
        await client.query('DELETE FROM drama_genre WHERE drama_id = $1', [dramaId]);
        await client.query('DELETE FROM drama_actor WHERE drama_id = $1', [dramaId]);

        // Get genre IDs from genrev2 table
        const genreQuery = `
            SELECT id FROM genrev2 WHERE genre_name = ANY($1::text[]);
        `;
        const genreResult = await client.query(genreQuery, [genres]);
        const genreIds = genreResult.rows.map(row => row.id);

        // Insert genres into drama_genre table
        const insertGenreQuery = `
            INSERT INTO drama_genre (drama_id, genre_id)
            VALUES ($1, $2);
        `;
        for (const genreId of genreIds) {
            await client.query(insertGenreQuery, [dramaId, genreId]);
        }

        // Insert actors into drama_actor table
        const insertActorQuery = `
            INSERT INTO drama_actor (drama_id, actor_id)
            VALUES ($1, $2);
        `;
        for (const actorId of actors) {
            await client.query(insertActorQuery, [dramaId, actorId]);
        }

        await client.query('COMMIT');
        res.status(200).json({ message: 'Drama updated successfully', dramaId });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating drama:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Create endpoint for deleting an existing drama with DELETE method
app.delete('/delete_drama/:id', async (req, res) => {
    const { id } = req.params;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Delete associated genres and actors
        await client.query('DELETE FROM drama_genre WHERE drama_id = $1', [id]);
        await client.query('DELETE FROM drama_actor WHERE drama_id = $1', [id]);

        // Delete the drama
        const deleteDramaQuery = `
            DELETE FROM dramav2
            WHERE id = $1
            RETURNING id;
        `;
        const dramaResult = await client.query(deleteDramaQuery, [id]);

        await client.query('COMMIT');
        res.status(200).json({ message: 'Drama deleted successfully', dramaId: dramaResult.rows[0].id });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting drama:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// endpoint for create comment based on user_id and drama_id
app.post('/comment', async (req, res) => {
    const { user_id, drama_id, comment } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comments (user_id, drama_id, content) VALUES ($1, $2, $3) RETURNING *',
            [user_id, drama_id, comment]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error create comment' });
    }
});

// endpoint to get all comments
app.get('/comments', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM comments ORDER BY id DESC');
        // get drama title from drama_id
        for (let i = 0; i < rows.length; i++) {
            const drama = await pool.query('SELECT title FROM dramav2 WHERE id = $1', [rows[i].drama_id]);
            rows[i].drama_title = drama.rows[0].title;
        }
        // get username from user_id
        for (let i = 0; i < rows.length; i++) {
            const user = await pool.query('SELECT username FROM users WHERE id = $1', [rows[i].user_id]);
            rows[i].username = user.rows[0].username;
        }
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error get comment' });
    }
});

// endpoint for get all comments based on drama_id
app.get('/comment/:drama_id', async (req, res) => {
    const { drama_id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM comments WHERE drama_id = $1 ORDER BY id DESC', [drama_id]);
        // get username from user_id
        for (let i = 0; i < rows.length; i++) {
            const user = await pool.query('SELECT username FROM users WHERE id = $1', [rows[i].user_id]);
            rows[i].username = user.rows[0].username;
        }
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error get comment' });
    }
});

// endpoint for delete comment
app.delete('/comment/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM comments WHERE id = $1', [id]);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
