import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
    const { token } = useContext(AuthContext); //Demande: Donne-moi les données du contexte.
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("token");
        setToken(null); //setToken(null): informe immédiatement tous les composants que l'utilisateur est déconnecté.
        navigate("/login");
    }

    return (
        <button onClick={logout}>
            Déconexiion
        </button>
    );
}

export default Navbar;