// ecosystem.js

export const NODES = {
  linh: {
    id: 'linh', type: 'char', shape: 'circle', color: 'amber',
    letter: 'L', label: 'Linh', sub: 'Digital Media Student',
    info: {
      type: 'Character', title: 'Linh',
      role: '3rd-year Digital Media student, School of Communication Design',
      attrs: [
        'Exceptional 3D modeling & motion graphics',
        'Builds in isolation — weeks on a single concept',
        'Emotionally attached to final output ("Beautiful Ship")',
        'No "Theory of Mind" for audience or client perspective',
        'Reads critique as personal failure'
      ],
      quote: 'I spent three weeks on this. It\'s the most technically refined thing I\'ve ever made.'
    }
  },
  khoa: {
    id: 'khoa', type: 'char', shape: 'circle', color: 'slate',
    letter: 'K', label: 'Khoa', sub: 'Creative Director',
    info: {
      type: 'Character', title: 'Khoa',
      role: 'Creative Director, fast-paced digital agency',
      attrs: [
        'Needs AI-ready "jack of all trades" designers',
        'Small agile teams — no bandwidth to mentor emotional reactions',
        'Delivers rapid-fire blunt feedback',
        'Pivots quickly to meet client demands',
        'Ships fast, iterates often'
      ],
      quote: 'We need someone who can jump between decks, reels, and prototypes in the same afternoon.'
    }
  },
  academic: {
    id: 'academic', type: 'system', shape: 'rect', color: 'amber',
    letter: '⬡', label: 'Academic', sub: 'University system',
    info: {
      type: 'System', title: 'Academic System',
      role: 'University curriculum & culture',
      attrs: [
        'Deep craft emphasis',
        'Process-driven assessment',
        'Studio critique culture',
        'Semester-long projects'
      ],
      quote: ''
    }
  },
  industry: {
    id: 'industry', type: 'system', shape: 'rect', color: 'slate',
    letter: '⬡', label: 'Industry', sub: 'Agency ecosystem',
    info: {
      type: 'System', title: 'Industry',
      role: 'Creative agency ecosystem',
      attrs: [
        'Sprint-based delivery',
        'Multi-format versatility',
        'Client-facing daily',
        'Ships fast, iterates often'
      ],
      quote: ''
    }
  },
  t1: {
    id: 't1', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Storm 1\nDepth vs Range', sub: 'Tension 1',
    info: {
      type: 'Storm', title: 'Storm 1 — Depth vs Range',
      role: 'Specialist craft vs Jack-of-all-trades',
      conflict: 'Linh\'s 3D craft impresses tutors but Khoa needs someone who covers more ground. Her "Beautiful Ship" took 3 weeks — that burns an entire project budget.',
      attrs: [],
      quote: 'If it takes three weeks per asset, we\'d burn through the budget on one social post.'
    }
  },
  t2: {
    id: 't2', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Storm 2\nVision vs Velocity', sub: 'Tension 2',
    info: {
      type: 'Storm', title: 'Storm 2 — Vision vs Velocity',
      role: 'Concept-led creativity vs client-first speed',
      conflict: 'Linh pitches concept-led work and can\'t separate her identity from the artwork. Khoa\'s clients want brand compliance and recall metrics — not artistic vision.',
      attrs: [],
      quote: 'They don\'t care about the concept. They care if the logo reads at 80px on a phone.'
    }
  },
  t3: {
    id: 't3', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Storm 3\nCraft vs Pressure', sub: 'Tension 3',
    info: {
      type: 'Storm', title: 'Storm 3 — Craft vs Pressure',
      role: 'Academic pacing vs agency velocity',
      conflict: 'Linh\'s programme rewarded careful revision. Khoa\'s agency runs on compressed timelines. When Khoa delivers blunt feedback, Linh freezes — the system breaks down.',
      attrs: [],
      quote: 'We had an intern who couldn\'t ship without three rounds of sign-off. We couldn\'t keep them.'
    }
  },
  s1: {
    id: 's1', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'AI\nPrototyping', sub: 'Intervention 1',
    resolves: 'storm', solveIndex: 0,
    info: {
      type: 'IPL Intervention', title: 'AI Prototyping Sprint',
      role: 'Lowering Attachment',
      attrs: [
        '50 rapid iterations in an hour',
        'Dismantles ego by externalising authorship',
        'Builds iteration speed and multi-format range',
        'Selective craft polish on chosen direction'
      ],
      quote: 'Linh now ships a brand board, reel frame, and deck mockup in one afternoon — then polishes the one the client picks.'
    }
  },
  s2: {
    id: 's2', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'Critique\nBoards', sub: 'Intervention 2',
    resolves: 'storm', solveIndex: 1,
    info: {
      type: 'IPL Intervention', title: 'Shared Critique Boards',
      role: 'Building Theory of Mind',
      attrs: [
        'Objective rubric-based feedback with peers',
        'Separates identity from artwork',
        'Live industry voice in the room',
        'Rationale held lightly — argue and revise in same session'
      ],
      quote: 'Linh learns to hold her design rationale lightly — she can argue for a choice and revise it in the same session.'
    }
  },
  s3: {
    id: 's3', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'Cross-Cultural\nHackathon', sub: 'Intervention 3',
    resolves: 'storm', solveIndex: 2,
    info: {
      type: 'IPL Intervention', title: 'Cross-Cultural Hackathon',
      role: 'Safe Exposure',
      attrs: [
        'Simulates agency pressure in a safe environment',
        'Short-circuits academic pacing vs industry velocity',
        'Mixed-team comfort under constraint',
        'Builds tolerance for productive imperfection'
      ],
      quote: 'Linh now has a story: "I shipped a working prototype in 48 hours with a team I\'d never met." That sentence is worth more than any portfolio piece.'
    }
  }
};

