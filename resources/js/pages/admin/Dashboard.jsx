import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function AdminDashboard() {
    const { stats } = usePage().props;
    return (
        <div className="min-h-screen bg-gamma text-zinc-800 p-8">
            <Head title="Admin — Tableau de bord" />
            <h1 className="text-2xl font-semibold">Tableau de bord</h1>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(stats).map(([k, v]) => (
                    <div key={k} className="rounded-lg border bg-white p-4">
                        <p className="text-sm text-zinc-600">{k}</p>
                        <p className="mt-1 text-2xl font-semibold">{v}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


