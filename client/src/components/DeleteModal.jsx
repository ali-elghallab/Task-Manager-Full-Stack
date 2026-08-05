// src/components/DeleteModal.jsx
export default function DeleteModal({ task, onClose, onConfirm, loading }) {

    if (!task) return null;

    return (
        // Overlay
        <div
            className="fixed inset-0 bg-black/60 flex items-center
                       justify-center z-50 px-4"
            onClick={onClose}>

            {/* Card modal */}
            <div
                className="bg-[#1e2130] border border-[#2d3148]
                           rounded-xl p-6 w-full max-w-sm"
                onClick={e => e.stopPropagation()}>

                {/* Icône warning */}
                <div className="flex items-center justify-center mb-5">
                    <div className="w-14 h-14 bg-red-500/10 border
                                    border-red-500/20 rounded-full
                                    flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round" className="text-red-400">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0
                                     0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1
                                     0 0 1 1 1v2"/>
                        </svg>
                    </div>
                </div>

                {/* Texte */}
                <div className="text-center mb-6">
                    <h2 className="text-sm font-medium text-slate-100 mb-2">
                        Supprimer la tâche
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Voulez-vous supprimer
                        <span className="text-slate-200 font-medium">
                            {" "}&quot;{task.title}&quot;{" "}
                        </span>
                        ? Cette action est irréversible.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 text-sm text-slate-400
                                   border border-[#2d3148] rounded-lg
                                   py-2.5 hover:border-slate-500
                                   hover:text-slate-300 transition-colors
                                   disabled:opacity-50">
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 text-sm text-white bg-red-500
                                   hover:bg-red-600 disabled:opacity-50
                                   disabled:cursor-not-allowed rounded-lg
                                   py-2.5 transition-colors flex items-center
                                   justify-center gap-2">
                        {loading ? "Suppression..." : (
                            <>
                                <svg width="13" height="13" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2
                                             2 0 0 1-2-2L5 6"/>
                                    <path d="M10 11v6M14 11v6"/>
                                </svg>
                                Supprimer
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}