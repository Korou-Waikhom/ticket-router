import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Max concurrent clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be made
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle database client:", err);
});

// Single queries automatically borrow, run, and release back to pool
export const query = (text, params) => pool.query(text, params);

// Explicit client access for transactions
export const getClient = () => pool.connect();

export default pool;
