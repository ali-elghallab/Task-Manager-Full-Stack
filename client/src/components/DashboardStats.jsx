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

            if (task.status === "Terminé"){
                acc.completed++;
            }

            if (task.priority === "Haute"){
                acc.highPriority++;
            }
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

    return (
        <div className="stats">
            
            <div>
                <h3>Total</h3>
                <p>{stats.total}</p>
            </div>

            <div>
                <h3>À faire</h3>
                <p>{stats.todo}</p>
            </div>

            <div>
                <h3>En cours</h3>
                <p>{stats.inProgress}</p>
            </div>

            <div>
                <h3>Terminée</h3>
                <p>{stats.completed}</p>
            </div>

            <div>
                <h3>Haute</h3>
                <p>{stats.highPriority}</p>
            </div>

        </div>
    );
}

export default DashboardStats;