export const LAYERS = {
  1: {
    label: 'The Gap',
    sub: 'Situation & Tensions — click nodes to explore',
    nodePositions: [
      { id: 'academic', x: 10, y: 20 },
      { id: 'linh',     x: 20, y: 55 },
      { id: 't1',       x: 50, y: 16 },
      { id: 't2',       x: 50, y: 50 },
      { id: 't3',       x: 50, y: 83 },
      { id: 'khoa',     x: 80, y: 55 },
      { id: 'industry', x: 90, y: 20 },
    ]
  },
  2: {
    label: 'The Compass',
    sub: 'IPL Interventions — drag sliders to apply',
    nodePositions: [
      { id: 'academic', x: 10, y: 20 },
      { id: 'linh',     x: 20, y: 55 }, // dynamic x via avgIntensity
      { id: 's1',       x: 50, y: 16 },
      { id: 's2',       x: 50, y: 50 },
      { id: 's3',       x: 50, y: 83 },
      { id: 'khoa',     x: 80, y: 55 }, // dynamic x via avgIntensity
      { id: 'industry', x: 90, y: 20 },
    ]
  }
};

function cp(ax, ay, bx, by, bow = 6) {
  return { x: (ax + bx) / 2, y: (ay + by) / 2 - bow };
}

export function getConnections(layerId, activeSolutions, linhX = 20, khoaX = 80) {
  const lY = 55, kY = 55;

  // Layer 1: amber + slate + 6 tension lines (linh/khoa → t1, t2, t3)
  if (layerId === 1) {
    return [
      { from:{x:10,y:20}, to:{x:20,y:55},  cp: cp(10,20,20,55,4),  color:'amber',   dash:false },
      { from:{x:90,y:20}, to:{x:80,y:55},  cp: cp(90,20,80,55,4),  color:'slate',   dash:false },
      { from:{x:20,y:55}, to:{x:50,y:16},  cp: cp(20,55,50,16,8),  color:'tension', dash:false },
      { from:{x:20,y:55}, to:{x:50,y:50},  cp: cp(20,55,50,50,6),  color:'tension', dash:false },
      { from:{x:20,y:55}, to:{x:50,y:83},  cp: cp(20,55,50,83,6),  color:'tension', dash:false },
      { from:{x:80,y:55}, to:{x:50,y:16},  cp: cp(80,55,50,16,8),  color:'tension', dash:false },
      { from:{x:80,y:55}, to:{x:50,y:50},  cp: cp(80,55,50,50,6),  color:'tension', dash:false },
      { from:{x:80,y:55}, to:{x:50,y:83},  cp: cp(80,55,50,83,6),  color:'tension', dash:false },
    ];
  }

  // Layer 2: amber + slate + 6 intensity paths (dynamic linhX/khoaX)
  if (layerId === 2) {
    const make = (sx, sy, idx) => {
      const t = activeSolutions[idx] / 100;
      const bow = 6 + t * 10;
      return [
        {
          from: {x:linhX,y:lY}, to: {x:sx,y:sy},
          cp: cp(linhX,lY,sx,sy,bow),
          intensity: activeSolutions[idx], solveIdx: idx
        },
        {
          from: {x:sx,y:sy}, to: {x:khoaX,y:kY},
          cp: cp(sx,sy,khoaX,kY,bow),
          intensity: activeSolutions[idx], solveIdx: idx
        },
      ];
    };
    return [
      { from: {x:10,y:20}, to: {x:linhX,y:lY}, cp: cp(10,20,linhX,lY,4), color: 'amber', dash: false },
      { from: {x:90,y:20}, to: {x:khoaX,y:kY}, cp: cp(90,20,khoaX,kY,4), color: 'slate', dash: false },
      ...make(50,16,0),
      ...make(50,50,1),
      ...make(50,83,2),
    ];
  }

  return [];
}
