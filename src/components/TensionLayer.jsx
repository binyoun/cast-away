import React from "react";
import ChoiceCards from "./ChoiceCards.jsx";
import TransformPanel from "./TransformPanel.jsx";

export default function TensionLayer({ index, data, solved, onSolve }) {
  return (
    <section>
      <div className="page-wrap">
        <div className="tension-card rv" data-number={index + 1}>
          <div className="tension-eyebrow">
            <span className="tension-dot" />
            <span>Tension {index + 1} of 3</span>
          </div>
          <h2>{data.theme}</h2>
          <p className="conflict-text">{data.conflict}</p>

          <div className="khoa-quote">
            <div className="quote-who">Khoa says</div>
            <blockquote>"{data.khoa_quote}"</blockquote>
          </div>

          <ChoiceCards
            options={data.options}
            solved={solved}
            onSolve={onSolve}
          />

          <TransformPanel solved={solved} transform={data.options.b.transform} />
        </div>
      </div>
    </section>
  );
}
