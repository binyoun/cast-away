import React, { useState } from "react";
import { NODES, LAYERS, getConnections } from "../data/ecosystem.js";

// ---- Concept note (replaces distracting watermark) ----
function ConceptNote() {
  return (
    <div className="concept-note" aria-label="Cast Away concept">
      <span className="concept-anchor">⚓</span>
      <span className="concept-text">
        Two islands. One gap. Three interventions.<br />
        <em>Can Linh bridge Academic and Industry worlds?</em>
      </span>
    </div>
  );
}

// ---- Sailing ship (layer 2 only) ----
function Ship({ progress }) {
  // sails from near academic shore (~32%) to near industry shore (~67%)
  const shipX    = 32 + progress * 35;
  const arrived  = progress >= 0.88;
  const wakeEnd  = Math.max(32, shipX - 2.5);

  return (
    <div className="ship-container" aria-hidden="true">
      {/* Wake trail — SVG overlay */}
      <svg className="ship-wake-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path
          d={`M 32 5 Q ${(32 + wakeEnd) / 2} 3.5 ${wakeEnd} 5`}
          stroke="rgba(255,255,255,.18)" strokeWidth=".7"
          fill="none" strokeDasharray="1.4 2.2"
          style={{ transition: 'd .5s ease' }}
        />
      </svg>
      {/* Ship */}
      <div
        className={`ship-wrap${arrived ? ' ship-arrived' : ''}`}
        style={{ left: `${shipX}%` }}
      >
        <svg viewBox="0 0 50 34" className="ship-svg">
          {/* Reflection */}
          <ellipse cx="25" cy="30" rx="16" ry="3" fill="rgba(255,255,255,.07)"/>
          {/* Hull */}
          <path d="M7 17 L43 17 L39 26 L11 26 Z" fill="var(--amber)" opacity=".9"/>
          <path d="M11 21 L39 21 L37 26 L13 26 Z" fill="var(--amber-dark)" opacity=".25"/>
          {/* Mast */}
          <line x1="25" y1="4" x2="25" y2="17" stroke="rgba(255,255,255,.7)" strokeWidth="1.3"/>
          {/* Main sail */}
          <path d="M25 5 L39 14 L25 16.5 Z" fill="rgba(255,255,255,.78)"/>
          {/* Forward sail */}
          <path d="M25 5 L13 14 L25 16.5 Z" fill="rgba(255,255,255,.5)"/>
          {/* Flag */}
          <path d="M25 4 L32 6.5 L25 9 Z" fill="var(--amber)"/>
        </svg>
      </div>
    </div>
  );
}

