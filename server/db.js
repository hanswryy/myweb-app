const { Pool } = require('pg');

// Create a pool instance
const pool = new Pool({
  user: 'myuser', // Your PostgreSQL username
  host: 'localhost', // Your PostgreSQL host
  database: 'mydb', // Your PostgreSQL database name
  password: 'mypass', // Your PostgreSQL password
  port: 5432, // Your PostgreSQL port (default is 5432)
});

// Export the pool for use in other files
module.exports = pool;
