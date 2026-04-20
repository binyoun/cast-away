import React from "react";

export default function TransformPanel({ solved, transform }) {
  if (!transform) return null;

  return (
    <div className={`transform-panel${solved ? " open" : ""}`}>
      <div className="transform-inner">
        <div className="intervention-label">Intervention unlocked</div>
        <h3>{transform.name}</h3>
        <p className="linh-change">{transform.linh_change}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <div className="chip-row-label">Before</div>
            <div className="chip-row">
              {transform.before.map((chip, i) => (
                <span key={i} className="chip before">{chip}</span>
              ))}
            </div>
          </div>
          <div style={{ color: "var(--ink20)", fontSize: ".9rem", paddingLeft: "2px" }}>↓</div>
          <div>
            <div className="chip-row-label">After</div>
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
