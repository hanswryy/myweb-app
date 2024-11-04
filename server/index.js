require('dotenv').config();

const pool = require('./db');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
// Import bcrypt and jsonwebtoken
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
        if (user.rows.length === 0 || user.rows[0].status === 'banned') {
            return res.status(400).json({ error: 'Invalid credentials or account banned' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log(process.env.JWT_SECRET);

        // Create and sign JWT
        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username, role: user.rows[0].role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint to register new user to users table (params: username, password, email), role_id will always be 1
app.post('/auth/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if user already exists
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create date of now to fill created_at column
        const date = new Date();

        // Insert new user into users table
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
        const { rows } = await pool.query('SELECT * FROM genre ORDER BY id DESC');
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
            'INSERT INTO genre (genre) VALUES ($1) RETURNING *',
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
            'UPDATE genre SET genre = $1 WHERE id = $2 RETURNING *',
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
        await pool.query('DELETE FROM genre WHERE id = $1', [id]);
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

// Endpoint to fetch distinct years from dramav2 table
app.get('/year', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT DISTINCT year FROM dramav2 ORDER BY year DESC');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch awards
app.get('/award', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM award ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
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
        await pool.query('UPDATE users SET role_id = $1 WHERE id = $2', [0, id]); // Role admin sebagai contoh role_id 2
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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});