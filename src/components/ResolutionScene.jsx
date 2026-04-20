import React from "react";
import { resolution, characters } from "../data/scenario.js";

export default function ResolutionScene({ solved }) {
  const count = solved.filter(Boolean).length;

  return (
    <div className="scene scene-resolution">
      <div className="resolution-inner">
        <p className="scene-eyebrow s1">
          {count === 3 ? "All three interventions applied" : `${count} of 3 tensions resolved`}
        </p>
        <h2 className="resolution-label s2">{resolution.label}</h2>
        <blockquote className="resolution-quote s3">
          "{resolution.linh_quote}"
        </blockquote>
        <p className="resolution-desc s4">{resolution.description}</p>

        <div className="bridge s5">
          <div className="bridge-node bridge-linh">
            <div className="bridge-name">Linh</div>
            <div className="bridge-role">Student</div>
          </div>
          <div className="bridge-line">
            <div className="bridge-fill" />
          </div>
          <div className="bridge-node bridge-center">
            <div className="bridge-name">Bridged</div>
          </div>
          <div className="bridge-line">
            <div className="bridge-fill" />
          </div>
          <div className="bridge-node bridge-khoa">
            <div className="bridge-name">Khoa</div>
            <div className="bridge-role">Industry</div>
          </div>
        </div>

        <p className="resolution-credit s6">
          Binh Nguyen · RMIT University Vietnam · rễ-root
        </p>
      </div>
    </div>
  );
}
