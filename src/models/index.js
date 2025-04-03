import pg from 'pg';

/**
 * Create Connection to the Database
 */
const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    ssl: false
});

/**
 * Test Connection to the Database
 */
(async function initDB() {
    try {
      const client = await pool.connect();
      console.log('Database connected successfully!');
      client.release();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
})();
  
let dbClient;

if (process.env.MODE.toLowerCase().includes('dev')) {
    /**
     * Instead of giving the user the original pool object, we can create a
     * wrapper that allows us to control what actions the user can take on the
     * pool. In this case, we only want the user to be able to query the pool
     * and we want to automatically log all queries that are executed.
     */
    dbClient = {
        async query(text, params) {
            try {
                const res = await pool.query(text, params);
                // console.log('Executed query:', { text });
                return res;
            } catch (error) {
                console.error('Error in query:', { text });
                throw error;
            }
        }
    };
} else {
    // We are in production, so we can just export the pool object directly.
    dbClient = pool;
}

export default dbClient;