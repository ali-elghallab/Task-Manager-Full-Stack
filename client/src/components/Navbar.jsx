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
        <nav className="bg-[#1e2130] border-b border-[#2d3148]">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="white" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                            <rect x="9" y="3" width="6" height="4" rx="1"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                    </div>

                    <span className="text-sm font-medium text-slate-100">
                        Task Manager
                    </span>
                </div>

                <button 
                    onClick={logout}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Déconexiion
                </button>
            </div>
        </nav>
    );
}

export default Navbar;