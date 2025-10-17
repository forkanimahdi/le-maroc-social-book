import React, { useMemo, useState } from 'react';

// Stockage local simple pour la modération
const STORAGE_KEY = 'ms2030_ideas';

function loadIdeas() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveIdeas(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function IdeasBox() {
    const [text, setText] = useState('');
    const [agree, setAgree] = useState(false);
    const [ideas, setIdeas] = useState(loadIdeas());
    const [submitted, setSubmitted] = useState(false);

    const approvedIdeas = useMemo(() => ideas.filter((i) => i.status === 'approved'), [ideas]);

    const submitIdea = (e) => {
        e.preventDefault();
        const newIdea = { id: crypto.randomUUID(), text, agree, status: 'pending', createdAt: Date.now() };
        const next = [newIdea, ...ideas];
        setIdeas(next);
        saveIdeas(next);
        setSubmitted(true);
        setText('');
        setAgree(false);
    };

    // Modération locale simple: approbation via prompt admin simulé
    const simulateModeration = () => {
        const toApprove = ideas.find((i) => i.status === 'pending');
        if (!toApprove) return;
        const ok = confirm('Approuver la prochaine idée en attente ?');
        if (!ok) return;
        const next = ideas.map((i) => i.id === toApprove.id ? { ...i, status: 'approved' } : i);
        setIdeas(next);
        saveIdeas(next);
    };

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between gap-6 flex-wrap">
                <h2 className="text-3xl font-semibold tracking-tight">Boîte à Idées</h2>
                <button onClick={simulateModeration} className="text-sm px-3 py-1.5 rounded-md bg-white/70 hover:bg-white/80">Modération (simulation)</button>
            </div>

            <form onSubmit={submitIdea} className="mt-6 grid gap-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows={4}
                    className="w-full input-soft"
                    placeholder="Partagez votre idée pour un Maroc plus solidaire..."
                />
                <label className="flex items-center gap-2 text-sm text-zinc-700">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} required />
                    J’accepte que mon idée soit publiée.
                </label>
                <div>
                    <button className="btn-primary" type="submit">Envoyer mon idée</button>
                    {submitted && <span className="ml-3 text-green-700 text-sm">Merci ! Votre idée est en cours de modération.</span>}
                </div>
            </form>

            <div className="mt-10">
                <h3 className="text-lg font-medium">Idées approuvées</h3>
                {approvedIdeas.length === 0 ? (
                    <p className="mt-3 text-zinc-600">Aucune idée publiée pour le moment.</p>
                ) : (
                    <ul className="mt-4 grid gap-3">
                        {approvedIdeas.map((i) => (
                            <li key={i.id} className="p-4 card-surface">
                                <p className="text-zinc-800">{i.text}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}


