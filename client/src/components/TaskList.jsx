import TaskCard from "./TaskCard"

function TaskList({ tasks, onEdit, onDelete }){
    return (
        <div>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;