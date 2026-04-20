import React from "react";

const LAYER_LABELS = ['Situation', 'Tensions', 'Solutions', 'Conclusions'];

export default function LayerNav({ current, onChange, activeSolutions }) {
  const active = activeSolutions.filter(v => v > 0).length;
  const avgPct = Math.round(activeSolutions.reduce((a, b) => a + b, 0) / 3);

  return (
    <nav className="layer-nav">
      <span className="nav-brand">Cast Away</span>

      <div className="nav-layers">
        {LAYER_LABELS.map((label, i) => {
          const id = i + 1;
          return (
            <button
              key={id}
              className={`nav-layer-btn${current === id ? ' active' : ''}`}
              onClick={() => onChange(id)}
            >
              <span className="nav-layer-num">{id}</span>
              <span className="nav-layer-label">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-meta">
        {current === 3 && (
          <span className={`solve-counter${active === 3 && avgPct === 100 ? ' complete' : ''}`}>
            {active}/3 active · avg {avgPct}%
          </span>
        )}
        {current !== 3 && (
          <span className="nav-hint">Click nodes to explore</span>
        )}
      </div>
    </nav>
  );
}
