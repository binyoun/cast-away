import React from "react";
import { characters } from "../data/scenario.js";

function ProfileCard({ char }) {
  return (
    <div className={`profile-card ${char.side} rv`}>
      <div className="profile-card-header">
        <span className="side-tag">
          {char.side === "academic" ? "Student" : "Industry"}
        </span>
        <div className="name">{char.name}</div>
        <div className="role">{char.role}</div>
      </div>
      <div className="profile-card-body">
        <ul className="attribute-list">
          {char.attributes.map((attr, i) => (
            <li key={i}>
              <span className="attr-dot" />
              {attr}
            </li>
          ))}
        </ul>
        <blockquote>"{char.quote}"</blockquote>
      </div>
    </div>
  );
}

export default function ProfileSplit() {
  return (
    <section>
      <div className="page-wrap">
        <div className="section-intro rv">
          <p className="eyebrow">The Characters — Layer 1</p>
          <h2>Two worlds.<br />One pitch room.</h2>
          <p>
            Linh and Khoa are both talented, both well-intentioned,
            and almost completely unprepared for each other.
          </p>
        </div>
        <div className="split-2">
          <ProfileCard char={characters.linh} />
          <ProfileCard char={characters.khoa} />
        </div>
      </div>
    </section>
  );
}
