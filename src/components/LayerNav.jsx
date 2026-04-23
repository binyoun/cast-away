import React from "react";

const LAYERS = [
  { id: 1, label: 'The Gap',     sub: 'Situation & Tensions' },
  { id: 2, label: 'The Compass', sub: 'Solutions'            },
];

export default function LayerNav({ current, onChange, activeSolutions }) {
  const active = activeSolutions.filter(v => v > 0).length;
  const avg    = Math.round(activeSolutions.reduce((a, b) => a + b, 0) / 3);

  return (
    <nav className="layer-nav">
      <div className="nav-brand">
        <span className="nav-brand-title">Cast Away: From Star Island to Industry Hub</span>
        <span className="nav-brand-sub">IPL Ecosystem Map</span>
      </div>

      <div className="nav-layers">
        {LAYERS.map(l => (
          <button
            key={l.id}
            className={`nav-layer-btn${current === l.id ? ' active' : ''}`}
            onClick={() => onChange(l.id)}
          >
            <span className="nav-layer-num">{l.id}</span>
            <span className="nav-layer-label">{l.label}</span>
            <span className="nav-layer-sub">{l.sub}</span>
          </button>
        ))}
      </div>

      <div className="nav-meta">
        <a href="guide/" className="nav-guide-link">Navigator</a>
        {current === 2 ? (
          <span className={`solve-counter${active === 3 && avg >= 90 ? ' complete' : ''}`}>
            {active}/3 solutions · {avg}% avg
          </span>
        ) : (
          <span className="nav-hint">Click any node to explore</span>
        )}
      </div>
    </nav>
  );
}
