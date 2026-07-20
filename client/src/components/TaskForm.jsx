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

    useEffect(() => {
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
            setPriority(editingTask.priority);
        }
    }, [editingTask]);

    async function handleSubmit(e){
        e.preventDefault();   //lorsqu'un formulaire est envoyé, le navigateur recharge la page

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

                        headers:{

                            Authorization:`Bearer ${token}`

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

                        headers:{

                            Authorization:`Bearer ${token}`

                        }
                    }
                );
            }
        }

        catch(error){
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
            >
                <option>À faire</option>
                <option>En cours</option>
                <option>Terminée</option>
            </select>
            <select
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
            >
                <option>Basse</option>
                <option>Moyenne</option>
                <option>Haute</option>
            </select>

            <button type="submit">
                {editingTask ? "Modifier" : "Ajouter"}
            </button>
        </form>
    );
}

export default TaskForm;