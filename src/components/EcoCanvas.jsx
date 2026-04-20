import React from "react";
import { NODES, LAYERS, getConnections } from "../data/ecosystem.js";

// ---- Node shape component ----
function Node({ nodeId, x, y, layer, activeSolutions, activeNode, onNodeClick }) {
  const def = NODES[nodeId];
  const isActive  = activeNode === nodeId;
  const isSolution = def.type === 'solution';
  const solveIdx  = isSolution ? def.solveIndex : -1;
  const isOn      = isSolution && activeSolutions[solveIdx];

  const colorClass = isSolution && !isOn ? 'inactive' : def.color;

  function handleClick(e) {
    e.stopPropagation();
    if (isSolution && layer === 3) {
      onNodeClick(nodeId, true); // toggle + select
    } else {
      onNodeClick(nodeId, false);
    }
  }

  return (
    <div
      className={`node node-${def.shape}${isActive ? ' node-active' : ''}${isOn ? ' node-on' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSolution ? isOn : undefined}
    >
      <div className={`node-body color-${colorClass}`}>
        <span className="node-letter">{def.letter}</span>
      </div>
      <div className="node-meta">
        {def.label.split('\n').map((line, i) => (
          <span key={i} className="node-label-line">{line}</span>
        ))}
        <span className="node-sub">{def.sub}</span>
      </div>
      {isSolution && (
        <span className={`solution-state${isOn ? ' on' : ''}`}>
          {isOn ? 'Active' : 'Click to activate'}
        </span>
      )}
    </div>
  );
}

// ---- Gap label for layer 1 ----
function GapLabel() {
  return (
    <div className="gap-label" style={{ left: '50%', top: '60%' }}>
      <span className="gap-icon">↔</span>
      <span>IPL Gap</span>
    </div>
  );
}

// ---- Layer 4 quote ----
function ResolutionQuote() {
  return (
    <div className="resolution-quote-overlay">
      <p>
        "Understood. If we use AI to quickly re-render, I can have mockups in both formats by end of day."
      </p>
      <span className="rq-attr">— Linh, post-intervention</span>
    </div>
  );
}

// ---- Info panel ----
function InfoPanel({ nodeId, layer, activeSolutions, onClose }) {
  const def = NODES[nodeId];
  if (!def) return null;
  const info = def.info;

  const isSolution = def.type === 'solution';
  const solveIdx   = isSolution ? def.solveIndex : -1;
  const isOn       = isSolution && activeSolutions[solveIdx];

  return (
    <aside className="info-panel" onClick={e => e.stopPropagation()}>
      <button className="info-close" onClick={onClose} aria-label="Close">×</button>
      <span className={`info-type-tag type-${def.color}`}>{info.type}</span>
      <h3 className="info-title">{info.title}</h3>
      {info.role && <p className="info-role">{info.role}</p>}

      {info.attrs && info.attrs.length > 0 && (
        <ul className="info-attrs">
          {info.attrs.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      )}

      {info.conflict && (
        <p className="info-conflict">{info.conflict}</p>
      )}

      {info.quote && (
        <blockquote className="info-quote">"{info.quote}"</blockquote>
      )}

      {isSolution && (
        <button
          className={`info-toggle-btn${isOn ? ' active' : ''}`}
          onClick={() => {/* parent handles toggle via node click */}}
        >
          {isOn ? '✓ Activated' : 'Click node to activate'}
        </button>
      )}
    </aside>
  );
}

// ---- Main canvas ----
export default function EcoCanvas({ layer, activeNode, onNodeClick, activeSolutions, onToggleSolution }) {
  const config      = LAYERS[layer];
  const connections = getConnections(layer, activeSolutions);

  function handleNodeClick(id, isSolutionToggle) {
    if (isSolutionToggle) {
      const def = NODES[id];
      if (def && def.type === 'solution') {
        onToggleSolution(def.solveIndex);
      }
    }
    onNodeClick(id);
  }

  function handleCanvasClick() {
    if (activeNode) onNodeClick(activeNode); // deselect
  }

  return (
    <div className="eco-canvas" onClick={handleCanvasClick}>
      {/* Dot grid background — painted via CSS */}

      {/* SVG connection layer */}
      <svg className="canvas-svg" aria-hidden="true">
        {connections.map((conn, i) => {
          const x1 = `${conn.from.x}%`, y1 = `${conn.from.y}%`;
          const x2 = `${conn.to.x}%`,   y2 = `${conn.to.y}%`;
          const mx = (conn.from.x + conn.to.x) / 2;
          const my = (conn.from.y + conn.to.y) / 2;

          return (
            <g key={i}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                className={`conn conn-${conn.color}${conn.dash ? ' dashed' : ''}`}
              />
              {conn.label && (
                <text
                  x={`${mx}%`} y={`${my - 2}%`}
                  className="conn-label"
                  textAnchor="middle"
                >
                  {conn.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Layer subtitle */}
      <div className="canvas-header" key={`header-${layer}`}>
        <span className="canvas-layer-badge">Layer {layer}</span>
        <span className="canvas-subtitle">{config.subtitle}</span>
      </div>

      {/* Nodes */}
      <div key={`nodes-${layer}`} className="nodes-layer">
        {config.nodePositions.map(pos => (
          <Node
            key={pos.id}
            nodeId={pos.id}
            x={pos.x}
            y={pos.y}
            layer={layer}
            activeSolutions={activeSolutions}
            activeNode={activeNode}
            onNodeClick={handleNodeClick}
          />
        ))}
      </div>

      {/* Layer-specific overlays */}
      {layer === 1 && <GapLabel />}
      {layer === 4 && <ResolutionQuote />}

      {/* Info panel */}
      {activeNode && (
        <InfoPanel
          key={activeNode}
          nodeId={activeNode}
          layer={layer}
          activeSolutions={activeSolutions}
          onClose={() => onNodeClick(activeNode)}
        />
      )}
    </div>
  );
}
