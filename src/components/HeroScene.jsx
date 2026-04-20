import React from "react";

export default function HeroScene() {
  return (
    <div className="scene scene-hero">
      <div className="hero-inner">
        <p className="scene-eyebrow s1">Agency Pitch Scenario — IPL Research</p>
        <h1 className="hero-title s2">
          Cast<br />
          <span className="hero-title-em">Away.</span>
        </h1>
        <div className="hero-rule s3" />
        <p className="hero-sub s4">
          A student and an industry professional who trained for entirely different worlds —
          and the interventions that finally let them speak the same language.
        </p>
        <p className="hero-cta s5">Press Space or → to begin</p>
      </div>
    </div>
  );
}
