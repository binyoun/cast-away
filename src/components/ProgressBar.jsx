import React from "react";

export default function ProgressBar({ solved }) {
  // 4 segments: Hero, Layer1 (profiles), Layers 2-4 (tensions), Resolution
  const segments = [
    true,
    true,
    solved.some(Boolean),
    solved.every(Boolean),
  ];

  return (
    <div className="progress-bar" role="progressbar" aria-label="Page progress">
      {segments.map((active, i) => (
        <div key={i} className={`progress-segment${active ? " active" : ""}`} />
      ))}
    </div>
  );
}
