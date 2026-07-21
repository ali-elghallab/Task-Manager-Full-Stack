const { sql } = require("../config/db");

//Fonction pour cree une Task dans la BDD
const createTask = async(title, description, status, priority, dueDate, userId) => {
    const result = await sql.query
        `INSERT INTO Tasks(title, description, status, priority, dueDate, userId) VALUES(${title}, ${description}, ${status}, ${priority}, ${dueDate}, ${userId})`
    ;
    return result;
};

//Fonction pour afficher tous les Tasks d'un seul User
const getTasksByUser = async(userId) => {
    const result = await sql.query
        `SELECT * FROM Tasks WHERE userId = ${userId}`
    ;
    return result.recordset;
};

//Fonction pour supprimer une Task
const deleteTask = async(id) => {
    await sql.query
        `DELETE FROM Tasks WHERE id = ${id}`
    ;
};

//Fonction pour modifier une Task
const updateTask = async(id, title, description, status, priority) => {
    await sql.query
        `UPDATE Tasks SET title = ${title}, description = ${description}, status = ${status}, priority = ${priority} WHERE id = ${id}`
    ;
};

module.exports = {
    createTask,
    getTasksByUser,
    deleteTask,
    updateTask
};