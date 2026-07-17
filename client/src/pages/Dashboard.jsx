import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    function logout(){
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <h1>Home page</h1>
            <button onClick={logout}>
                Déconexiion
            </button>
        </div>
    );
}

export default Dashboard;