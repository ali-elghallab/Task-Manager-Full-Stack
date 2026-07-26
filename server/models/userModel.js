//Recuperation de SQL depuis le fichier db.js pour pouvoir executer des requetes SQL
const { getPool } = require("../config/db");


//Fonction pour cree un User dans la BDD
const createUser = async(name, email, password) => {
    const pool = getPool();

    const result = await pool.query(
        `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email`,
        [name, email, password]
    );
    return result.rows[0];
};

//Fonction pour rechercher un User
const findUserByEmail = async(email) => {
    const pool = getPool();

    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };