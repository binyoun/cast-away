import React, { useState } from "react";

export default function TensionScene({ data, index, solved, onSolve }) {
  const [failActive, setFailActive] = useState(false);

  function handleA() {
    if (solved || failActive) return;
    setFailActive(true);
    setTimeout(() => setFailActive(false), 2200);
  }

  function handleB() {
    if (solved) return;
    onSolve();
  }

  return (
    <div className="scene scene-tension">
      {/* Top strip */}
      <div className="tension-top s1">
        <span className="tension-counter">Tension {index + 1} / 3</span>
        <h2 className="tension-theme">{data.theme}</h2>
      </div>

      {/* Middle: conflict + quote */}
      <div className="tension-middle">
        <p className="tension-conflict s2">{data.conflict}</p>
        <div className="tension-quote s3">
          <span className="tension-quote-who">Khoa</span>
          <blockquote>"{data.khoa_quote}"</blockquote>
        </div>
      </div>

      {/* Bottom: choices OR intervention */}
      <div className="tension-bottom">
        {!solved ? (
          <div className="choices s4">
            <p className="choices-label">You are Linh's program coordinator. What do you do?</p>
            <div className="choice-grid">
              <button
                className={`choice-btn choice-a${failActive ? " fail" : ""}`}
                onClick={handleA}
              >
                <span className="choice-pill">Option A</span>
                <strong>{data.options.a.label}</strong>
                <span className="choice-outcome">{data.options.a.outcome}</span>
                {failActive && <span className="fail-msg">This stalls progress.</span>}
              </button>

              <button
                className="choice-btn choice-b"
                onClick={handleB}
              >
                <span className="choice-pill">Option B</span>
                <strong>{data.options.b.label}</strong>
                <span className="choice-outcome">{data.options.b.outcome}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="intervention-reveal s-reveal">
            <div className="intervention-header">
              <span className="intervention-tag">Intervention unlocked</span>
              <strong className="intervention-name">{data.options.b.transform.name}</strong>
            </div>
            <p className="intervention-change">{data.options.b.transform.linh_change}</p>
            <div className="chip-transition">
              <div className="chips-group">
                {data.options.b.transform.before.map((c, i) => (
                  <span key={i} className="chip chip-before">{c}</span>
                ))}
              </div>
              <span className="chips-arrow">→</span>
              <div className="chips-group">
                {data.options.b.transform.after.map((c, i) => (
                  <span key={i} className="chip chip-after">{c}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
