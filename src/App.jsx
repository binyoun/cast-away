import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./components/NavBar.jsx";
import HeroScene from "./components/HeroScene.jsx";
import CharactersScene from "./components/CharactersScene.jsx";
import TensionScene from "./components/TensionScene.jsx";
import ResolutionScene from "./components/ResolutionScene.jsx";
import { tensions } from "./data/scenario.js";

// Scene order: hero → characters → tension×3 → resolution
const TOTAL = 6;

export default function App() {
  const [scene, setScene] = useState(0);
  const [solved, setSolved] = useState([false, false, false]);
  const [dir, setDir] = useState(1);

  const tensionIndex = scene >= 2 && scene <= 4 ? scene - 2 : null;
  const isTensionScene = tensionIndex !== null;
  const sceneSolved = isTensionScene ? solved[tensionIndex] : false;

  const canAdvance = useCallback(() => {
    if (scene >= TOTAL - 1) return false;
    if (isTensionScene) return sceneSolved;
    return true;
  }, [scene, isTensionScene, sceneSolved]);

  const advance = useCallback(() => {
    if (!canAdvance()) return;
    setDir(1);
    setScene(s => s + 1);
  }, [canAdvance]);

  const goBack = useCallback(() => {
    if (scene === 0) return;
    setDir(-1);
    setScene(s => s - 1);
  }, [scene]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        advance();
      }
      if (e.key === "ArrowLeft") goBack();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, goBack]);

  function handleSolve(i) {
    setSolved(prev => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }

  const sceneKey = `scene-${scene}`;

  return (
    <div className="app">
      {scene === 0 && <HeroScene key={sceneKey} />}
      {scene === 1 && <CharactersScene key={sceneKey} />}
      {scene === 2 && (
        <TensionScene
          key={sceneKey}
          data={tensions[0]}
          index={0}
          solved={solved[0]}
          onSolve={() => handleSolve(0)}
        />
      )}
      {scene === 3 && (
        <TensionScene
          key={sceneKey}
          data={tensions[1]}
          index={1}
          solved={solved[1]}
          onSolve={() => handleSolve(1)}
        />
      )}
      {scene === 4 && (
        <TensionScene
          key={sceneKey}
          data={tensions[2]}
          index={2}
          solved={solved[2]}
          onSolve={() => handleSolve(2)}
        />
      )}
      {scene === 5 && (
        <ResolutionScene key={sceneKey} solved={solved} />
      )}

      <NavBar
        scene={scene}
        total={TOTAL}
        canAdvance={canAdvance()}
        onAdvance={advance}
        onBack={goBack}
        isTension={isTensionScene}
        sceneSolved={sceneSolved}
      />
    </div>
  );
}
