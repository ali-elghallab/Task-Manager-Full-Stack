const { getPool } = require("../config/db");

//Fonction pour cree une Task dans la BDD
const createTask = async(title, description, status, priority, dueDate, userId) => {
    const pool = getPool();
    
    const result = await pool.query(
        `INSERT INTO tasks(title, description, status, priority, dueDate, userId) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, description, status, priority, dueDate, userId]
    );
    return result.rows[0];
};

//Fonction pour afficher tous les Tasks d'un seul User
const getTasksByUser = async(userId) => {
    const pool = getPool();

    const result = await pool.query(
        `SELECT * FROM tasks WHERE userId = $1 ORDER BY dueDate DESC`,
        [userId]
    );
    return result.rows;
};

//Fonction pour supprimer une Task
const deleteTask = async(id, userId) => {
    const pool = getPool();

    await pool.query(
        `DELETE FROM tasks WHERE id = $1 AND userId = $2`,
        [id, userId]
    );
};

//Fonction pour modifier une Task
const updateTask = async(id, title, description, status, priority, userId) => {
    const pool = getPool();

    await pool.query(
        `UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4 WHERE id = $5 AND userId = $6 RETURNING *`,
        [title, description, status, priority, id, userId]
    );
};

module.exports = {
    createTask,
    getTasksByUser,
    deleteTask,
    updateTask
};