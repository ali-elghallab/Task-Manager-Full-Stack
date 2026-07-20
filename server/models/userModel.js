//Recuperation de SQL depuis le fichier db.js pour pouvoir executer des requetes SQL
const { sql } = require("../config/db");


//Fonction pour cree un User dans la BDD
const createUser = async(name, email, password) => {
    console.log({
        name,
        email,
        password
    });

    const result = await sql.query
        `INSERT INTO Users(name, email, password) VALUES(${name}, ${email}, ${password})`
    ;
    return result;
};

//Fonction pour rechercher un User
const findUserByEmail = async(email) => {
    const result = await sql.query
        `SELECT * FROM Users WHERE email = ${email}`
    ;
    return result.recordset[0];
};

module.exports = {createUser, findUserByEmail};