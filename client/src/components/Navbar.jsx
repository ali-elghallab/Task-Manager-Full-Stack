import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <header className="bg-[#1e2130] border-b border-[#2d3148]">
            <div className="max-w-6xl mx-auto px-4 h-16
                            flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg
                                    flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="white" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0
                                     002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                            <rect x="9" y="3" width="6" height="4" rx="1"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-100">
                        Task Manager
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-3">
                    {token ? (
                        <>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-sm
                                           text-slate-400 hover:text-red-400
                                           border border-[#2d3148]
                                           hover:border-red-500/30
                                           hover:bg-red-500/10
                                           px-3 py-1.5 rounded-lg
                                           transition-all duration-200">
                                <svg width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"
                                className="text-sm text-slate-400
                                           hover:text-slate-100
                                           transition-colors">
                                Connexion
                            </Link>
                            <Link to="/register"
                                className="text-sm text-white bg-indigo-500
                                           hover:bg-indigo-600 px-4 py-1.5
                                           rounded-lg transition-colors">
                                Créer un compte
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}