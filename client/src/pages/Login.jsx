import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);
        setError("");

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
        } catch(err) {
            setError('Email ou mot de passe incorrect.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-[#0f1117] min-h-screen flex flex-col justify-center items-center px-4'>

            {/* Logo + Titre */}
            <div className="text-center mb-8">

                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-xl mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2 m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <h1 className="text-2xl font-medium text-slate-100">
                    Task Manager
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Connecter-vous à votre espace de travail
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
                                className="w-full bg-[#0f1117] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                type="email" 
                                placeholder="ali@example.com" 
                                required
                                value={email} 
                                onChange={(e) => { 
                                    setEmail(e.target.value);
                                    setError("");
                                }}          
                            />
                        </div>    
                    </div>

                    {/* Champ Mot de passe */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <span className="absolute text-slate-500 left-3 top-1/2 -translate-y-1/2">
                                🔒
                            </span>
                            <input 
                                className="w-full bg-[#0f1117] border border-[#2d3148] rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                type={showPassword ? 'text' : 'password' } 
                                placeholder="••••••••"
                                required
                                value={password} 
                                onChange={(e) => { 
                                    setPassword(e.target.value)
                                    setError("");
                                }}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                {showPassword ? '🙈' : '👁' }
                            </button>
                            
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
                                Connexion en cours...
                            </>
                            ) : (
                                "Se connecter"
                            )}
                    </button>                
                </form>

                {/* Séparateur */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-[#2d3148]" />
                    <span className="text-xs text-slate-500">ou</span>
                    <div className="flex-1 h-px bg-[#2d3148]" />
                </div>

                {/* Lien Register */}
                <p className="text-center text-sm text-slate-500">
                    Pas encore de compte ?{' '}
                    <Link to="/register"
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Créer un compte
                    </Link>
                </p>
            </div>    
        </div>
    );
}

export default Login;