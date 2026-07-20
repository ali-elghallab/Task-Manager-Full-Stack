import api from "../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault();

        if (!name.trim()) {
            setError("Le nom complet est requis.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("L'adresse email n'est pas valide. Exemple : ali@gmail.com");
            return;
        }

        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        if (password !== confirmPassword) {   
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post(
                "/register",
                {
                    name,
                    email,
                    password
                }
            );
            
            navigate("/login");

        } catch(error){
            setError("Une erreur est survenue. Réessayez.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#0f1117] min-h-screen flex flex-col justify-center items-center px-4">

            {/* Logo + Titre */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center
                                w-12 h-12 bg-indigo-500 rounded-xl mb-4">
                    <svg className="w-6 h-6 text-white" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0
                            002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0
                            002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012
                            2m-6 9l2 2 4-4"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-medium text-slate-100">
                    Task Manager
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Créez votre espace de travail
                </p>
            </div>

            {/* Card formulaire */}
            <div className="bg-[#1e2130] border border-[#2d3148] p-8 rounded-xl w-full max-w-md">

                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Nom complet */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Nom complet
                        </label>
                        <div className="relative">
                            <span className="absolute text-slate-500 left-3 top-1/2 -translate-y-1/2">
                                ✉
                            </span>
                            <input 
                                type="text" 
                                placeholder="Nom complet" 
                                value={name} 
                                onChange={(e) => { 
                                    setName(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full bg-[#0f1117] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Adresse email
                        </label>
                        <div className="relative">
                            <span className="absolute text-slate-500 left-3 top-1/2 -translate-y-1/2">
                                ✉
                            </span>
                            <input 
                                type="email" 
                                placeholder="ali@example.com" 
                                value={email} 
                                onChange={(e) => { 
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full bg-[#0f1117] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" 
                            />
                        </div>
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <span className="absolute text-slate-500 left-3 top-1/2 -translate-y-1/2">
                                ✉
                            </span>
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={password} 
                                onChange={(e) => { 
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full bg-[#0f1117] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Confirmer mot de passe */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Confirmer le mot de passe
                        </label>
                        <div className="relative">
                            <span className="absolute text-slate-500 left-3 top-1/2 -translate-y-1/2">
                                ✉
                            </span>
                            <input 
                                type="password" 
                                placeholder="Comfirmé le mot de passe" 
                                value={confirmPassword} 
                                onChange={(e) => { 
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full bg-[#0f1117] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Bouton submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                        {loading ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                Inscription en cours...
                            </>
                            ) : (
                                "Créer un compte"
                        )}
                    </button>

                </form>

                {/* Séparateur */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-[#2d3148]" />
                    <span className="text-xs text-slate-500">ou</span>
                    <div className="flex-1 h-px bg-[#2d3148]" />
                </div>

                {/* Lien Login */}
                <p className="text-center text-sm text-slate-500">
                    Déjà un compte ?{" "}
                    <Link to="/login"
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;