import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-zinc-200/80 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-zinc-600">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} Le Maroc Social 2030 — Tous droits réservés.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-zinc-900">Mentions légales</a>
                        <a href="#" className="hover:text-zinc-900">Instagram</a>
                        <a href="#" className="hover:text-zinc-900">X/Twitter</a>
                        <a href="#" className="hover:text-zinc-900">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


