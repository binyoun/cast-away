// ecosystem.js

export const NODES = {
  linh: {
    id: 'linh', type: 'char', shape: 'circle', color: 'amber',
    letter: 'L', label: 'Linh', sub: 'Digital Media Student',
    info: {
      type: 'Character', title: 'Linh',
      role: 'Digital Media student, School of Communication Design',
      attrs: ['Strong in 3D motion', 'Design-theory grounding', 'Limited client experience', 'Process-focused mindset'],
      quote: 'I spent three weeks on this concept. It\'s the most technically refined thing I\'ve ever made.'
    }
  },
  khoa: {
    id: 'khoa', type: 'char', shape: 'circle', color: 'slate',
    letter: 'K', label: 'Khoa', sub: 'Creative Director',
    info: {
      type: 'Character', title: 'Khoa',
      role: 'Creative Director, mid-size agency',
      attrs: ['Pace-driven delivery', 'Client-first thinking', 'Values versatility', 'Rapid iteration'],
      quote: 'We need someone who can jump between decks, reels, and prototypes in the same afternoon.'
    }
  },
  academic: {
    id: 'academic', type: 'system', shape: 'rect', color: 'amber',
    letter: '⬡', label: 'Academic', sub: 'University system',
    info: {
      type: 'System', title: 'Academic System',
      role: 'University curriculum & culture',
      attrs: ['Deep craft emphasis', 'Process-driven assessment', 'Studio critique culture', 'Semester-long projects'],
      quote: ''
    }
  },
  industry: {
    id: 'industry', type: 'system', shape: 'rect', color: 'slate',
    letter: '⬡', label: 'Industry', sub: 'Agency ecosystem',
    info: {
      type: 'System', title: 'Industry',
      role: 'Creative agency ecosystem',
      attrs: ['Sprint-based delivery', 'Multi-format versatility', 'Client-facing daily', 'Ships fast, iterates often'],
      quote: ''
    }
  },
  t1: {
    id: 't1', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Specialist\nvs Generalist', sub: 'Tension 1',
    info: {
      type: 'Tension', title: 'Specialist Depth vs. Generalist Range',
      role: 'The craft gap',
      attrs: [],
      conflict: 'Linh\'s 3D craft impresses tutors but Khoa needs someone who covers more ground.',
      quote: 'If it takes three weeks per asset, we\'d burn through the budget on one social post.'
    }
  },
  t2: {
    id: 't2', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Creativity\nvs Client', sub: 'Tension 2',
    info: {
      type: 'Tension', title: 'Creativity vs. Client Needs',
      role: 'The language gap',
      attrs: [],
      conflict: 'Linh pitches concept-led work. Khoa\'s clients want brand compliance and recall metrics.',
      quote: 'They don\'t care about the concept. They care if the logo reads at 80px on a phone.'
    }
  },
  t3: {
    id: 't3', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Resilience\nvs Pace', sub: 'Tension 3',
    info: {
      type: 'Tension', title: 'Resilience vs. Agency Pace',
      role: 'The pressure gap',
      attrs: [],
      conflict: 'Linh\'s programme rewarded careful revision. Khoa\'s agency runs on compressed timelines.',
      quote: 'We had an intern who couldn\'t ship without three rounds of sign-off. We couldn\'t keep them.'
    }
  },
  s1: {
    id: 's1', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'AI\nSprint', sub: 'Intervention 1',
    resolves: 't1', solveIndex: 0,
    info: {
      type: 'IPL Intervention', title: 'AI Prototyping Sprint',
      role: 'Resolves: Specialist vs Generalist',
      attrs: ['Multi-format outputs in hours', 'AI tools for rapid ideation', 'Selective craft polish'],
      quote: 'Linh now ships a brand board, reel frame, and deck mockup in one afternoon — then polishes the one the client picks.'
    }
  },
  s2: {
    id: 's2', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'Critique\nBoards', sub: 'Intervention 2',
    resolves: 't2', solveIndex: 1,
    info: {
      type: 'IPL Intervention', title: 'Shared Critique Boards',
      role: 'Resolves: Creativity vs Client',
      attrs: ['Live industry voice', 'Real-time revision', 'Rationale + flexibility'],
      quote: 'Linh learns to hold her design rationale lightly — she can argue for a choice and revise it in the same session.'
    }
  },
  s3: {
    id: 's3', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'M-NODE\nHackathon', sub: 'Intervention 3',
    resolves: 't3', solveIndex: 2,
    info: {
      type: 'IPL Intervention', title: 'M-NODE Hackathon',
      role: 'Resolves: Resilience vs Pace',
      attrs: ['Ships under constraint', 'Mixed-team comfort', 'Productive imperfection'],
      quote: 'Linh now has a story: "I shipped a working prototype in 48 hours with a team I\'d never met." That sentence is worth more than any portfolio piece.'
    }
  }
};

