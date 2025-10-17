import React from 'react';

export default function QuoteModal({ open, onClose, quote, author, variant = 'red' }) {
    if (!open) return null;
    const bg = variant === 'green' ? 'bg-royal-green' : 'bg-royal-red';
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className={`w-full max-w-2xl p-6 ${bg} quote-surface`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gold">Citation</h3>
                    <button onClick={onClose} className="text-gold hover:opacity-80">✕</button>
                </div>
                <figure className="mt-4">
                    <blockquote className="text-xl leading-relaxed italic relative pl-6 text-cream">
                        <span className="absolute left-0 top-0 text-4xl text-gold">“</span>
                        <span className="[text-shadow:0_1px_0_rgba(0,0,0,.2)]">{quote}</span>
                        <span className="align-text-top text-4xl text-gold">”</span>
                    </blockquote>
                    {author && <figcaption className="mt-3 text-sm text-gold">— {author}</figcaption>}
                </figure>
            </div>
        </div>
    );
}


