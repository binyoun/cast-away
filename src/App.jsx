import React, { useState } from "react";
import LayerNav from "./components/LayerNav.jsx";
import EcoCanvas from "./components/EcoCanvas.jsx";

export default function App() {
  const [layer, setLayer]                   = useState(1);
  const [activeNode, setActiveNode]         = useState(null);
  const [activeSolutions, setActiveSolutions] = useState([0, 0, 0]); // 0–100 intensity

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
    </div>
  );
}
