import React, { useState } from 'react';

export default function Tabs({ tabs, initial = 0 }) {
    const [active, setActive] = useState(initial);
    
    const getTabColor = (label) => {
        if (label === 'Présentation') {
            return {
                active: { backgroundColor: 'var(--royal-red)', color: 'white' },
                inactive: { backgroundColor: 'rgba(134, 2, 5, 0.1)', color: 'var(--royal-red)' }
            };
        } else if (label === 'Extraits') {
            return {
                active: { backgroundColor: 'var(--royal-green)', color: 'white' },
                inactive: { backgroundColor: 'rgba(27, 78, 11, 0.1)', color: 'var(--royal-green)' }
            };
        } else if (label === 'Messages clés') {
            return {
                active: { backgroundColor: 'var(--gold)', color: 'black' },
                inactive: { backgroundColor: 'rgba(204, 185, 116, 0.1)', color: 'var(--gold)' }
            };
        }
        return {
            active: { backgroundColor: 'var(--royal-red)', color: 'white' },
            inactive: { backgroundColor: 'rgba(134, 2, 5, 0.1)', color: 'var(--royal-red)' }
        };
    };
    
    return (
        <div>
            <div className="flex gap-2 flex-wrap">
                {tabs.map((t, i) => {
                    const colors = getTabColor(t.label);
                    const isActive = i === active;
                    return (
                        <button
                            key={t.label}
                            onClick={() => setActive(i)}
                            className="px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                            style={isActive ? colors.active : colors.inactive}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>
            <div className="mt-6">
                {tabs[active]?.content}
            </div>
        </div>
    );
}


