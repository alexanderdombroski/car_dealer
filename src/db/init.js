// src/db/init.js
import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
});

(async function initDB() {
  try {
    const client = await pool.connect();

    console.log('Database connected successfully!');

    client.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
})();

export default pool; // Export the pool for use in your models or server.js