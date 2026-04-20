import React from "react";
import { characters } from "../data/scenario.js";

export default function CharactersScene() {
  return (
    <div className="scene scene-characters">
      <div className="char-panel char-linh s1">
        <span className="char-tag">Student</span>
        <div className="char-name">Linh</div>
        <div className="char-role">{characters.linh.role}</div>
        <ul className="char-attrs">
          {characters.linh.attributes.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
        <blockquote className="char-quote">"{characters.linh.quote}"</blockquote>
      </div>

      <div className="char-panel char-khoa s2">
        <span className="char-tag">Industry</span>
        <div className="char-name">Khoa</div>
        <div className="char-role">{characters.khoa.role}</div>
        <ul className="char-attrs">
          {characters.khoa.attributes.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
        <blockquote className="char-quote">"{characters.khoa.quote}"</blockquote>
      </div>
    </div>
  );
}
