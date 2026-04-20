import React from "react";

export default function NavBar({ scene, total, canAdvance, onAdvance, onBack, isTension, sceneSolved }) {
  const isLast = scene >= total - 1;

  return (
    <nav className="nav-bar">
      <button
        className="nav-back"
        onClick={onBack}
        disabled={scene === 0}
        aria-label="Previous scene"
      >
        ←
      </button>

      <div className="nav-dots">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`nav-dot${i === scene ? " current" : ""}${i < scene ? " done" : ""}`}
          />
        ))}
      </div>

      {isLast ? (
        <span className="nav-hint">— End —</span>
      ) : isTension && !sceneSolved ? (
        <span className="nav-hint nav-hint-waiting">Make your choice ↑</span>
      ) : (
        <button className="nav-continue" onClick={onAdvance} disabled={!canAdvance}>
          Continue <span className="nav-arrow">→</span>
        </button>
      )}
    </nav>
  );
}
