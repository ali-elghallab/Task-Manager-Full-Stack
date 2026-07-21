import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import DashboardStats from "../components/DashboardStats";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [tasks, setTasks] = useState([]);  //Au départ: tasks = []
    const [editingTask, setEditingTask] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous");
    const [sortBy, setSortBy] = useState("none");
    const [loading, setLoading] = useState(false);

    

    async function getTasks(){

        console.log("getTasks appelé");
        setLoading(true);

        try{
            const token = localStorage.getItem("token");
            const response = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            });
            setTasks(response.data);  //Le state devient: tasks = response.data; React effectue automatiquement un nouveau rendu de l'interface.
        }
        catch(error){
            console.log(error);
        } finally {
            setLoading(false);
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
                `/tasks/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
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

    const selectClass = `
        bg-[#1e2130] border border-[#2d3148] text-slate-300
        text-sm rounded-lg px-3 py-2 focus:outline-none
        focus:border-indigo-500 transition-colors cursor-pointer
    `;

    return (
        <div className="min-h-screen bg-[#0f1117]">

            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-slate-100">
                        Tableau de bord
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Gérez et suivez toutes vos tâches
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-8">
                    <DashboardStats tasks={tasks}/> 
                </div>

                {/* Formulaire */}
                <div className="mb-8">
                    <TaskForm 
                        onTaskCreated={getTasks}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                    />
                </div>

                {/* Barre de recherche + filtres */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    
                    {/* Recherche */}
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                        </span>

                        <input 
                            type="text" 
                            placeholder="Rechercher une tache..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#1e2130] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Filtre statut */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={selectClass}
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

                    {/* Tri */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={selectClass}
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

                </div>

            </div>
    
            {/* Liste des tâches */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <p className="text-slate-400 text-sm">Chargement...</p>
                </div>
            ) : sortedTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-12 h-12 bg-[#1e2130] border border-[#2d3148] rounded-xl flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-500" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                            <rect x="9" y="3" width="6" height="4" rx="1"/>
                        </svg>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                        Aucune tâche trouvée
                    </p>
                    <p className="text-slate-600 text-xs mt-1">
                        Créez votre première tâche ci-dessus
                    </p>
                </div>
            ) : (
                <TaskList
                    tasks={sortedTasks}
                    onEdit={handleEdit}
                    onDelete={deleteTask}
                />
            )}        
        </div>
        //On transmet donc les tâches via une prop.
    );
}

export default Dashboard;