import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import api from "../services/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);  //Au départ: tasks = []
    const [editingTask, setEditingTask] = useState(null);

    async function getTasks(){
        try{
            const reponse = await api.get("/tasks");
            setTasks(Response.data);  //Le state devient: tasks = response.data; React effectue automatiquement un nouveau rendu de l'interface.
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);
    //useEffect() permet d'exécuter du code automatiquement lorsque le composant est affiché ou lorsqu'une valeur change.

    function handleEdit(task){
        setEditingTask(task);
    }

    async function deleteTask(id){
        const confirmDelete = window.confirm("Voulez-vous supprimmer cette tache ?");
        
        if(!confirmDelete){
            return;
        }

        try{
            const token = localStorage.getItem("token");
            await api.delete(
                "/tasks/${id}",
                {
                    headers:{
                        Authorization:'Bearer ${token}'
                    }
                }
            );

            getTasks();
            
        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <>
            <Navbar />
            <TaskForm 
                onTaskCreated={getTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
            <TaskList 
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={deleteTask}
            /> 
        </>
        //On transmet donc les tâches via une prop.
    );
}

export default Dashboard;