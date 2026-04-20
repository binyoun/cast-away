import React from "react";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="page-wrap">
        <p className="eyebrow rv">Agency Pitch Scenario — IPL Research Artefact</p>
        <h1 className="rv">Cast Away.</h1>
        <p className="intro rv">
          A graduating design student. A creative director under pressure. A system that trained them for different worlds.
          This is what happens when the gap between education and industry becomes visible — and what it takes to bridge it.
        </p>
        <div className="scroll-cta rv">
          <span>Scroll to navigate</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 3v10M3 9l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