// ---- Map background zones ----
function MapBackground({ layer, avgIntensity }) {
  const showShip   = layer === 2;
  const bridgeVis  = layer === 2 && avgIntensity >= 58;

  return (
    <div className="map-bg" aria-hidden="true">
      {/* Academic Island */}
      <div className="zone zone-academic">
        <div className="island-icon island-icon-academic">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20 L12 4 L20 20 Z" stroke="rgba(184,146,90,.6)" strokeWidth="1.5" fill="rgba(184,146,90,.12)"/>
            <path d="M7 15 L17 15" stroke="rgba(184,146,90,.4)" strokeWidth="1"/>
          </svg>
        </div>
        <span className="zone-label">Academic<br />Island</span>
        <span className="zone-sublabel">Linh lives here</span>
      </div>

      {/* Ocean gap */}
      <div className="zone zone-gap">
        <ConceptNote />

        {/* Ship sailing across */}
        {showShip && <Ship progress={avgIntensity / 100} />}

        {/* Bridge emerging when solutions accumulate */}
        {bridgeVis && (
          <div
            className="bridge-emerging"
            style={{ opacity: Math.min(1, (avgIntensity - 58) / 32) }}
          >
            <div className="bridge-glow" />
            <span className="bridge-emerging-label">Employability 5.0</span>
            <span className="bridge-emerging-quote">
              "Understood. If we use AI to quickly re-render,<br />
              I can have mockups by end of day."
            </span>
          </div>
        )}

        <span className="zone-gap-label">The IPL Gap</span>
      </div>

      {/* Industry Island */}
      <div className="zone zone-industry">
        <div className="island-icon island-icon-industry">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="5" y="8" width="14" height="12" stroke="rgba(90,136,112,.6)" strokeWidth="1.5" fill="rgba(90,136,112,.12)"/>
            <path d="M3 8 L12 3 L21 8" stroke="rgba(90,136,112,.5)" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <span className="zone-label">Industry<br />Island</span>
        <span className="zone-sublabel">Khoa works here</span>
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
        <circle cx="30" cy="30" r="27" fill="rgba(46,95,120,.75)" stroke="rgba(255,255,255,.3)" strokeWidth="1.2"/>
        {[0,45,90,135,180,225,270,315].map(deg => {
          const rad = (deg - 90) * Math.PI / 180;
          const r1 = 23, r2 = deg % 90 === 0 ? 18.5 : 20.5;
          return (
            <line key={deg}
              x1={30 + r1 * Math.cos(rad)} y1={30 + r1 * Math.sin(rad)}
              x2={30 + r2 * Math.cos(rad)} y2={30 + r2 * Math.sin(rad)}
              stroke="rgba(255,255,255,.3)" strokeWidth={deg % 90 === 0 ? 1.5 : .9}
            />
          );
        })}
        {/* North — amber */}
        <path d="M30 8 L33.5 28 L30 25 L26.5 28 Z" fill="var(--amber)" opacity=".95"/>
        {/* S / E / W */}
        <path d="M30 52 L33.5 32 L30 35 L26.5 32 Z" fill="rgba(255,255,255,.38)"/>
        <path d="M52 30 L32 33.5 L35 30 L32 26.5 Z" fill="rgba(255,255,255,.38)"/>
        <path d="M8 30 L28 33.5 L25 30 L28 26.5 Z"  fill="rgba(255,255,255,.38)"/>
        <circle cx="30" cy="30" r="4"   fill="var(--ocean-deep)"/>
        <circle cx="30" cy="30" r="2.2" fill="var(--amber)"/>
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
      <div className="legend-item"><span className="legend-shape legend-circle"/><span>Character</span></div>
      <div className="legend-item"><span className="legend-shape legend-rect"  /><span>System</span></div>
      {layer === 1 && (
        <div className="legend-item"><span className="legend-shape legend-hex"    /><span>Tension</span></div>
      )}
      {layer === 2 && (
        <div className="legend-item"><span className="legend-shape legend-diamond"/><span>Intervention</span></div>
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

  return (
    <div
      className={`node node-${def.shape}${isActive ? ' node-active' : ''}${isSolution && intensity > 0 ? ' node-on' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={e => { e.stopPropagation(); onNodeClick(nodeId); }}
      role="button" tabIndex={0}
    >
      <div className={`node-body color-${def.color}`} style={{ ...bodyStyle, ...glowStyle }}>
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
            type="range" className="intensity-slider"
            min="0" max="100" step="1" value={intensity}
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
  const info       = def.info;
  const isSolution = def.type === 'solution';
  const solveIdx   = isSolution ? def.solveIndex : -1;
  const intensity  = isSolution ? activeSolutions[solveIdx] : 0;

  return (
    <aside className="info-panel" style={style} onClick={e => e.stopPropagation()}>
      <button className="info-close" onClick={onClose}>×</button>
      <span className={`info-type-tag type-${def.color}`}>{info.type}</span>
      <h3 className="info-title">{info.title}</h3>
      {info.role    && <p className="info-role">{info.role}</p>}
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
            type="range" className="intensity-slider intensity-slider-lg"
            min="0" max="100" step="1" value={intensity}
            onChange={e => onSetIntensity(solveIdx, Number(e.target.value))}
            style={{ '--pct': `${intensity}%` }}
          />
          <div className="info-intensity-labels">
            <span>Not applied</span><span>Fully applied</span>
          </div>
        </div>
      )}
    </aside>
  );
}

// ---- Final outcome panel (slides up when bridge is complete) ----
function FinalOutcome({ activeSolutions, visible }) {
  const pct = Math.round(activeSolutions.reduce((a, b) => a + b, 0) / 3);
  const items = [
    { label: 'AI Prototyping Sprint',  idx: 0 },
    { label: 'Shared Critique Boards', idx: 1 },
    { label: 'M-NODE Hackathon',       idx: 2 },
  ];
  return (
    <div className={`final-outcome${visible ? ' final-visible' : ''}`} aria-live="polite">
      <div className="final-inner">
        <div className="final-left">
          <span className="final-badge">⚓ Employability 5.0</span>
          <h2 className="final-title">Bridge&nbsp;Complete</h2>
          <p className="final-meta">{pct}% avg implementation — IPL gap bridged</p>
        </div>
        <blockquote className="final-quote">
          "Understood. If we use AI to quickly re-render, I can have mockups by end of day."
          <cite>— Linh, responding to Khoa's brief</cite>
        </blockquote>
        <div className="final-chips">
          {items.map(({ label, idx }) => (
            <div key={idx} className="final-chip">
              <span className="final-chip-check">✓</span>
              <span>{label}</span>
              <span className="final-chip-pct">{activeSolutions[idx]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Main canvas ----
export default function EcoCanvas({ layer, activeNode, onNodeClick, activeSolutions, onSetIntensity }) {
  const [showLegend, setShowLegend] = useState(false);

  const config = LAYERS[layer];
  const avg    = activeSolutions.reduce((a, b) => a + b, 0) / 3;
  const drift  = (avg / 100) * 10;
  const linhX  = layer === 2 ? 20 + drift : 20;
  const khoaX  = layer === 2 ? 80 - drift : 80;

  const allActive  = activeSolutions.filter(v => v > 0).length === 3;
  const isComplete = layer === 2 && allActive && avg >= 78;

  const connections = getConnections(layer, activeSolutions, linhX, khoaX);

  function handleCanvasClick() {
    if (activeNode) onNodeClick(activeNode);
    setShowLegend(false);
  }

  function posFor(id, base) {
    if (id === 'linh') return { ...base, x: linhX };
    if (id === 'khoa') return { ...base, x: khoaX };
    return base;
  }

  // Position-aware InfoPanel
  const activePos = activeNode
    ? posFor(activeNode, config.nodePositions.find(p => p.id === activeNode) || { x: 50, y: 50 })
    : null;
  const infoPanelStyle = activePos
    ? {
        top: '50%',
        transform: 'translateY(-50%)',
        ...(activePos.x < 52
          ? { left: `calc(${activePos.x}% + 58px)`, right: 'auto' }
          : { right: `calc(${100 - activePos.x}% + 58px)`, left: 'auto' })
      }
    : { right: '20px', top: '50%', transform: 'translateY(-50%)' };

  return (
    <div className="eco-canvas" onClick={handleCanvasClick}>
      <MapBackground layer={layer} avgIntensity={avg} />

      {/* SVG connections */}
      <svg className="canvas-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {connections.map((conn, i) => {
          const isIntensity = 'intensity' in conn;
          const t = isIntensity ? conn.intensity / 100 : 1;
          const d = `M ${conn.from.x} ${conn.from.y} Q ${conn.cp.x} ${conn.cp.y} ${conn.to.x} ${conn.to.y}`;
          if (isIntensity) {
            return (
              <path key={i} d={d} fill="none"
                stroke={t > 0.04 ? 'var(--resolve-mid)' : 'rgba(255,255,255,.15)'}
                strokeOpacity={0.1 + t * 0.75}
                strokeWidth={0.4 + t * 1.8}
                strokeDasharray={t < 0.35 ? '2 3' : undefined}
                style={{ transition: 'stroke-opacity .12s ease, stroke-width .12s ease, stroke .2s ease' }}
              />
            );
          }
          return (
            <path key={i} d={d} fill="none"
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
              x={resolved.x} y={resolved.y}
              layer={layer}
              activeSolutions={activeSolutions}
              activeNode={activeNode}
              onNodeClick={onNodeClick}
              onSetIntensity={onSetIntensity}
            />
          );
        })}
      </div>

      {/* Compass + legend */}
      <Compass onClick={e => { e?.stopPropagation(); setShowLegend(s => !s); }} />
      <MapLegend layer={layer} visible={showLegend} />

      {/* Resolution panel — bottom of canvas */}
      <FinalOutcome activeSolutions={activeSolutions} visible={isComplete} />

      {/* Info panel */}
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
