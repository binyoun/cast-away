import React from "react";
import ChoiceCards from "./ChoiceCards.jsx";
import TransformPanel from "./TransformPanel.jsx";

export default function TensionLayer({ index, data, solved, onSolve }) {
  return (
    <section className="tension-section">
      <div className="page-wrap">
        <div className="section-label rv">
          <span className="dot" style={{ background: "var(--tension)" }} />
          <span className="label" style={{ color: "var(--tension)" }}>
            Layer {index + 2} — Tension {index + 1}
          </span>
        </div>
        <div className="tension-header">
          <div className="tension-index rv">Conflict {index + 1} / 3</div>
          <h2 className="rv">{data.theme}</h2>
          <p className="conflict-text rv">{data.conflict}</p>
        </div>

        <div className="khoa-quote rv">
          <div className="quote-attribution">Khoa says</div>
          <blockquote>"{data.khoa_quote}"</blockquote>
        </div>

        <ChoiceCards
          options={data.options}
          solved={solved}
          onSolve={onSolve}
        />

        <TransformPanel
          solved={solved}
          transform={data.options.b.transform}
        />
      </div>
    </section>
  );
}
