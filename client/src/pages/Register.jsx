import api from "../services/api";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    async function handleSubmit(e){
        e.preventDefault();

        if ( password != confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try{
            const response = await api.post(
                "/register",
                {
                    name,
                    email,
                    password
                }
            );
            console.log(response.data);
            alert("Inscription réussie !");
            Navigate("/login");
        }
        catch(error){
            console.log(error.response.data);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nom complet" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Mot de passe" 
                value={passwordassword} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Comfirmé le mot de passe" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button>S'inscrire</button>

            <p>
                <Link to="/login">
                    Se connecter
                </Link>
            </p>
        </form>
    );
}

export default Register;