import React from "react";

const LAYERS = [
  { id: 1, label: 'The Island',      sub: 'Linh\'s World'    },
  { id: 2, label: 'The Rescue Ship', sub: 'Khoa\'s World'    },
  { id: 3, label: 'The Storm',       sub: 'Critical Tension' },
  { id: 4, label: 'The Compass',     sub: 'Interventions'    },
];

export default function LayerNav({ current, onChange, activeSolutions }) {
  const active = activeSolutions.filter(v => v > 0).length;
  const avg    = Math.round(activeSolutions.reduce((a, b) => a + b, 0) / 3);

  return (
    <nav className="layer-nav">
      <div className="nav-brand">
        <span className="nav-brand-title">Cast Away</span>
        <span className="nav-brand-sub">IPL Ecosystem Map</span>
      </div>

      <div className="nav-layers">
        {LAYERS.map(l => (
          <button
            key={l.id}
            className={`nav-layer-btn${current === l.id ? ' active' : ''}${l.id === 3 ? ' nav-layer-btn-storm' : ''}`}
            onClick={() => onChange(l.id)}
          >
            <span className="nav-layer-num">{l.id}</span>
            <span className="nav-layer-label">{l.label}</span>
            <span className="nav-layer-sub">{l.sub}</span>
          </button>
        ))}
      </div>

      <div className="nav-meta">
        {current === 4 ? (
          <span className={`solve-counter${active === 3 && avg >= 90 ? ' complete' : ''}`}>
            {active}/3 interventions · {avg}% avg
          </span>
        ) : (
          <span className="nav-hint">Click any node to explore</span>
        )}
      </div>
    </nav>
  );
}
