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
  storm: {
    id: 'storm', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'The\nStorm', sub: 'Critical Breakdown',
    info: {
      type: 'Tension', title: 'The Storm',
      role: 'The moment of breakdown — live brief with Khoa',
      attrs: [],
      conflict: 'Linh presents her polished, inflexible motion graphics project. Ego and anxiety override any professional response. She freezes — unable to articulate a pivot.',
      quote: 'This visual hierarchy is too cluttered for the target audience. The colors won\'t convert. We need to strip this back and start over.'
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
    label: 'The Island',
    sub: 'Meet Linh — click nodes to explore',
    nodePositions: [
      { id: 'academic', x: 14, y: 22 },
      { id: 'linh',     x: 30, y: 54 },
    ]
  },
  2: {
    label: 'The Rescue Ship',
    sub: 'Meet Khoa — click nodes to explore',
    nodePositions: [
      { id: 'khoa',     x: 70, y: 54 },
      { id: 'industry', x: 86, y: 22 },
    ]
  },
  3: {
    label: 'The Storm',
    sub: 'Critical breakdown — click nodes to explore',
    nodePositions: [
      { id: 'academic', x: 10, y: 20 },
      { id: 'linh',     x: 20, y: 55 },
      { id: 'storm',    x: 50, y: 46 },
      { id: 'khoa',     x: 80, y: 55 },
      { id: 'industry', x: 90, y: 20 },
    ]
  },
  4: {
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

  if (layerId === 1) {
    return [
      { from: {x:14,y:22}, to: {x:30,y:lY}, cp: cp(14,22,30,lY,4), color: 'amber', dash: false },
    ];
  }

  if (layerId === 2) {
    return [
      { from: {x:86,y:22}, to: {x:70,y:kY}, cp: cp(86,22,70,kY,4), color: 'slate', dash: false },
    ];
  }

  if (layerId === 3) {
    return [
      { from: {x:10,y:20}, to: {x:20,y:lY},  cp: cp(10,20,20,lY,4),  color: 'amber',   dash: false },
      { from: {x:90,y:20}, to: {x:80,y:kY},  cp: cp(90,20,80,kY,4),  color: 'slate',   dash: false },
      { from: {x:20,y:lY}, to: {x:50,y:46},  cp: cp(20,lY,50,46,8),  color: 'tension', dash: false },
      { from: {x:80,y:kY}, to: {x:50,y:46},  cp: cp(80,kY,50,46,8),  color: 'tension', dash: false },
    ];
  }

  if (layerId === 4) {
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
