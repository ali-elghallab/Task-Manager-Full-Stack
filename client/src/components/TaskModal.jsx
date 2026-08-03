// src/components/TaskModal.jsx
import { useState, useContext, useEffect } from "react";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

export default function TaskModal({ task, onClose, onSaved }) {
    const [formData, setFormData] = useState({
        title: "", description: "", status: "À faire", priority: "Moyenne"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState("");
    const {token} = useContext(AuthContext);

    // Remplir le formulaire avec les données de la tâche
    useEffect(() => {
        if (task) {
            setFormData({
                title:       task.title       || "",
                description: task.description || "",
                status:      task.status      || "À faire",
                priority:    task.priority    || "Moyenne"
            });
        }
    }, [task]);

    if (!task) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSave = async () => {
        if (!formData.title.trim()) {
            setError("Le titre est requis.");
            return;
        }

        setLoading(true);
        try {
            await api.put(
                `/tasks/${task.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onSaved();   // rafraîchit la liste
            onClose();   // ferme le modal
        } catch (err) {
            setError("Erreur lors de la modification. Réessayez.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = `
        w-full bg-[#0f1117] border border-[#2d3148] rounded-lg
        px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600
        focus:outline-none focus:border-indigo-500 transition-colors
    `;

    const priorityColor = {
        "Haute":   "text-red-400",
        "Moyenne": "text-yellow-400",
        "Basse":   "text-green-400"
    };

    return (
        // Overlay — clic en dehors ferme le modal
        <div
            className="fixed inset-0 bg-black/60 flex items-center
                       justify-center z-50 px-4"
            onClick={onClose}>

            {/* Card modal — stopper la propagation */}
            <div
                className="bg-[#1e2130] border border-[#2d3148]
                           rounded-xl p-6 w-full max-w-md
                           animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-sm font-medium text-slate-100">
                            Modifier la tâche
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Modifiez les informations ci-dessous
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center
                                   rounded-lg border border-[#2d3148]
                                   text-slate-500 hover:text-slate-300
                                   hover:border-slate-500 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Erreur */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border
                                    border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                <div className="space-y-4">

                    {/* Titre */}
                    <div>
                        <label className="block text-xs font-medium
                                          text-slate-400 mb-1.5">
                            Titre <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Titre de la tâche"
                            className={inputClass}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium
                                          text-slate-400 mb-1.5">
                            Description
                            <span className="text-slate-600 font-normal ml-1">
                                (optionnel)
                            </span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Décrivez la tâche..."
                            rows={3}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Statut + Priorité */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium
                                              text-slate-400 mb-1.5">
                                Statut
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={inputClass}>
                                <option value="À faire">À faire</option>
                                <option value="En cours">En cours</option>
                                <option value="Terminée">Terminée</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium
                                              text-slate-400 mb-1.5">
                                Priorité
                                <span className={`ml-2 font-normal
                                                  ${priorityColor[formData.priority]}`}>
                                    ● {formData.priority}
                                </span>
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className={inputClass}>
                                <option value="Basse">Basse</option>
                                <option value="Moyenne">Moyenne</option>
                                <option value="Haute">Haute</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-[#2d3148] my-5" />

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 text-sm text-slate-400
                                   border border-[#2d3148] rounded-lg
                                   py-2.5 hover:border-slate-500
                                   hover:text-slate-300 transition-colors">
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 text-sm text-white bg-indigo-500
                                   hover:bg-indigo-600 disabled:opacity-50
                                   disabled:cursor-not-allowed rounded-lg
                                   py-2.5 transition-colors flex items-center
                                   justify-center gap-2">
                        {loading ? "Enregistrement..." : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M20 6 9 17l-5-5"/>
                                </svg>
                                Enregistrer
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}