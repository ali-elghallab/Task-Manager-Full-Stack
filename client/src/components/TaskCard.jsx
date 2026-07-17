function TaskCard({ task, onEdit, onDelete }){
    return(
        <div>
            <h3>{task.titke}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.priority}</p>

            <button onClick={() => onEdit(task)}>
                Modifier
            </button>

            <button onClick={() => onDelete(task.id)}>
                Supprimer
            </button>
        </div>
    );
}

export default TaskCard;