// Two layers only: The Gap + The Bridge
export const LAYERS = {
  1: {
    label: 'The Gap',
    sub: 'Situation & Tensions — click nodes to explore',
    nodePositions: [
      { id: 'academic', x: 10,  y: 20 },
      { id: 'linh',     x: 20,  y: 55 },
      { id: 't1',       x: 50,  y: 16 },
      { id: 't2',       x: 50,  y: 50 },
      { id: 't3',       x: 50,  y: 83 },
      { id: 'khoa',     x: 80,  y: 55 },
      { id: 'industry', x: 90,  y: 20 },
    ]
  },
  2: {
    label: 'The Bridge',
    sub: 'IPL Interventions — drag sliders to apply',
    nodePositions: [
      { id: 'academic', x: 10,  y: 20 },
      { id: 'linh',     x: 20,  y: 55 }, // dynamic x via avgIntensity
      { id: 's1',       x: 50,  y: 16 },
      { id: 's2',       x: 50,  y: 50 },
      { id: 's3',       x: 50,  y: 83 },
      { id: 'khoa',     x: 80,  y: 55 }, // dynamic x via avgIntensity
      { id: 'industry', x: 90,  y: 20 },
    ]
  }
};

// Curved quadratic bezier paths. Returns {from, to, cp, ...}
function cp(ax, ay, bx, by, bow = 6) {
  return { x: (ax + bx) / 2, y: (ay + by) / 2 - bow };
}

export function getConnections(layerId, activeSolutions, linhX = 20, khoaX = 80) {
  const lY = 55, kY = 55;

  if (layerId === 1) {
    return [
      { from: {x:10,y:20}, to: {x:linhX,y:lY}, cp: cp(10,20,linhX,lY,4), color: 'amber',   dash: false },
      { from: {x:90,y:20}, to: {x:khoaX,y:kY}, cp: cp(90,20,khoaX,kY,4), color: 'slate',   dash: false },
      { from: {x:linhX,y:lY}, to: {x:50,y:16},  cp: cp(linhX,lY,50,16,8), color: 'tension', dash: false },
      { from: {x:linhX,y:lY}, to: {x:50,y:50},  cp: cp(linhX,lY,50,50,6), color: 'tension', dash: false },
      { from: {x:linhX,y:lY}, to: {x:50,y:83},  cp: cp(linhX,lY,50,83,6), color: 'tension', dash: false },
      { from: {x:khoaX,y:kY}, to: {x:50,y:16},  cp: cp(khoaX,kY,50,16,8), color: 'tension', dash: false },
      { from: {x:khoaX,y:kY}, to: {x:50,y:50},  cp: cp(khoaX,kY,50,50,6), color: 'tension', dash: false },
      { from: {x:khoaX,y:kY}, to: {x:50,y:83},  cp: cp(khoaX,kY,50,83,6), color: 'tension', dash: false },
    ];
  }

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
