import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";

function Dashboard() {
    async function getTasks(){
        try{
            const reponse = await api.get("/tasks");
            console.log(Response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <>
            <Navbar />
            <TaskForm />
            <TaskList />
        </>
    );
}

export default Dashboard;