import React from "react";
import { resolution, characters } from "../data/scenario.js";

export default function ResolutionSection({ allSolved }) {
  return (
    <section className={`resolution-section${allSolved ? " unlocked" : ""}`}>
      <div className="page-wrap">
        <div className="resolution-card rv">
          <div className="unlock-tag">
            {allSolved ? "All three interventions applied" : "Resolve all tensions to unlock"}
          </div>

          <p className="linh-final-quote">
            "{resolution.linh_quote}"
          </p>

          <p className="resolution-description">
            {resolution.description}
          </p>

          <div className="profile-bridge rv">
            <div className="bridge-card">
              <div className="b-name" style={{ color: "var(--amber-mid)" }}>Linh</div>
              <div className="b-role">{characters.linh.role}</div>
            </div>
            <div className="bridge-line" />
            <div className="bridge-card">
              <div className="b-name">{resolution.label}</div>
              <span className="resolution-tag">Bridged</span>
            </div>
            <div className="bridge-line" />
            <div className="bridge-card">
              <div className="b-name" style={{ color: "var(--slate-mid)" }}>Khoa</div>
              <div className="b-role">{characters.khoa.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
