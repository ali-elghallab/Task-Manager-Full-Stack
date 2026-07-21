function DashboardStats({ tasks }) {

    const stats = tasks.reduce(  //reduce() parcourt un tableau une seule fois et construit un résultat.
        (acc, task) => {

            acc.total++;

            if (task.status === "À faire"){
                acc.todo++;
            }

            if (task.status === "En cours"){
                acc.inProgress++;
            }

            if (task.status === "Terminée"){
                acc.completed++;
            }

            if (task.priority === "Haute"){
                acc.highPriority++;
            }
        
            return acc;
        },
        {
            total:0,
            todo:0,
            inProgress:0,
            completed:0,
            highPriority:0
        }
    )

    /* const totalTasks = tasks.length;

    const todoTasks = tasks.filter(
        tasks => tasks.status === "À faire"
    ).length;

    const inProgressTasks = tasks.filter(
        tasks => tasks.status === "En cours"
    ).length;
    
    const completedTasks = tasks.filter(
        tasks => tasks.status === "Terminée"
    ).length;

    const highPriorityTasks = tasks.filter(
        tasks => tasks.priority === "Haute"
    ).length; */

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    const cards = [
        {
            label:  "Total",
            value:  stats.total,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                    <rect x="9" y="3" width="6" height="4" rx="1"/>
                </svg>
            ),
            iconBg:    "bg-indigo-500/10",
            iconColor: "text-indigo-400",
            border:    "border-[#2d3148]",
        },
        {
            label:  "À faire",
            value:  stats.todo,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                </svg>
            ),
            iconBg:    "bg-slate-500/10",
            iconColor: "text-slate-400",
            border:    "border-[#2d3148]",
        },
        {
            label:  "En cours",
            value:  stats.inProgress,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83M2 12h4M18 12h4 M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
            ),
            iconBg:    "bg-blue-500/10",
            iconColor: "text-blue-400",
            border:    "border-[#2d3148]",
        },
        {
            label:  "Terminées",
            value:  stats.completed,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            ),
            iconBg:    "bg-green-500/10",
            iconColor: "text-green-400",
            border:    "border-[#2d3148]",
        },
        {
            label:  "Priorité haute",
            value:  stats.highPriority,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            ),
            iconBg:    "bg-red-500/10",
            iconColor: "text-red-400",
            border:    "border-[#2d3148]",
        },
    ];


    return (
        <div className="space-y-4">
            
            {/* Cartes stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {cards.map(({ label, value, icon, iconBg, iconColor, border }) => (
                    <div key={label}
                        className={`bg-[#1e2130] border ${border} rounded-xl p-4 flex flex-col gap-3`}>

                        {/* Icône */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
                            {icon}
                        </div>

                        {/* Valeur + Label */}
                        <div>
                            <p className="text-2xl font-semibold text-slate-100">
                                {value}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {label}
                            </p>
                        </div>
                    </div>
                ))}
            
            </div>

            <div>
                {/* Barre de progression globale */}
                {stats.total > 0 && (
                    <div className="bg-[#1e2130] border border-[#2d3148] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-slate-300">
                                Progression globale
                            </p>
                            <p className="text-xs font-medium text-slate-300">
                                {completionRate}%
                            </p>
                        </div>

                        {/* Barre */}
                        <div className="w-full bg-[#0f1117] rounded-full h-1.5">
                            <div 
                                className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>

                        {/* Légende */}
                        <div>
                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                <span className="w-2 h-2 rounded-full bg-slate-600"/>
                                À faire : {stats.todo}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-blue-400">
                                <span className="w-2 h-2 rounded-full bg-slate-600"/>
                                En cours : {stats.inProgress}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-green-400">
                                <span className="w-2 h-2 rounded-full bg-slate-600"/>
                                Terminées : {stats.completed}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardStats;