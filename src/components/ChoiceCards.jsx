import React, { useState } from "react";

export default function ChoiceCards({ options, solved, onSolve }) {
  const [failActive, setFailActive] = useState(false);

  function handleOptionA() {
    if (solved) return;
    setFailActive(true);
    setTimeout(() => setFailActive(false), 2000);
  }

  function handleOptionB() {
    if (solved) return;
    onSolve();
  }

  return (
    <div className={`choice-cards-wrap${solved ? " solved" : ""}`}>
      <p className="choice-intro">Choose a response</p>
      <div className="choice-cards">
        <button
          className={`choice-card option-a${failActive ? " fail" : ""}`}
          onClick={handleOptionA}
          disabled={solved}
        >
          <span className="option-pill">Option A</span>
          <div className="option-label">{options.a.label}</div>
          <div className="option-outcome">{options.a.outcome}</div>
          <div className="fail-message">This stalls progress.</div>
        </button>

        <button
          className={`choice-card option-b${solved ? " win" : ""}`}
          onClick={handleOptionB}
          disabled={solved}
        >
          <span className="option-pill">Option B</span>
          <div className="option-label">{options.b.label}</div>
          <div className="option-outcome">{options.b.outcome}</div>
        </button>
      </div>
    </div>
  );
}
