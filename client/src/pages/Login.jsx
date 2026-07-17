import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import api from "../services/api";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(){
        try{
            const response = await api.post(
                "/login",
                {
                    email,
                    password
                }
            );

            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            /*setToken(): met à jour immédiatement le contexte React, ce qui provoque un nouveau rendu des composants.
            localStorage.setItem(): conserve le token même si l'utilisateur ferme puis rouvre le navigateur. */
            navigate("/dashboard");
        }
        catch(error) {
            console.log(error.response.data);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}                 />
            <input 
                type="password" 
                placeholder="Mot de passe" 
                value={passwordassword} 
                onChange={(e) => setPassword(e.target.value)}
            />

            <button>Connexion</button>

            <p>
                vous n'avez pas de compte ?
                <Link to="/register">
                    Créer un compte
                </Link>
            </p>                
        </form>

            
    );
}

export default Login;