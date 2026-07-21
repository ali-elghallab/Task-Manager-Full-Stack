function TaskCard({ task, onEdit, onDelete }){

    // Couleurs selon la priorité
    const priorityConfig = {
        "Haute":   { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20"    },
        "Moyenne": { color: "text-yellow-400",  bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
        "Basse":   { color: "text-green-400",   bg: "bg-green-500/10",  border: "border-green-500/20"  },
    };

    // Couleurs selon le statut
    const statusConfig = {
        "À faire":  { color: "text-slate-400",  bg: "bg-slate-500/10",  border: "border-slate-500/20"  },
        "En cours": { color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20"   },
        "Terminée": { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20"  },
    };

    // Icône selon le statut
    const statusIcon = {
        "À faire":  "○",
        "En cours": "◐",
        "Terminée": "●",
    };

    const priority = priorityConfig[task.priority] || priorityConfig["Moyenne"];
    const status   = statusConfig[task.status]     || statusConfig["À faire"];


    return(
        <div className="bg-[#1e2130] border border-[#2d3148] rounded-xl p-5 hover:border-indigo-500/30 transition-all duration-200 flex flex-col gap-4 group">

            {/* Header — Titre + Badge priorité */}
            <div className="flex items-start justify-between gap-3">

                <h3 className="text-sm font-medium text-slate-100 leading-snug line-clamp-2 flex-1">
                    {task.title}
                </h3>

                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${priority.color} ${priority.bg} ${priority.border}`}>
                    {task.priority}
                </span>
            
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Badge statut */}
            <div className="flex items-center gap-1.5">
                <span className={`text-xs ${status.color}`}>
                    {statusIcon[task.status]}
                </span>

                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${status.color} ${status.bg} ${status.border}`}>
                    {task.status}
                </span>
            </div>

            {/* Séparateur */}
            <div className="h-px bg-[#2d3148]" />
            
            {/* Modifier */}
            <button 
                onClick={() => onEdit(task)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 bg-transparent hover:bg-indigo-500/10 border border-[#2d3148] hover:border-indigo-500/30 px-3 py-2 rounded-lg transition-all duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Modifier
            </button>

            {/* Supprimer */}
            <button 
                onClick={() => onDelete(task.id)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-red-400 bg-transparent hover:bg-red-500/10 border border-[#2d3148] hover:border-red-500/30 px-3 py-2 rounded-lg transition-all duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
                Supprimer
            </button>
        </div>
    );
}

export default TaskCard;