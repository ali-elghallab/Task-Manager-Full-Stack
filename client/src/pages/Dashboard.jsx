import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import api from "../services/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);  //Au départ: tasks = []
    const [editingTask, setEditingTask] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous");
    const [sortBy, setSortBy] = useState("none");

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

    const filteredTasks  = tasks.filter((task) => {
        const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());

        const matchStatus = statusFilter ==="Tous" || task.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const sortedTasks = [...filteredTasks];

    if (sortBy === "a->z") {
        sortedTasks.sort((a,b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "z->a") {
        sortedTasks.sort((a,b) => b.title.localeCompare(a.title));
    }

    const priorityOrder = {
        "Haute": 3,
        "Moyenne": 2,
        "Faible": 1
    };

    if (sortBy === "priorityHigh") {
        sortedTasks.sort((a,b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }  //

    if (sortBy === "priorityLow") {
        sortedTasks.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }  //a - b → ordre croissant (petit → grand), donc ici Faible → Haute


    return (
        <>
            <input 
                type="text" 
                placeholder="Rechercher une tache..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="Tous">
                    Tous
                </option>
                <option value="À faire">
                    À faire
                </option>
                <option value="En cours">
                    En cours
                </option>
                <option value="Terminée">
                    Terminée
                </option>
            </select>
            
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="none">
                    Aucun tri
                </option>
                <option value="a->z">
                    Titre (A &rarr; Z)
                </option>
                <option value="z->a">
                    Titre (Z &rarr; A)
                </option>
                <option value="priorityHigh">
                    Priorité (Haute &rarr; Faible)
                </option>
                <option value="priorityLow">
                    Priorité (Faible &rarr; Haute)
                </option>
            </select>

            <Navbar />
            
            <TaskForm 
                onTaskCreated={getTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />

            <TaskList 
                tasks={sortedTasks}
                onEdit={handleEdit}
                onDelete={deleteTask}
            /> 

            
        </>
        //On transmet donc les tâches via une prop.
    );
}

export default Dashboard;