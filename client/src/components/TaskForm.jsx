import { useState, useContext, useEffect } from "react";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

function TaskForm({ onTaskCreated, editingTask, setEditingTask }){

    const { token } = useContext(AuthContext);            
            /*Cette ligne récuplère le JWT.
            Parce que la route est protégée.
            router.post(
                "/tasks",
                authMiddleware,  Le middleware vérifie, si valide on crée la tache
                createTask
            ); */
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("À faire");
    const [priority, setPriority] = useState("Moyenne");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
            setPriority(editingTask.priority);
        }
    }, [editingTask]);

    function resetForm() {
        setTitle("");
        setDescription("");
        setStatus("À faire");
        setPriority("Moyenne");
        setEditingTask(null);
        setError("");
    }

    async function handleSubmit(e){
        e.preventDefault();   //lorsqu'un formulaire est envoyé, le navigateur recharge la page

        if (!title.trim()) {
            setError("Le titre est requis.");
            return;
        }

        setLoading(true);
        setError("");


        try{
            
            if(editingTask){
                await api.put(
                    `/tasks/${editingTask.id}`,
                    {
                        title,
                        description,
                        status,
                        priority
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                await api.post(
                    "/tasks",
                    {
                        title,
                        description,
                        status,
                        priority
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            console.log("Tâche créée");
            onTaskCreated();   // rafraîchit la liste dans Dashboard
            resetForm();

        } catch(error) {
            setError("Une erreur est survenue. Réessayez.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Classes réutilisables
    const inputClass = `
        w-full bg-[#0f1117] border border-[#2d3148] rounded-lg
        px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600
        focus:outline-none focus:border-indigo-500 transition-colors
    `;

    const selectClass = `
        w-full bg-[#0f1117] border border-[#2d3148] rounded-lg
        px-3 py-2.5 text-sm text-slate-300
        focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer
    `;

    const priorityColor = {
        "Haute":   "text-red-400",
        "Moyenne": "text-yellow-400",
        "Basse":   "text-green-400"
    };

    return(
        <div className="bg-[#1e2130] border border-[#2d3148] rounded-xl p-6">

            {/* Header du formulaire */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-base font-medium text-slate-100">
                        {editingTask ? "Modifier la tâche" : "Nouvelle tâche"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {editingTask
                            ? "Modifiez les informations de la tâche"
                            : "Remplissez les informations pour créer une tâche"
                        }
                    </p>
                </div>
                
                {/* Bouton annuler visible seulement en mode édition */}
                {editingTask && (
                    <button 
                        type="button"
                        onClick={resetForm}
                        className="text-xs text-slate-500 hover:text-slate-300 border border-[#2d3148] hover:border-slate-500 px-3 py-1.5 rounded-lg transition-colors">
                        Annuler
                    </button>
                )}
            </div>

            {/* Erreur */}
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Titre */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        Titre <span className="text-red-400">*</span>
                    </label>

                    <input 
                        type="text" 
                        placeholder="Titre de la tâche" 
                        value={title} 
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setError("");
                        }}
                        className={inputClass}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        Description
                        <span className="text-slate-500 font-normal ml-1">
                            (optionnel)
                        </span>
                    </label>

                    <textarea
                        placeholder="Décrivez la tâche en détail..." 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className={`${inputClass} resize-none`}
                    />
                </div>

                {/* Statut + Priorité côte à côte */}
                <div className="grid grid-cols-2 gap-4">
                    
                    {/* Statut */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Statut
                        </label>

                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className={selectClass}
                        >
                            <option>À faire</option>
                            <option>En cours</option>
                            <option>Terminée</option>
                        </select>
                    </div>

                    {/* Priorité */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Priorité
                            {/* Badge couleur live */}
                            <span className={`ml-2 text-xs font-normal ${priorityColor[priority]}`}>
                                ● {priority}
                                </span>
                        </label>

                        <select
                            value={priority} 
                            onChange={(e) => setPriority(e.target.value)}
                            className={selectClass}
                        >
                            <option>Basse</option>
                            <option>Moyenne</option>
                            <option>Haute</option>
                        </select>
                    </div>
                </div>

                {/* Bouton submit */}
                <button 
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-2">
                    {loading ? (
                        "En cours..."
                    ) : editingTask ? (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5"/>
                            </svg>
                            Enregistrer les modifications
                        </>
                    ) : (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            Ajouter la tâche
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;