import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../components/Layout";

export default function HomePage() {
    const { token } = useContext(AuthContext);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-20">

                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2
                                    bg-indigo-500/10 border border-indigo-500/20
                                    text-indigo-400 text-xs px-3 py-1.5
                                    rounded-full mb-6">
                        <span className="w-1.5 h-1.5 bg-indigo-400
                                         rounded-full animate-pulse"/>
                        Application Full Stack — React · Node.js · PostgreSQL
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold
                                   text-slate-100 mb-6 leading-tight">
                        Gérez vos tâches
                        <span className="text-indigo-400"> efficacement</span>
                    </h1>

                    <p className="text-slate-400 text-lg max-w-xl
                                  mx-auto mb-10">
                        Une application complète pour organiser, suivre
                        et accomplir vos tâches avec une interface
                        moderne et intuitive.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-center gap-4">
                        {token ? (
                            <Link to="/dashboard"
                                className="bg-indigo-500 hover:bg-indigo-600
                                           text-white font-medium px-6 py-3
                                           rounded-lg transition-colors">
                                Aller au Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link to="/register"
                                    className="bg-indigo-500 hover:bg-indigo-600
                                               text-white font-medium px-6 py-3
                                               rounded-lg transition-colors">
                                    Commencer gratuitement
                                </Link>
                                <Link to="/login"
                                    className="text-slate-400 hover:text-slate-100
                                               border border-[#2d3148]
                                               hover:border-slate-500
                                               px-6 py-3 rounded-lg
                                               transition-all">
                                    Se connecter
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        {
                            icon: "🔐",
                            title: "Authentification sécurisée",
                            description: "JWT + bcrypt pour protéger vos données"
                        },
                        {
                            icon: "📋",
                            title: "CRUD complet",
                            description: "Créer, modifier, filtrer et supprimer vos tâches"
                        },
                        {
                            icon: "📊",
                            title: "Tableau de bord",
                            description: "Statistiques et progression en temps réel"
                        }
                    ].map(({ icon, title, description }) => (
                        <div key={title}
                            className="bg-[#1e2130] border border-[#2d3148]
                                       rounded-xl p-6 text-center">
                            <div className="text-3xl mb-3">{icon}</div>
                            <h3 className="text-sm font-medium text-slate-100 mb-2">
                                {title}
                            </h3>
                            <p className="text-xs text-slate-500">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    );
}