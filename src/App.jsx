import React, { useState } from "react";
import LayerNav from "./components/LayerNav.jsx";
import EcoCanvas from "./components/EcoCanvas.jsx";

export default function App() {
  const [layer, setLayer]                     = useState(1);
  const [activeNode, setActiveNode]           = useState(null);
  const [activeSolutions, setActiveSolutions] = useState([0, 0, 0]);

  function handleLayerChange(l) {
    setLayer(l);
    setActiveNode(null);
  }

  function handleNodeClick(id) {
    setActiveNode(prev => (prev === id ? null : id));
  }

  function handleSetIntensity(i, value) {
    setActiveSolutions(prev => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  return (
    <div className="app">
      <LayerNav
        current={layer}
        onChange={handleLayerChange}
        activeSolutions={activeSolutions}
      />
      <EcoCanvas
        layer={layer}
        activeNode={activeNode}
        onNodeClick={handleNodeClick}
        activeSolutions={activeSolutions}
        onSetIntensity={handleSetIntensity}
      />
      <footer className="app-footer">
        <span className="footer-course">TCHE2694 · Learning and Teaching in Industry Partnerships</span>
        <span className="footer-divider">|</span>
        <span className="footer-group">Graduate Certificate in Tertiary Learning &amp; Teaching · Group 1 · 2026 Semester 1</span>
      </footer>
    </div>
  );
}
