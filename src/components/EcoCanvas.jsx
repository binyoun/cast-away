import React, { useState } from "react";
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

// ---- Compass rose ----
function Compass({ onClick }) {
  return (
    <div
      className="compass-wrap"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Toggle map legend"
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <svg viewBox="0 0 60 60" className="compass-svg" aria-hidden="true">
        {/* Outer ring */}
        <circle cx="30" cy="30" r="27" fill="rgba(46,95,120,.72)" stroke="rgba(255,255,255,.28)" strokeWidth="1.2"/>
        {/* Degree ticks */}
        {[0,45,90,135,180,225,270,315].map(deg => {
          const rad = (deg - 90) * Math.PI / 180;
          const r1 = 22, r2 = deg % 90 === 0 ? 18 : 20;
          return (
            <line key={deg}
              x1={30 + r1 * Math.cos(rad)} y1={30 + r1 * Math.sin(rad)}
              x2={30 + r2 * Math.cos(rad)} y2={30 + r2 * Math.sin(rad)}
              stroke="rgba(255,255,255,.3)" strokeWidth={deg % 90 === 0 ? 1.5 : 1}
            />
          );
        })}
        {/* North arrow — amber */}
        <path d="M30 8 L33.5 28 L30 25 L26.5 28 Z" fill="var(--amber)" opacity=".95"/>
        {/* South arrow */}
        <path d="M30 52 L33.5 32 L30 35 L26.5 32 Z" fill="rgba(255,255,255,.38)"/>
        {/* East arrow */}
        <path d="M52 30 L32 33.5 L35 30 L32 26.5 Z" fill="rgba(255,255,255,.38)"/>
        {/* West arrow */}
        <path d="M8 30 L28 33.5 L25 30 L28 26.5 Z" fill="rgba(255,255,255,.38)"/>
        {/* Center circles */}
        <circle cx="30" cy="30" r="4"   fill="var(--ocean-deep)"/>
        <circle cx="30" cy="30" r="2.2" fill="var(--amber)"/>
        {/* N label */}
        <text x="30" y="5.5" textAnchor="middle" fontSize="5.5" fontWeight="bold"
          fill="var(--amber)" fontFamily="sans-serif" opacity=".9">N</text>
      </svg>
    </div>
  );
}

// ---- Map legend ----
function MapLegend({ layer, visible }) {
  return (
    <div className={`map-legend${visible ? ' legend-visible' : ''}`}>
      <span className="legend-title">Map Key</span>
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
    ? { boxShadow: `0 0 ${Math.round(t * 32)}px rgba(58,122,86,${(t * 0.6).toFixed(2)}), 0 4px 18px rgba(0,0,0,.35)` }
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
function InfoPanel({ nodeId, layer, activeSolutions, onSetIntensity, onClose, style }) {
  const def  = NODES[nodeId];
  if (!def)  return null;
  const info = def.info;
  const isSolution = def.type === 'solution';
  const solveIdx   = isSolution ? def.solveIndex : -1;
  const intensity  = isSolution ? activeSolutions[solveIdx] : 0;

  return (
    <aside className="info-panel" style={style} onClick={e => e.stopPropagation()}>
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
  const [showLegend, setShowLegend] = useState(false);

  const config = LAYERS[layer];
  const avg    = activeSolutions.reduce((a, b) => a + b, 0) / 3; // 0–100

  // Dynamic positions: Linh and Khoa drift toward center as avg intensity increases
  const drift  = (avg / 100) * 10;
  const linhX  = layer === 2 ? 20 + drift : 20;
  const khoaX  = layer === 2 ? 80 - drift : 80;

  const connections = getConnections(layer, activeSolutions, linhX, khoaX);

  function handleCanvasClick() {
    if (activeNode) onNodeClick(activeNode);
    setShowLegend(false);
  }

  // Resolve dynamic positions for Linh/Khoa
  function posFor(id, base) {
    if (id === 'linh') return { ...base, x: linhX };
    if (id === 'khoa') return { ...base, x: khoaX };
    return base;
  }

  // Position-aware InfoPanel: flip side based on node's x position
  const activePos = activeNode
    ? posFor(activeNode, config.nodePositions.find(p => p.id === activeNode) || { x: 50, y: 50 })
    : null;

  const infoPanelStyle = activePos
    ? {
        top: '50%',
        transform: 'translateY(-50%)',
        ...(activePos.x < 52
          ? { left: `calc(${activePos.x}% + 56px)`, right: 'auto' }
          : { right: `calc(${100 - activePos.x}% + 56px)`, left: 'auto' })
      }
    : { right: '20px', top: '50%', transform: 'translateY(-50%)' };

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
                stroke={t > 0.04 ? 'var(--resolve-mid)' : 'rgba(255,255,255,.15)'}
                strokeOpacity={0.1 + t * 0.75}
                strokeWidth={0.4 + t * 1.8}
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

      {/* Compass (bottom-right) + legend popup */}
      <Compass onClick={e => { e.stopPropagation?.(); setShowLegend(s => !s); }} />
      <MapLegend layer={layer} visible={showLegend} />

      {activeNode && (
        <InfoPanel
          key={activeNode}
          nodeId={activeNode}
          layer={layer}
          activeSolutions={activeSolutions}
          onSetIntensity={onSetIntensity}
          onClose={() => onNodeClick(activeNode)}
          style={infoPanelStyle}
        />
      )}
    </div>
  );
}
