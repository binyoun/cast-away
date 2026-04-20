import React from "react";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="page-wrap">
        <p className="eyebrow rv">Agency Pitch — IPL Research Artefact</p>
        <h1 className="rv">
          Cast<br /><em>Away.</em>
        </h1>
        <p className="intro rv">
          A graduating design student. A creative director under pressure.
          A system that trained them for completely different worlds.
          This is what happens when that gap becomes visible — and what it takes to bridge it.
        </p>
        <div className="scroll-cta rv">
          <span>Scroll to begin</span>
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 3v12M3.5 9.5 9 15l5.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
