import React, { useState } from 'react';

const STORAGE_KEY = 'ms2030_newsletter';

function saveSubscriber(item) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    list.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function simulateExternalSend(item) {
    // Simulation d’un envoi via Mailchimp/Brevo
    // eslint-disable-next-line no-console
    console.log('Simulation API newsletter', item);
    return new Promise((r) => setTimeout(r, 600));
}

function exportCsv() {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const header = ['nom', 'email'];
    const rows = list.map((s) => [s.nom, s.email]);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter.csv';
    a.click();
    URL.revokeObjectURL(url);
}

export default function Newsletter() {
    const [state, setState] = useState({ nom: '', email: '' });
    const [ok, setOk] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        saveSubscriber(state);
        await simulateExternalSend(state);
        setOk(true);
        setState({ nom: '', email: '' });
    };

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between gap-6 flex-wrap">
                <h2 className="text-3xl font-semibold tracking-tight">Newsletter</h2>
                <button onClick={exportCsv} className="text-sm px-3 py-1.5 rounded-md bg-white/70 hover:bg-white/80">Exporter (.csv)</button>
            </div>

            <form onSubmit={submit} className="mt-6 grid sm:grid-cols-3 gap-4">
                 <div className="sm:col-span-1">
                    <label className="block text-sm">Nom</label>
                     <input required value={state.nom} onChange={(e) => setState({ ...state, nom: e.target.value })} className="mt-1 w-full input-soft" placeholder="Votre nom" />
                </div>
                 <div className="sm:col-span-1">
                    <label className="block text-sm">E‑mail</label>
                     <input required type="email" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} className="mt-1 w-full input-soft" placeholder="nom@exemple.com" />
                </div>
                 <div className="sm:col-span-1 flex items-end">
                     <button className="w-full sm:w-auto btn-primary" type="submit">S’abonner</button>
                </div>
            </form>
            {ok && <p className="mt-3 text-green-700">Merci ! Vérifiez votre boîte e‑mail (simulation).</p>}
        </div>
    );
}


