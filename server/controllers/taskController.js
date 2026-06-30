const { 
    getTasksByUser,
    createTask, 
    deleteTask, 
    updateTask 
} = require("../models/taskmodels");

const getUserTasks = async(req, res) => {
    try{
        const userId = req.user.id;
        const tasks = await getTasksByUser(userId);
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const addTask = async(req, res) => {
    try{
        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body;
        const userId = req.user.id;
        await createTask(
            title,
            description,
            status,
            priority,
            dueDate
        );
        res.status(201).json({
            message: "Task created successfully"
        });
    } catch(err){
        res.status(501).json({
            message: err.message
        });
    }
};

const editTask = async(req, res) => {
    try{
        const taskId = req.params.id;
        const {
            title,
            description,
            status,
            priority
        } = req.body;
        await updateTask(
            taskId,
            title,
            description,
            status,
            priority
        );
        res.status(200).json({
            message: "Task updated"
        });
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const removeTask = async(req, res) => {
    try{
        const taskId = req.params.id;
        await deleteTask(taskId);
        res.status(200).json({
            message: "Task deleted"
        });
    } catch (err){
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getUserTasks,
    addTask,
    editTask,
    removeTask
};