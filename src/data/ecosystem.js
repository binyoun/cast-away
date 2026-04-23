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
  tom: {
    id: 'tom', type: 'char', shape: 'circle', color: 'slate',
    letter: 'T', label: 'Tom', sub: 'Creative Director',
    info: {
      type: 'Character', title: 'Tom',
      role: 'Creative Director, VFX & Game Agency — HCMC, mid-size, outsourcing',
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
  t1: {
    id: 't1', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Storm 1\nThe Velocity Gap', sub: 'Pacing & Time',
    info: {
      type: 'Storm', title: 'Storm 1 — The Velocity Gap',
      role: 'Academic incubation vs industry sprint velocity',
      conflict: 'Academic curriculum is built on semester-long timelines and perfectionism. HCMC agencies need multi-format mockups in 48 hours. Linh freezes when asked to compress a 12-week perfectionist workflow into a 3-day client sprint.',
      attrs: [],
      quote: 'We need a first draft by Friday. They came back asking if we could extend the deadline by two weeks.'
    }
  },
  t2: {
    id: 't2', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Storm 2\nThe Agility Gap', sub: 'Role & Adaptability',
    info: {
      type: 'Storm', title: 'Storm 2 — The Agility Gap',
      role: 'Deep specialization vs multi-format versatility',
      conflict: 'RMIT rewards deep technical specialization — Linh spent three years as a hyper-focused 3D motion expert. Tom\'s agency needs an AI-ready jack-of-all-trades who bridges 3D, 2D layouts, and copywriting on the fly.',
      attrs: [],
      quote: 'We don\'t need a 3D expert. We need someone who can use AI to switch between any format within the same day.'
    }
  },
  t3: {
    id: 't3', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Storm 3\nThe Beautiful Ship Gap', sub: 'Evaluation Focus',
    info: {
      type: 'Storm', title: 'Storm 3 — The "Beautiful Ship" Gap',
      role: 'Artistic purity vs client-centric conversion',
      conflict: 'Studio critique culture validates work by aesthetic beauty and concept. Tom\'s clients evaluate purely on business outcomes and conversion metrics. When feedback prioritizes function over beauty, Linh takes it personally — ego barriers emerge instead of rapid problem-solving.',
      attrs: [],
      quote: 'If it takes three weeks per asset and the client still hates it, we\'ve burned the budget twice.'
    }
  },
  s1: {
    id: 's1', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'AI Divergent\nSprints', sub: 'Solution 1',
    resolves: 'storm', solveIndex: 0,
    info: {
      type: 'IPL Intervention', title: 'AI-Assisted Divergent Sprints',
      role: 'Lowering Attachment · Google Sprint Methodology',
      attrs: [
        'Google Sprint Structure: Compressed 5-day diverge-and-converge cycles drawn from Google Sprint Methodology — multiple directions explored and tested within a working week, not over months',
        'Dismantling Ego: AI generates rough multi-format drafts rapidly, so students learn not to treat their first draft as precious — avoiding the "Beautiful Ship" trap',
        'Building Velocity: Develops the agile iteration speed required by modern agencies — ship rough, select, then polish'
      ],
      quote: 'Linh now ships a brand board, reel frame, and deck mockup in one afternoon — then polishes the one the client picks.'
    }
  },
  s2: {
    id: 's2', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'Industry\nCritique', sub: 'Solution 2',
    resolves: 'storm', solveIndex: 1,
    info: {
      type: 'IPL Intervention', title: 'Industry-Integrated Critique',
      role: 'Building Theory of Mind',
      attrs: [
        'Real-World Feedback Loops: Replaces rigid academic rubrics with guest judging from actual industry professionals',
        'Team-Based Decoding: Students collaborate to deconstruct and implement professional feedback',
        'Separating Identity from Art: Develops a client-focused perspective rather than taking critique personally'
      ],
      quote: 'Linh learns to hold her design rationale lightly — she can argue for a choice and revise it in the same session.'
    }
  },
  s3: {
    id: 's3', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'Cross-Cultural\nHackathon', sub: 'Solution 3',
    resolves: 'storm', solveIndex: 2,
    info: {
      type: 'IPL Intervention', title: 'Cross-Cultural Hackathons',
      role: 'Safe Exposure',
      attrs: [
        'Simulated Agency Pressure: High-intensity events (e.g. M-NODE collaboration) provide a safe environment to fail and iterate',
        'Pedagogical "Short Circuit": Forces students to operate at sprint speed',
        'Emotional Resilience: Bridges the gap between slow academic pacing and high-velocity industry reality'
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
      { id: 'linh', x: 15, y: 40 },
      { id: 't1',   x: 50, y: 16 },
      { id: 't2',   x: 50, y: 50 },
      { id: 't3',   x: 50, y: 83 },
      { id: 'tom',  x: 85, y: 40 },
    ]
  },
  2: {
    label: 'The Compass',
    sub: 'IPL Solutions — drag sliders to apply',
    nodePositions: [
      { id: 'linh', x: 15, y: 40 },
      { id: 's1',   x: 50, y: 28 },
      { id: 's2',   x: 50, y: 58 },
      { id: 's3',   x: 50, y: 83 },
      { id: 'tom',  x: 85, y: 40 },
    ]
  }
};

function cp(ax, ay, bx, by, bow = 6) {
  return { x: (ax + bx) / 2, y: (ay + by) / 2 - bow };
}

export function getConnections(layerId, activeSolutions, linhX = 15, tomX = 85) {
  const lY = 40, tY = 40;

  // Layer 1: 6 tension lines (linh/tom → t1, t2, t3)
  if (layerId === 1) {
    return [
      { from:{x:linhX,y:lY}, to:{x:50,y:16}, cp: cp(linhX,lY,50,16,8), color:'tension', dash:false },
      { from:{x:linhX,y:lY}, to:{x:50,y:50}, cp: cp(linhX,lY,50,50,6), color:'tension', dash:false },
      { from:{x:linhX,y:lY}, to:{x:50,y:83}, cp: cp(linhX,lY,50,83,6), color:'tension', dash:false },
      { from:{x:tomX, y:tY}, to:{x:50,y:16}, cp: cp(tomX, tY,50,16,8), color:'tension', dash:false },
      { from:{x:tomX, y:tY}, to:{x:50,y:50}, cp: cp(tomX, tY,50,50,6), color:'tension', dash:false },
      { from:{x:tomX, y:tY}, to:{x:50,y:83}, cp: cp(tomX, tY,50,83,6), color:'tension', dash:false },
    ];
  }

  // Layer 2: 6 intensity paths (linh/tom → s1, s2, s3)
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
          from: {x:sx,y:sy}, to: {x:tomX,y:tY},
          cp: cp(sx,sy,tomX,tY,bow),
          intensity: activeSolutions[idx], solveIdx: idx
        },
      ];
    };
    return [
      ...make(50,28,0),
      ...make(50,58,1),
      ...make(50,83,2),
    ];
  }

  return [];
}
