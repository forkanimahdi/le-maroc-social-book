import React, { useState } from 'react';

export default function Tabs({ tabs, initial = 0 }) {
    const [active, setActive] = useState(initial);
    return (
        <div>
            <div className="flex gap-2">
                {tabs.map((t, i) => (
                    <button
                        key={t.label}
                        onClick={() => setActive(i)}
                        className={`px-3 py-1.5 text-sm ${i === active ? 'bg-zinc-900 text-white' : 'bg-white/70 text-zinc-800'} rounded-lg`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {tabs[active]?.content}
            </div>
        </div>
    );
}


