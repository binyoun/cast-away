import React from "react";
import { NODES, LAYERS, getConnections } from "../data/ecosystem.js";

// ---- Map background zones ----
function MapBackground({ layer, avgIntensity }) {
  return (
    <div className="map-bg" aria-hidden="true">
      <div className="zone zone-academic">
        <span className="zone-label">Academic<br />Territory</span>
      </div>
      <div className="zone zone-gap">
        <span className="zone-watermark">CAST AWAY</span>
        <span className="zone-gap-label">The IPL Gap</span>
        {layer === 2 && avgIntensity >= 60 && (
          <div
            className="bridge-emerging"
            style={{ opacity: Math.min(1, (avgIntensity - 60) / 35) }}
          >
            <div className="bridge-glow" />
            <span className="bridge-emerging-label">Employability 5.0</span>
            <span className="bridge-emerging-quote">
              "Understood. If we use AI to quickly re-render,<br />
              I can have mockups by end of day."
            </span>
          </div>
        )}
      </div>
      <div className="zone zone-industry">
        <span className="zone-label">Industry<br />Territory</span>
      </div>
    </div>
  );
}

// ---- Map legend ----
function MapLegend({ layer }) {
  return (
    <div className="map-legend">
      <div className="legend-item">
        <span className="legend-shape legend-circle" />
        <span>Character</span>
      </div>
      <div className="legend-item">
        <span className="legend-shape legend-rect" />
        <span>System</span>
      </div>
      {layer === 1 && (
        <div className="legend-item">
          <span className="legend-shape legend-hex" />
          <span>Tension</span>
        </div>
      )}
      {layer === 2 && (
        <div className="legend-item">
          <span className="legend-shape legend-diamond" />
          <span>Intervention</span>
        </div>
      )}
    </div>
  );
}

// ---- Node ----
function Node({ nodeId, x, y, layer, activeSolutions, activeNode, onNodeClick, onSetIntensity }) {
  const def        = NODES[nodeId];
  const isActive   = activeNode === nodeId;
  const isSolution = def.type === 'solution';
  const solveIdx   = isSolution ? def.solveIndex : -1;
  const intensity  = isSolution ? activeSolutions[solveIdx] : 0;
  const t          = intensity / 100;

  const bodyStyle = isSolution
    ? { filter: `grayscale(${Math.round((1 - t) * 90)}%)`, opacity: 0.3 + t * 0.7 }
    : {};

  const glowStyle = isSolution && intensity > 40
    ? { boxShadow: `0 0 ${Math.round(t * 28)}px rgba(58,122,86,${(t * 0.5).toFixed(2)})` }
    : {};

  function handleClick(e) {
    e.stopPropagation();
    onNodeClick(nodeId);
  }

  return (
    <div
      className={`node node-${def.shape}${isActive ? ' node-active' : ''}${isSolution && intensity > 0 ? ' node-on' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div
        className={`node-body color-${def.color}`}
        style={{ ...bodyStyle, ...glowStyle }}
      >
        <span className="node-letter">{def.letter}</span>
      </div>

      <div className="node-meta">
        {def.label.split('\n').map((line, i) => (
          <span key={i} className="node-label-line">{line}</span>
        ))}
        <span className="node-sub">{def.sub}</span>
      </div>

      {isSolution && layer === 2 && (
        <div
          className="intensity-wrap"
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
          onPointerDown={e => e.stopPropagation()}
        >
          <input
            type="range"
            className="intensity-slider"
            min="0" max="100" step="1"
            value={intensity}
            onChange={e => onSetIntensity(solveIdx, Number(e.target.value))}
            style={{ '--pct': `${intensity}%` }}
            aria-label={`${def.label.replace('\n', ' ')} intensity`}
          />
          <span className="intensity-pct">{intensity}%</span>
        </div>
      )}
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
      <button className="info-close" onClick={onClose}>×</button>
      <span className={`info-type-tag type-${def.color}`}>{info.type}</span>
      <h3 className="info-title">{info.title}</h3>
      {info.role   && <p className="info-role">{info.role}</p>}
      {info.conflict && <p className="info-conflict">{info.conflict}</p>}
      {info.attrs?.length > 0 && (
        <ul className="info-attrs">
          {info.attrs.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      )}
      {info.quote && <blockquote className="info-quote">"{info.quote}"</blockquote>}

      {isSolution && layer === 2 && (
        <div
          className="info-intensity-block"
          onMouseDown={e => e.stopPropagation()}
          onPointerDown={e => e.stopPropagation()}
        >
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

// ---- Main canvas ----
export default function EcoCanvas({ layer, activeNode, onNodeClick, activeSolutions, onSetIntensity }) {
  const config = LAYERS[layer];
  const avg    = activeSolutions.reduce((a, b) => a + b, 0) / 3; // 0–100

  // Dynamic positions: Linh and Khoa drift toward center as avg intensity increases
  const drift  = (avg / 100) * 10;
  const linhX  = layer === 2 ? 20 + drift : 20;
  const khoaX  = layer === 2 ? 80 - drift : 80;

  const connections = getConnections(layer, activeSolutions, linhX, khoaX);

  function handleCanvasClick() {
    if (activeNode) onNodeClick(activeNode);
  }

  // Resolve dynamic positions for Linh/Khoa
  function posFor(id, base) {
    if (id === 'linh') return { ...base, x: linhX };
    if (id === 'khoa') return { ...base, x: khoaX };
    return base;
  }

  return (
    <div className="eco-canvas" onClick={handleCanvasClick}>
      <MapBackground layer={layer} avgIntensity={avg} />

      {/* Curved SVG paths — viewBox 0 0 100 100 preserveAspectRatio=none */}
      <svg
        className="canvas-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {connections.map((conn, i) => {
          const isIntensity = 'intensity' in conn;
          const t = isIntensity ? (conn.intensity / 100) : 1;
          const d = `M ${conn.from.x} ${conn.from.y} Q ${conn.cp.x} ${conn.cp.y} ${conn.to.x} ${conn.to.y}`;

          if (isIntensity) {
            const dashArr = t < 0.35 ? '2 3' : undefined;
            return (
              <path
                key={i} d={d} fill="none"
                stroke={t > 0.04 ? 'var(--resolve)' : 'var(--ink20)'}
                strokeOpacity={0.07 + t * 0.78}
                strokeWidth={0.4 + t * 1.6}
                strokeDasharray={dashArr}
                style={{ transition: 'stroke-opacity .12s ease, stroke-width .12s ease, stroke .2s ease' }}
              />
            );
          }

          return (
            <path
              key={i} d={d} fill="none"
              className={`conn conn-${conn.color}${conn.dash ? ' dashed' : ''}`}
            />
          );
        })}
      </svg>

      {/* Canvas header */}
      <div className="canvas-header" key={`hdr-${layer}`}>
        <span className="canvas-layer-badge">
          {layer === 1 ? '1 — The Gap' : '2 — The Bridge'}
        </span>
        <span className="canvas-subtitle">{config.sub}</span>
      </div>

      {/* Nodes */}
      <div key={`nl-${layer}`} className="nodes-layer">
        {config.nodePositions.map(pos => {
          const resolved = posFor(pos.id, pos);
          return (
            <Node
              key={pos.id}
              nodeId={pos.id}
              x={resolved.x}
              y={resolved.y}
              layer={layer}
              activeSolutions={activeSolutions}
              activeNode={activeNode}
              onNodeClick={onNodeClick}
              onSetIntensity={onSetIntensity}
            />
          );
        })}
      </div>

      <MapLegend layer={layer} />

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
