import React from "react";
import { resolution, characters } from "../data/scenario.js";

export default function ResolutionSection({ allSolved }) {
  return (
    <section className={`resolution-section${allSolved ? " unlocked" : ""}`}>
      <div className="page-wrap">
        <div className="resolution-inner">
          <div className="unlock-label rv">
            {allSolved ? "All three interventions applied" : "Resolve all three tensions to unlock"}
          </div>

          <div className="linh-final-quote rv">
            "{resolution.linh_quote}"
          </div>

          <p className="resolution-description rv">
            {resolution.description}
          </p>

          <div className="profile-bridge rv">
            <div className="bridge-card">
              <div className="b-name" style={{ color: "var(--amber)" }}>Linh</div>
              <div className="b-role">{characters.linh.role}</div>
            </div>
            <div className="bridge-line" />
            <div className="bridge-card" style={{ textAlign: "center" }}>
              <div
                className="b-name"
                style={{ color: "var(--slate)", marginBottom: "4px" }}
              >
                {resolution.label}
              </div>
              <span className="resolution-tag">Bridged</span>
            </div>
            <div className="bridge-line" />
            <div className="bridge-card">
              <div className="b-name" style={{ color: "var(--slate)" }}>Khoa</div>
              <div className="b-role">{characters.khoa.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
