import React, { useState } from "react";
import { NODES, LAYERS, getConnections } from "../data/ecosystem.js";

// ---- Concept note (content varies per layer) ----
const CONCEPT_CONTENT = {
  1: { icon: '⛈', text: <><strong>Three storms block the crossing.</strong><br /><em>Linh's beautiful ship is stuck near Star Island.</em></> },
  2: { icon: '⚓', text: <>Three interventions clear the path.<br /><em>Can Linh sail to Industry Hub?</em></> },
};

function ConceptNote({ layer }) {
  const { icon, text } = CONCEPT_CONTENT[layer] || CONCEPT_CONTENT[2];
  return (
    <div className="concept-note" aria-label="Layer context">
      <span className="concept-anchor">{icon}</span>
      <span className="concept-text">{text}</span>
    </div>
  );
}

// ---- Storm overlay (layer 3) ----
function StormOverlay() {
  return <div className="storm-overlay" aria-hidden="true" />;
}

// ---- Storm ripple animation ----
function StormRipple({ x, y, onEnd }) {
  return (
    <div className="storm-ripple"
      style={{ left: `${x}%`, top: `${y}%` }}
      onAnimationEnd={onEnd}
    />
  );
}

// ---- Sailing ship (both layers, stuck in layer 1) ----
function Ship({ progress, stuck }) {
  const shipX   = stuck ? 26 : 32 + progress * 35;
  const arrived = !stuck && progress >= 0.88;
  const wakeEnd = Math.max(32, shipX - 2.5);

  return (
    <div className="ship-container" aria-hidden="true">
      {!stuck && (
        <svg className="ship-wake-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path
            d={`M 32 5 Q ${(32 + wakeEnd) / 2} 3.5 ${wakeEnd} 5`}
            stroke="rgba(255,255,255,.18)" strokeWidth=".7"
            fill="none" strokeDasharray="1.4 2.2"
          />
        </svg>
      )}
      <div className={`ship-wrap${arrived ? ' ship-arrived' : ''}${stuck ? ' ship-blocked' : ''}`} style={{ left: `${shipX}%` }}>
        <svg viewBox="0 0 50 34" className="ship-svg">
          <ellipse cx="25" cy="30" rx="16" ry="3" fill="rgba(255,255,255,.07)"/>
          <path d="M7 17 L43 17 L39 26 L11 26 Z" fill="var(--amber)" opacity=".9"/>
          <path d="M11 21 L39 21 L37 26 L13 26 Z" fill="var(--amber-dark)" opacity=".25"/>
          <line x1="25" y1="4" x2="25" y2="17" stroke="rgba(255,255,255,.7)" strokeWidth="1.3"/>
          <path d="M25 5 L39 14 L25 16.5 Z" fill="rgba(255,255,255,.78)"/>
          <path d="M25 5 L13 14 L25 16.5 Z" fill="rgba(255,255,255,.5)"/>
          <path d="M25 4 L32 6.5 L25 9 Z" fill="var(--amber)"/>
        </svg>
        {stuck && <div className="ship-label">Linh's Ship</div>}
      </div>
    </div>
  );
}

// ---- Map background zones ----
function MapBackground({ layer, avgIntensity }) {
  const showStorm = layer === 1;
  const bridgeVis = layer === 2 && avgIntensity >= 58;

  const gapLabel = layer === 1 ? 'The IPL Storm' : 'The IPL Gap';
  const gapLabelStorm = layer === 1;

  return (
    <div className={`map-bg map-bg-layer-${layer}`} aria-hidden="true">
      {/* Star Island */}
      <div className="zone zone-academic">
        <div className="zone-header">
          <span className="zone-label">Star Island</span>
          <span className="zone-sublabel">Digital Media · SCD, RMIT</span>
        </div>
        <div className="zone-spacer" />
        <div className="zone-attrs">
          <div className="zone-attr">
            <span className="zone-attr-icon">⏱</span>
            <div className="zone-attr-body">
              <span className="zone-attr-cat">Pacing &amp; Time</span>
              <span className="zone-attr-title">Incubation &amp; Perfectionism</span>
              <span className="zone-attr-desc">Semester-long timelines &amp; deliberate craft</span>
            </div>
          </div>
          <div className="zone-attr">
            <span className="zone-attr-icon">🎯</span>
            <div className="zone-attr-body">
              <span className="zone-attr-cat">Role &amp; Adaptability</span>
              <span className="zone-attr-title">Deep Technical Specialization</span>
              <span className="zone-attr-desc">Hyper-focus in a single discipline</span>
            </div>
          </div>
          <div className="zone-attr">
            <span className="zone-attr-icon">⭐</span>
            <div className="zone-attr-body">
              <span className="zone-attr-cat">Evaluation Focus</span>
              <span className="zone-attr-title">Artistic &amp; Conceptual Purity</span>
              <span className="zone-attr-desc">Studio critique &amp; peer validation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ocean gap */}
      <div className="zone zone-gap">
        <span className="zone-ocean-label">Digital Media Ocean</span>
        <ConceptNote layer={layer} />
        {showStorm && <StormOverlay />}
        <Ship progress={avgIntensity / 100} stuck={layer === 1} />
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
        <span className={`zone-gap-label${gapLabelStorm ? ' zone-gap-label-storm' : ''}`}>{gapLabel}</span>
      </div>

      {/* Industry Hub */}
      <div className="zone zone-industry">
        <div className="zone-header">
          <span className="zone-label">Industry Hub</span>
          <span className="zone-sublabel">VFX &amp; Game · HCMC · Outsourcing</span>
        </div>
        <div className="zone-spacer" />
        <div className="zone-attrs">
          <div className="zone-attr">
            <span className="zone-attr-icon">⚡</span>
            <div className="zone-attr-body">
              <span className="zone-attr-cat">Pacing &amp; Time</span>
              <span className="zone-attr-title">Sprint-Based Velocity</span>
              <span className="zone-attr-desc">48h–1 week turnarounds</span>
            </div>
          </div>
          <div className="zone-attr">
            <span className="zone-attr-icon">🔀</span>
            <div className="zone-attr-body">
              <span className="zone-attr-cat">Role &amp; Adaptability</span>
              <span className="zone-attr-title">Multi-Format Versatility</span>
              <span className="zone-attr-desc">AI-ready jack of all trades</span>
            </div>
          </div>
          <div className="zone-attr">
            <span className="zone-attr-icon">📊</span>
            <div className="zone-attr-body">
              <span className="zone-attr-cat">Evaluation Focus</span>
              <span className="zone-attr-title">Client-Centric Conversion</span>
              <span className="zone-attr-desc">Business metrics &amp; outcomes</span>
            </div>
          </div>
          <div className="fast-boats" aria-hidden="true">
            <span className="fast-boat fb1">🚤</span>
            <span className="fast-boat fb2">🚤</span>
            <span className="fast-boat fb3">🚤</span>
          </div>
        </div>
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
      role="button" tabIndex={0}
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
        <path d="M30 8 L33.5 28 L30 25 L26.5 28 Z" fill="var(--amber)" opacity=".95"/>
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
      {layer === 1 && (
        <div className="legend-item"><span className="legend-shape legend-hex"/><span>Tension</span></div>
      )}
      {layer === 2 && (
        <div className="legend-item"><span className="legend-shape legend-diamond"/><span>Intervention</span></div>
      )}
    </div>
  );
}

// ---- Node ----
function Node({ nodeId, x, y, layer, activeSolutions, activeNode, onNodeClick, onSetIntensity, isBursting }) {
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
      className={`node node-${def.shape}${isActive ? ' node-active' : ''}${isSolution && intensity > 0 ? ' node-on' : ''}${isBursting ? ' node-storm-burst' : ''}`}
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
      {info.role     && <p className="info-role">{info.role}</p>}
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

// ---- Final outcome panel (layer 4 only) ----
function FinalOutcome({ activeSolutions, visible }) {
  const pct   = Math.round(activeSolutions.reduce((a, b) => a + b, 0) / 3);
  const items = [
    { label: 'AI Prototyping Sprint',    idx: 0 },
    { label: 'Shared Critique Boards',   idx: 1 },
    { label: 'Cross-Cultural Hackathon', idx: 2 },
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
          <cite>— Linh, responding to Tom's brief</cite>
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
  const [stormBurst, setStormBurst] = useState(null); // { id, x, y } or null

  const config = LAYERS[layer];
  const avg    = activeSolutions.reduce((a, b) => a + b, 0) / 3;
  const drift  = (avg / 100) * 10;
  // Drift only in layer 2 (The Compass)
  const linhX  = layer === 2 ? 15 + drift : 15;
  const tomX   = layer === 2 ? 85 - drift : 85;

  const allActive  = activeSolutions.filter(v => v > 0).length === 3;
  const isComplete = layer === 2 && allActive && avg >= 78;

  const connections = getConnections(layer, activeSolutions, linhX, tomX);

  function handleCanvasClick() {
    if (activeNode) onNodeClick(activeNode);
    setShowLegend(false);
  }

  function handleNodeClickWithStorm(nodeId) {
    const def = NODES[nodeId];
    if (def?.type === 'tension') {
      const pos = config.nodePositions.find(p => p.id === nodeId);
      if (pos) {
        setStormBurst({ id: nodeId, x: pos.x, y: pos.y });
        setTimeout(() => setStormBurst(null), 1100);
      }
    }
    onNodeClick(nodeId);
  }

  function posFor(id, base) {
    if (id === 'linh') return { ...base, x: linhX };
    if (id === 'tom')  return { ...base, x: tomX };
    return base;
  }

  // Position-aware InfoPanel: appear on the side of the canvas with more space
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
              onNodeClick={handleNodeClickWithStorm}
              onSetIntensity={onSetIntensity}
              isBursting={stormBurst?.id === pos.id}
            />
          );
        })}
      </div>

      {/* Storm ripple */}
      {stormBurst && (
        <StormRipple x={stormBurst.x} y={stormBurst.y} onEnd={() => setStormBurst(null)} />
      )}

      {/* Compass + legend */}
      <Compass onClick={e => { e?.stopPropagation(); setShowLegend(s => !s); }} />
      <MapLegend layer={layer} visible={showLegend} />

      {/* Resolution panel */}
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
