import React from "react";
import { characters } from "../data/scenario.js";

function ProfileCard({ char }) {
  return (
    <div className={`profile-card ${char.side} rv`}>
      <div className="card-header">
        <div>
          <div className="name">{char.name}</div>
          <div className="role">{char.role}</div>
        </div>
        <span className={`side-badge ${char.side}`}>
          {char.side === "academic" ? "Student" : "Industry"}
        </span>
      </div>
      <ul className="attribute-list">
        {char.attributes.map((attr, i) => (
          <li key={i}>{attr}</li>
        ))}
      </ul>
      <blockquote>"{char.quote}"</blockquote>
    </div>
  );
}

export default function ProfileSplit() {
  return (
    <section>
      <div className="page-wrap">
        <div className="section-label rv">
          <span className="dot" />
          <span className="label">The Characters — Layer 1</span>
        </div>
        <h2 className="rv" style={{ marginBottom: "8px" }}>Two worlds. One pitch room.</h2>
        <p className="rv" style={{ marginBottom: "36px", maxWidth: "560px" }}>
          Linh and Khoa are both talented, both well-intentioned, and almost completely unprepared for each other.
        </p>
        <div className="split-2">
          <ProfileCard char={characters.linh} />
          <ProfileCard char={characters.khoa} />
        </div>
      </div>
    </section>
  );
}
