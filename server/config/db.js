require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }    // obligatoire sur Render
});

const connectDB = async() => {
    try {
        await pool.query("SELECT NOW()");   // test de connexion
        console.log("PostgreSQL connected");
    } catch(err) {
        console.log("Erreur connexion PostgreSQL", err);
    }
};

const getPool = () => pool;

module.exports = {connectDB, getPool};