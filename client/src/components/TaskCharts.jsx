// src/components/TaskCharts.jsx
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Enregistrer les composants Chart.js utilisés
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function TaskCharts({ tasks }) {

    // ── Données pour le Donut (répartition statuts) ──────────────
    const todo       = tasks.filter(t => t.status === "À faire").length;
    const inProgress = tasks.filter(t => t.status === "En cours").length;
    const done       = tasks.filter(t => t.status === "Terminée").length;

    const donutData = {
        labels: ["À faire", "En cours", "Terminée"],
        datasets: [{
            data: [todo, inProgress, done],
            backgroundColor: [
                'rgba(148, 163, 184, 0.8)',   // slate  — À faire
                'rgba(99,  102, 241, 0.8)',   // indigo — En cours
                'rgba(34,  197,  94, 0.8)',   // green  — Terminée
            ],
            borderColor: [
                'rgba(148, 163, 184, 1)',
                'rgba(99,  102, 241, 1)',
                'rgba(34,  197,  94, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 6
        }]
    };

    const donutOptions = {
        responsive: true,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    font:  { size: 11 },
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 8
                }
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const pct   = total > 0
                            ? Math.round((ctx.parsed / total) * 100)
                            : 0;
                        return ` ${ctx.label} : ${ctx.parsed} (${pct}%)`;
                    }
                }
            }
        }
    };

    // ── Données pour le Bar (répartition priorités) ───────────────
    const low    = tasks.filter(t => t.priority === "Basse").length;
    const medium = tasks.filter(t => t.priority === "Moyenne").length;
    const high   = tasks.filter(t => t.priority === "Haute").length;

    const barData = {
        labels: ["Basse", "Moyenne", "Haute"],
        datasets: [{
            label: "Tâches",
            data: [low, medium, high],
            backgroundColor: [
                'rgba(34,  197,  94, 0.7)',   // green  — Basse
                'rgba(234, 179,   8, 0.7)',   // yellow — Moyenne
                'rgba(239,  68,  68, 0.7)',   // red    — Haute
            ],
            borderColor: [
                'rgba(34,  197,  94, 1)',
                'rgba(234, 179,   8, 1)',
                'rgba(239,  68,  68, 1)',
            ],
            borderWidth: 1,
            borderRadius: 6,
        }]
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => ` ${ctx.parsed.y} tâche${ctx.parsed.y > 1 ? 's' : ''}`
                }
            }
        },
        scales: {
            x: {
                grid:   { color: 'rgba(45, 49, 72, 0.8)' },
                ticks:  { color: '#94a3b8', font: { size: 11 } }
            },
            y: {
                grid:   { color: 'rgba(45, 49, 72, 0.8)' },
                ticks:  {
                    color: '#94a3b8',
                    font:  { size: 11 },
                    stepSize: 1,
                    // N'afficher que des entiers
                    callback: (val) => Number.isInteger(val) ? val : null
                },
                beginAtZero: true
            }
        }
    };

    // ── Pas de graphique si aucune tâche ─────────────────────────
    if (tasks.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    "Répartition des statuts",
                    "Répartition des priorités"
                ].map(title => (
                    <div key={title}
                        className="bg-[#1e2130] border border-[#2d3148]
                                   rounded-xl p-6 flex flex-col
                                   items-center justify-center h-48">
                        <p className="text-slate-500 text-sm">{title}</p>
                        <p className="text-slate-600 text-xs mt-1">
                            Aucune tâche à afficher
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">

            {/* Bar — Priorités */}
            <div className="bg-[#1e2130] border border-[#2d3148]
                            rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-100">
                        Priorités
                    </h3>
                    <div className="flex items-center gap-3 text-xs">
                        <span className="text-green-400">● Basse</span>
                        <span className="text-yellow-400">● Moyenne</span>
                        <span className="text-red-400">● Haute</span>
                    </div>
                </div>
                <Bar data={barData} options={barOptions} />
            </div>
            
            {/* Donut — Statuts */}
            <div className="bg-[#1e2130] border border-[#2d3148]
                            rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-100">
                        Statuts
                    </h3>
                    <span className="text-xs text-slate-500">
                        {tasks.length} tâche{tasks.length > 1 ? 's' : ''}
                    </span>
                </div>
                <div className="max-w-[220px] mx-auto">
                    <Doughnut data={donutData} options={donutOptions} />
                </div>
            </div>

            

        </div>
    );
}