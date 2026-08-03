import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../components/Layout";

export default function HomePage() {
    const { token } = useContext(AuthContext);

    return (
        <Layout>
            <div className="min-h-screen bg-[#0f1117]">

                {/* ── Hero Section ─────────────────────────────── */}
                <section className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2
                                    bg-indigo-500/10 border border-indigo-500/20
                                    text-indigo-400 text-xs px-4 py-1.5
                                    rounded-full mb-8">
                        <span className="w-1.5 h-1.5 bg-indigo-400
                                         rounded-full animate-pulse"/>
                        Projet Full Stack — React · Node.js · PostgreSQL
                    </div>

                    {/* Titre */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl
                                   font-bold text-slate-100 leading-tight mb-6">
                        Organisez vos tâches
                        <br/>
                        <span className="text-indigo-400">
                            avec efficacité
                        </span>
                    </h1>

                    {/* Sous-titre */}
                    <p className="text-slate-400 text-lg max-w-2xl
                                  mx-auto mb-10 leading-relaxed">
                        Une application complète pour créer, organiser et suivre
                        vos tâches avec une authentification sécurisée,
                        des filtres avancés et un tableau de bord statistique.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-center gap-4
                                    flex-wrap">
                        {token ? (
                            <Link to="/dashboard"
                                className="bg-indigo-500 hover:bg-indigo-600
                                           text-white font-medium px-8 py-3
                                           rounded-lg transition-colors
                                           flex items-center gap-2">
                                Aller au Dashboard
                                <svg width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <Link to="/register"
                                    className="bg-indigo-500 hover:bg-indigo-600
                                               text-white font-medium px-8 py-3
                                               rounded-lg transition-colors">
                                    Commencer gratuitement
                                </Link>
                                <Link to="/login"
                                    className="text-slate-300 hover:text-slate-100
                                               border border-[#2d3148]
                                               hover:border-slate-500
                                               px-8 py-3 rounded-lg
                                               transition-all">
                                    Se connecter
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Stack badges */}
                    <div className="flex items-center justify-center
                                    gap-2 flex-wrap mt-10">
                        {[
                            "React.js", "Node.js", "Express",
                            "PostgreSQL", "JWT", "Tailwind CSS"
                        ].map(tech => (
                            <span key={tech}
                                className="text-xs text-slate-500
                                           border border-[#2d3148]
                                           px-3 py-1 rounded-full">
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* ── Features Section ─────────────────────────── */}
                <section className="max-w-6xl mx-auto px-4 pb-20">

                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold text-slate-100 mb-3">
                            Tout ce qu'il vous faut
                        </h2>
                        <p className="text-slate-400 text-sm max-w-lg mx-auto">
                            Une application pensée pour être simple,
                            sécurisée et efficace.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2
                                    lg:grid-cols-3 gap-4">
                        {[
                            {
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                ),
                                color:       "text-indigo-400",
                                bg:          "bg-indigo-500/10",
                                title:       "Authentification sécurisée",
                                description: "Inscription et connexion avec JWT et bcrypt. Chaque utilisateur accède uniquement à ses propres tâches."
                            },
                            {
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0
                                                 002 2h10a2 2 0 002-2V7a2 2 0
                                                 00-2-2h-2"/>
                                        <rect x="9" y="3" width="6" height="4" rx="1"/>
                                        <path d="m9 12 2 2 4-4"/>
                                    </svg>
                                ),
                                color:       "text-green-400",
                                bg:          "bg-green-500/10",
                                title:       "CRUD complet",
                                description: "Créez, consultez, modifiez et supprimez vos tâches avec une interface intuitive et réactive."
                            },
                            {
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="m21 21-4.35-4.35"/>
                                    </svg>
                                ),
                                color:       "text-blue-400",
                                bg:          "bg-blue-500/10",
                                title:       "Recherche et filtres",
                                description: "Recherchez par titre, filtrez par statut et triez par priorité ou ordre alphabétique."
                            },
                            {
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M3 3v18h18"/>
                                        <path d="m19 9-5 5-4-4-3 3"/>
                                    </svg>
                                ),
                                color:       "text-yellow-400",
                                bg:          "bg-yellow-500/10",
                                title:       "Statistiques en temps réel",
                                description: "Visualisez votre progression avec des graphiques de répartition des statuts et des priorités."
                            },
                            {
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3
                                                 L7 19l-4 1 1-4L16.5 3.5z"/>
                                    </svg>
                                ),
                                color:       "text-purple-400",
                                bg:          "bg-purple-500/10",
                                title:       "Modification rapide",
                                description: "Modifiez vos tâches via un modal popup sans quitter la page ni perdre le contexte."
                            },
                            {
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                                        <path d="M8 21h8M12 17v4"/>
                                    </svg>
                                ),
                                color:       "text-slate-400",
                                bg:          "bg-slate-500/10",
                                title:       "Interface responsive",
                                description: "Design adapté à tous les écrans — desktop, tablette et mobile — avec un mode sombre élégant."
                            }
                        ].map(({ icon, color, bg, title, description }) => (
                            <div key={title}
                                className="bg-[#1e2130] border border-[#2d3148]
                                           rounded-xl p-6 hover:border-indigo-500/30
                                           transition-all duration-200">
                                <div className={`w-10 h-10 ${bg} ${color}
                                                 rounded-lg flex items-center
                                                 justify-center mb-4`}>
                                    {icon}
                                </div>
                                <h3 className="text-sm font-medium
                                               text-slate-100 mb-2">
                                    {title}
                                </h3>
                                <p className="text-xs text-slate-500
                                              leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Stack Technique Section ───────────────────── */}
                <section className="max-w-6xl mx-auto px-4 pb-20">
                    <div className="bg-[#1e2130] border border-[#2d3148]
                                    rounded-xl p-8">

                        <div className="text-center mb-8">
                            <h2 className="text-xl font-semibold
                                           text-slate-100 mb-2">
                                Stack technique
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Technologies utilisées dans ce projet
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: "Frontend",      value: "React.js + Tailwind CSS" },
                                { label: "Backend",       value: "Node.js + Express.js"    },
                                { label: "Base de données", value: "PostgreSQL + Supabase" },
                                { label: "Auth",          value: "JWT + bcrypt"            },
                            ].map(({ label, value }) => (
                                <div key={label}
                                    className="text-center p-4 bg-[#0f1117]
                                               border border-[#2d3148] rounded-lg">
                                    <p className="text-xs text-slate-500 mb-1">
                                        {label}
                                    </p>
                                    <p className="text-sm font-medium
                                                  text-slate-200">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA Final ────────────────────────────────── */}
                {!token && (
                    <section className="max-w-6xl mx-auto px-4 pb-24">
                        <div className="text-center bg-indigo-500/10
                                        border border-indigo-500/20
                                        rounded-xl py-16 px-8">
                            <h2 className="text-2xl font-semibold
                                           text-slate-100 mb-3">
                                Prêt à vous organiser ?
                            </h2>
                            <p className="text-slate-400 text-sm mb-8">
                                Créez votre compte gratuitement et
                                commencez à gérer vos tâches.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link to="/register"
                                    className="bg-indigo-500 hover:bg-indigo-600
                                               text-white font-medium px-8 py-3
                                               rounded-lg transition-colors">
                                    Créer un compte
                                </Link>
                                <Link to="/login"
                                    className="text-indigo-400 hover:text-indigo-300
                                               transition-colors text-sm">
                                    Déjà un compte ? Se connecter →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </Layout>
    );
}