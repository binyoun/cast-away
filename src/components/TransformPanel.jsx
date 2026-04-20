import React from "react";

export default function TransformPanel({ solved, transform }) {
  if (!transform) return null;

  return (
    <div className={`transform-panel${solved ? " open" : ""}`}>
      <div className="transform-inner">
        <span className="intervention-tag">Intervention unlocked</span>
        <h3>{transform.name}</h3>
        <p className="linh-change">{transform.linh_change}</p>
        <div className="chips-block">
          <div>
            <div className="chips-block-label">Before</div>
            <div className="chip-row">
              {transform.before.map((chip, i) => (
                <span key={i} className="chip before">{chip}</span>
              ))}
            </div>
          </div>
          <div className="chips-arrow">↓</div>
          <div>
            <div className="chips-block-label">After</div>
            <div className="chip-row">
              {transform.after.map((chip, i) => (
                <span key={i} className="chip after">{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
