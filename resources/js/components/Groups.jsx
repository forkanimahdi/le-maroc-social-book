import React, { useState } from 'react';
import { GROUP_LINKS } from '../config/groups.js';

export default function Groups() {
    const [form, setForm] = useState({ group: 'education', nom: '', email: '', domaine: '', motivation: '' });
    const [done, setDone] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setDone(true);
    };

    const link = GROUP_LINKS[form.group];

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold tracking-tight">Groupes de Travail</h2>
            <p className="mt-4 text-zinc-700 max-w-3xl">
                Quatre groupes réunissent citoyen·ne·s et expert·e·s pour concevoir des actions concrètes :
            </p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { t: 'Éducation et Jeunesse' },
                    { t: 'Santé et Protection sociale' },
                    { t: 'Économie solidaire et Emploi' },
                    { t: 'Genre, Inclusion et Citoyenneté' },
                ].map((g) => (
                    <div key={g.t} className="card-surface px-4 py-3">{g.t}</div>
                ))}
            </div>

            <form onSubmit={submit} className="mt-8 grid gap-4">
                <div>
                    <label className="block text-sm">Choix du groupe</label>
                    <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} className="mt-1 w-full input-soft">
                        <option value="education">Éducation et Jeunesse</option>
                        <option value="sante">Santé et Protection sociale</option>
                        <option value="economie">Économie solidaire et Emploi</option>
                        <option value="genre">Genre, Inclusion et Citoyenneté</option>
                    </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm">Nom</label>
                        <input required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="mt-1 w-full input-soft" placeholder="Votre nom" />
                    </div>
                    <div>
                        <label className="block text-sm">E‑mail</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full input-soft" placeholder="nom@exemple.com" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm">Domaine d’intérêt</label>
                    <input value={form.domaine} onChange={(e) => setForm({ ...form, domaine: e.target.value })} className="mt-1 w-full input-soft" placeholder="Ex. inclusion numérique" />
                </div>
                <div>
                    <label className="block text-sm">Motivation</label>
                    <textarea rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className="mt-1 w-full input-soft" placeholder="Pourquoi souhaitez-vous rejoindre ce groupe ?" />
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-primary" type="submit">S’inscrire</button>
                    {done && (
                        <span className="text-green-700 text-sm">Merci pour votre inscription !</span>
                    )}
                </div>
            </form>

            {done && (
                <div className="mt-6 p-4 rounded-md bg-green-50/80 text-green-900">
                    <p>
                        Rejoindre le groupe sélectionné :{' '}
                        <a className="underline font-medium" href={link} target="_blank" rel="noreferrer">Lien WhatsApp</a>
                    </p>
                </div>
            )}
        </div>
    );
}


