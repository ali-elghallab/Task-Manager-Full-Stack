import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import DashboardStats from "../components/DashboardStats";
import api from "../services/api";
import Layout from "../components/Layout";
import TaskModal from "../components/TaskModal";
import TaskCharts from "../components/TaskCharts";

function Dashboard() {
    const [tasks, setTasks] = useState([]);  //Au départ: tasks = []
    const [modalTask, setModalTask] = useState(null);
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
        setModalTask(task);
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
        <Layout>

            {/* Modal modification */}
            <TaskModal
                task={modalTask}
                onClose={() => setModalTask(null)}
                onSaved={getTasks}
            />

            <div className="min-h-screen bg-[#0f1117]">
                <div className="max-w-7xl mx-auto px-4 py-8">

                    {/* ── Header ───────────────────────────────── */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-slate-100">
                            Tableau de bord
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Gérez et suivez toutes vos tâches
                        </p>
                    </div>

                    

                    {/* ── Layout 2 colonnes ─────────────────────── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* ── Colonne gauche (2/3) ──────────────── */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            
                            {/* ── Stats (pleine largeur) ────────────────── */}
                            <div className="mb-6">
                                <DashboardStats tasks={tasks}/>
                            </div>

                            {/* Recherche + Filtres */}
                            <div className="bg-[#1e2130] border border-[#2d3148]
                                            rounded-xl p-4">
                                <div className="flex flex-col sm:flex-row gap-3">

                                    {/* Recherche */}
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2
                                                         -translate-y-1/2 text-slate-500">
                                            <svg width="15" height="15"
                                                viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="m21 21-4.35-4.35"/>
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Rechercher une tâche..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full bg-[#0f1117] border border-[#2d3148]
                                                       rounded-lg pl-9 pr-4 py-2 text-sm
                                                       text-slate-100 placeholder-slate-600
                                                       focus:outline-none focus:border-indigo-500
                                                       transition-colors"
                                        />
                                    </div>

                                    {/* Filtre statut */}
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className={selectClass}>
                                        <option value="Tous">Tous les statuts</option>
                                        <option value="À faire">À faire</option>
                                        <option value="En cours">En cours</option>
                                        <option value="Terminée">Terminée</option>
                                    </select>

                                    {/* Tri */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className={selectClass}>
                                        <option value="none">Aucun tri</option>
                                        <option value="a->z">A → Z</option>
                                        <option value="z->a">Z → A</option>
                                        <option value="priorityHigh">Priorité ↓</option>
                                        <option value="priorityLow">Priorité ↑</option>
                                    </select>
                                </div>
                            </div>

                            {/* Compteur résultats */}
                            <div className="flex items-center justify-between -mt-2 px-1">
                                <p className="text-xs text-slate-500">
                                    {sortedTasks.length === 0
                                        ? "Aucune tâche trouvée"
                                        : `${sortedTasks.length} tâche${sortedTasks.length > 1 ? "s" : ""}`
                                    }
                                </p>
                                {statusFilter !== "Tous" && (
                                    <button
                                        onClick={() => setStatusFilter("Tous")}
                                        className="text-xs text-indigo-400 hover:text-indigo-300
                                                   flex items-center gap-1 transition-colors">
                                        {statusFilter} ✕
                                    </button>
                                )}
                            </div>

                            {/* Liste des tâches */}
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <p className="text-slate-400 text-sm">
                                        Chargement...
                                    </p>
                                </div>
                            ) : sortedTasks.length === 0 ? (
                                <div className="flex flex-col items-center
                                                justify-center py-20 text-center
                                                bg-[#1e2130] border border-[#2d3148]
                                                rounded-xl">
                                    <div className="w-12 h-12 bg-[#0f1117] border
                                                    border-[#2d3148] rounded-xl
                                                    flex items-center justify-center mb-4">
                                        <svg width="20" height="20" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor"
                                            strokeWidth="1.5" className="text-slate-500"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0
                                                     002 2h10a2 2 0 002-2V7a2 2 0
                                                     00-2-2h-2"/>
                                            <rect x="9" y="3" width="6" height="4" rx="1"/>
                                        </svg>
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        Aucune tâche trouvée
                                    </p>
                                    <p className="text-slate-600 text-xs mt-1">
                                        Créez votre première tâche →
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

                        {/* ── Colonne droite (1/3) ──────────────── */}
                        <div className="flex flex-col gap-6">

                            {/* Formulaire nouvelle tâche */}
                            <TaskForm onTaskCreated={getTasks}/>

                            {/* Graphiques */}
                            <TaskCharts tasks={tasks}/>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;