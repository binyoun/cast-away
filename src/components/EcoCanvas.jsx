import React from "react";
import { NODES, LAYERS, getConnections } from "../data/ecosystem.js";

// ---- Intensity-driven node body style ----
function intensityStyle(intensity) {
  const t = intensity / 100;
  return {
    filter:     `grayscale(${Math.round((1 - t) * 100)}%)`,
    opacity:    0.3 + t * 0.7,
    boxShadow:  intensity > 50
      ? `0 0 ${Math.round(t * 24)}px rgba(58,122,86,${(t * 0.45).toFixed(2)})`
      : undefined,
  };
}

// ---- Node shape ----
function Node({ nodeId, x, y, layer, activeSolutions, activeNode, onNodeClick, onSetIntensity }) {
  const def        = NODES[nodeId];
  const isActive   = activeNode === nodeId;
  const isSolution = def.type === 'solution';
  const solveIdx   = isSolution ? def.solveIndex : -1;
  const intensity  = isSolution ? activeSolutions[solveIdx] : 0;

  const bodyClass  = isSolution ? 'color-resolve' : `color-${def.color}`;
  const bodyStyle  = isSolution ? intensityStyle(intensity) : {};

  function handleClick(e) {
    e.stopPropagation();
    onNodeClick(nodeId);
  }

  function handleSlider(e) {
    e.stopPropagation();
    onSetIntensity(solveIdx, Number(e.target.value));
  }

  return (
    <div
      className={`node node-${def.shape}${isActive ? ' node-active' : ''}${isSolution && intensity > 0 ? ' node-on' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={`node-body ${bodyClass}`} style={bodyStyle}>
        <span className="node-letter">{def.letter}</span>
      </div>

      <div className="node-meta">
        {def.label.split('\n').map((line, i) => (
          <span key={i} className="node-label-line">{line}</span>
        ))}
        <span className="node-sub">{def.sub}</span>
      </div>

      {/* Slider — only on solution nodes in layer 3 */}
      {isSolution && layer === 3 && (
        <div
          className="intensity-wrap"
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          <input
            type="range"
            className="intensity-slider"
            min="0" max="100" step="1"
            value={intensity}
            onChange={handleSlider}
            style={{ '--pct': `${intensity}%` }}
            aria-label={`${def.label} intensity`}
          />
          <span className="intensity-pct">{intensity}%</span>
        </div>
      )}
    </div>
  );
}

// ---- Gap label ----
function GapLabel() {
  return (
    <div className="gap-label" style={{ left: '50%', top: '60%' }}>
      <span className="gap-icon">↔</span>
      <span>IPL Gap</span>
    </div>
  );
}

// ---- Resolution quote ----
function ResolutionQuote() {
  return (
    <div className="resolution-quote-overlay">
      <p>"Understood. If we use AI to quickly re-render, I can have mockups in both formats by end of day."</p>
      <span className="rq-attr">— Linh, post-intervention</span>
    </div>
  );
}

// ---- Info panel ----
function InfoPanel({ nodeId, layer, activeSolutions, onSetIntensity, onClose }) {
  const def  = NODES[nodeId];
  if (!def)  return null;
  const info = def.info;

  const isSolution = def.type === 'solution';
  const solveIdx   = isSolution ? def.solveIndex : -1;
  const intensity  = isSolution ? activeSolutions[solveIdx] : 0;

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
      {info.conflict && <p className="info-conflict">{info.conflict}</p>}
      {info.quote    && <blockquote className="info-quote">"{info.quote}"</blockquote>}

      {/* Large slider in info panel for solutions */}
      {isSolution && layer === 3 && (
        <div className="info-intensity-block" onMouseDown={e => e.stopPropagation()}>
          <div className="info-intensity-header">
            <span>Implementation level</span>
            <span className="info-intensity-val">{intensity}%</span>
          </div>
          <input
            type="range"
            className="intensity-slider intensity-slider-lg"
            min="0" max="100" step="1"
            value={intensity}
            onChange={e => onSetIntensity(solveIdx, Number(e.target.value))}
            style={{ '--pct': `${intensity}%` }}
          />
          <div className="info-intensity-labels">
            <span>Not applied</span>
            <span>Fully applied</span>
          </div>
        </div>
      )}
    </aside>
  );
}

// ---- Connection SVG line ----
function ConnLine({ conn, layer }) {
  const x1 = `${conn.from.x}%`, y1 = `${conn.from.y}%`;
  const x2 = `${conn.to.x}%`,   y2 = `${conn.to.y}%`;

  // Layer 3: compute style from intensity
  if (layer === 3) {
    const t    = (conn.intensity ?? 0) / 100;
    const dash = t < 0.4 ? '8 8' : undefined;
    return (
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={t > 0.05 ? 'var(--resolve)' : 'var(--ink20)'}
        strokeOpacity={0.08 + t * 0.77}
        strokeWidth={1 + t * 2.5}
        strokeDasharray={dash}
        style={{ transition: 'stroke-opacity .15s ease, stroke-width .15s ease, stroke .2s ease' }}
      />
    );
  }

  // Other layers: CSS class-based
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={`conn conn-${conn.color}${conn.dash ? ' dashed' : ''}`}
      />
      {conn.label && (
        <text
          x={`${(conn.from.x + conn.to.x) / 2}%`}
          y={`${(conn.from.y + conn.to.y) / 2 - 2}%`}
          className="conn-label"
          textAnchor="middle"
        >
          {conn.label}
        </text>
      )}
    </g>
  );
}

// ---- Main canvas ----
export default function EcoCanvas({ layer, activeNode, onNodeClick, activeSolutions, onSetIntensity }) {
  const config      = LAYERS[layer];
  const connections = getConnections(layer, activeSolutions);

  function handleCanvasClick() {
    if (activeNode) onNodeClick(activeNode);
  }

  return (
    <div className="eco-canvas" onClick={handleCanvasClick}>
      <svg className="canvas-svg" aria-hidden="true">
        {connections.map((conn, i) => (
          <ConnLine key={i} conn={conn} layer={layer} />
        ))}
      </svg>

      <div className="canvas-header" key={`header-${layer}`}>
        <span className="canvas-layer-badge">Layer {layer}</span>
        <span className="canvas-subtitle">{config.subtitle}</span>
      </div>

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
            onNodeClick={onNodeClick}
            onSetIntensity={onSetIntensity}
          />
        ))}
      </div>

      {layer === 1 && <GapLabel />}
      {layer === 4 && <ResolutionQuote />}

      {activeNode && (
        <InfoPanel
          key={activeNode}
          nodeId={activeNode}
          layer={layer}
          activeSolutions={activeSolutions}
          onSetIntensity={onSetIntensity}
          onClose={() => onNodeClick(activeNode)}
        />
      )}
    </div>
  );
}
