// ecosystem.js — node definitions and layer configurations

export const NODES = {
  linh: {
    id: 'linh', type: 'char', shape: 'circle', color: 'amber',
    letter: 'L', label: 'Linh', sub: 'Design Student',
    info: {
      type: 'Character',
      title: 'Linh',
      role: 'Final-year Communication Design student',
      attrs: ['Strong in 3D motion', 'Design-theory grounding', 'Limited client experience', 'Process-focused mindset'],
      quote: 'I spent three weeks on this concept. It\'s the most technically refined thing I\'ve ever made.'
    }
  },
  khoa: {
    id: 'khoa', type: 'char', shape: 'circle', color: 'slate',
    letter: 'K', label: 'Khoa', sub: 'Creative Director',
    info: {
      type: 'Character',
      title: 'Khoa',
      role: 'Creative Director, mid-size agency',
      attrs: ['Pace-driven delivery', 'Client-first thinking', 'Values versatility', 'Rapid iteration'],
      quote: 'We need someone who can jump between decks, reels, and prototypes in the same afternoon.'
    }
  },
  academic: {
    id: 'academic', type: 'system', shape: 'rect', color: 'amber',
    letter: '⬡', label: 'Academic', sub: 'University system',
    info: {
      type: 'System',
      title: 'Academic System',
      role: 'University curriculum & culture',
      attrs: ['Deep craft emphasis', 'Process-driven assessment', 'Studio critique culture', 'Semester-long projects'],
      quote: ''
    }
  },
  industry: {
    id: 'industry', type: 'system', shape: 'rect', color: 'slate',
    letter: '⬡', label: 'Industry', sub: 'Agency ecosystem',
    info: {
      type: 'System',
      title: 'Industry',
      role: 'Creative agency ecosystem',
      attrs: ['Sprint-based delivery', 'Multi-format versatility', 'Client-facing daily', 'Ships fast, iterates often'],
      quote: ''
    }
  },
  t1: {
    id: 't1', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Specialist\nvs Generalist', sub: 'Tension 1',
    info: {
      type: 'Tension',
      title: 'Specialist Depth vs. Generalist Range',
      role: 'The craft gap',
      attrs: [],
      conflict: 'Linh\'s three-week 3D piece impresses tutors but leaves Khoa cold. Her programme rewarded deep craft; his agency rewards speed and range.',
      quote: 'If it takes three weeks to make one asset, we\'d burn through the budget on a single social post.'
    }
  },
  t2: {
    id: 't2', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Creativity\nvs Client', sub: 'Tension 2',
    info: {
      type: 'Tension',
      title: 'Creativity vs. Client Needs',
      role: 'The language gap',
      attrs: [],
      conflict: 'Linh pitches concept-led work. Khoa\'s clients want brand compliance and measurable recall. Neither is wrong — but they\'re speaking different professional languages.',
      quote: 'The client doesn\'t care about the concept behind the gradient. They care if the logo reads at 80px.'
    }
  },
  t3: {
    id: 't3', type: 'tension', shape: 'hex', color: 'tension',
    letter: '⚡', label: 'Resilience\nvs Pace', sub: 'Tension 3',
    info: {
      type: 'Tension',
      title: 'Resilience vs. Agency Pace',
      role: 'The pressure gap',
      attrs: [],
      conflict: 'Linh\'s environment rewarded careful revision cycles. Khoa\'s agency runs on compressed timelines where "good enough to test" beats "perfect but late".',
      quote: 'We had an intern who was technically excellent but couldn\'t ship without three rounds of sign-off.'
    }
  },
  s1: {
    id: 's1', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'AI\nSprint', sub: 'Solution 1',
    resolves: 't1', solveIndex: 0,
    info: {
      type: 'IPL Intervention',
      title: 'AI Prototyping Sprint',
      role: 'Resolves: Specialist vs Generalist',
      attrs: ['Multi-format outputs in hours', 'AI tools for rapid ideation', 'Selective craft polish'],
      quote: 'Linh now ships a rough brand board, reel frame, and deck mockup in a single afternoon — then polishes the one the client picks.'
    }
  },
  s2: {
    id: 's2', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'Critique\nBoards', sub: 'Solution 2',
    resolves: 't2', solveIndex: 1,
    info: {
      type: 'IPL Intervention',
      title: 'Shared Critique Boards',
      role: 'Resolves: Creativity vs Client',
      attrs: ['Live industry voice', 'Real-time revision', 'Rationale + flexibility'],
      quote: 'Linh learns to hold her design rationale lightly — she can argue for a choice and revise it in the same session.'
    }
  },
  s3: {
    id: 's3', type: 'solution', shape: 'diamond', color: 'resolve',
    letter: '✦', label: 'M-NODE\nHackathon', sub: 'Solution 3',
    resolves: 't3', solveIndex: 2,
    info: {
      type: 'IPL Intervention',
      title: 'M-NODE Hackathon',
      role: 'Resolves: Resilience vs Pace',
      attrs: ['Ships under constraint', 'Mixed-team comfort', 'Productive imperfection'],
      quote: 'Linh now has a concrete story: "I shipped a working prototype in 48 hours with a team I\'d never met."'
    }
  },
  bridge: {
    id: 'bridge', type: 'bridge', shape: 'circle', color: 'resolve',
    letter: '∞', label: 'Employability\n5.0', sub: 'Bridged outcome',
    info: {
      type: 'Outcome',
      title: 'Employability 5.0',
      role: 'The bridged system',
      attrs: ['Rapid multi-format', 'AI-assisted drafts', 'Client-voice literacy', 'Ships under constraint'],
      quote: 'Understood. If we use AI to quickly re-render, I can have mockups in both formats by end of day. Which direction first?'
    }
  }
};

// Node positions per layer (x%, y% of canvas — anchor at node center)
export const LAYERS = {
  1: {
    label: 'Situation',
    subtitle: 'Who are the players?',
    nodePositions: [
      { id: 'academic', x: 16,  y: 24 },
      { id: 'linh',     x: 18,  y: 60 },
      { id: 'industry', x: 84,  y: 24 },
      { id: 'khoa',     x: 82,  y: 60 },
    ]
  },
  2: {
    label: 'Tensions',
    subtitle: 'Where is the friction?',
    nodePositions: [
      { id: 'linh', x: 12, y: 50 },
      { id: 't1',   x: 50, y: 18 },
      { id: 't2',   x: 50, y: 50 },
      { id: 't3',   x: 50, y: 82 },
      { id: 'khoa', x: 88, y: 50 },
    ]
  },
  3: {
    label: 'Solutions',
    subtitle: 'What changes the system? Click to activate.',
    nodePositions: [
      { id: 'linh', x: 12, y: 50 },
      { id: 's1',   x: 50, y: 18 },
      { id: 's2',   x: 50, y: 50 },
      { id: 's3',   x: 50, y: 82 },
      { id: 'khoa', x: 88, y: 50 },
    ]
  },
  4: {
    label: 'Conclusions',
    subtitle: 'The bridged outcome.',
    nodePositions: [
      { id: 'linh',   x: 22,  y: 55 },
      { id: 'bridge', x: 50,  y: 47 },
      { id: 'khoa',   x: 78,  y: 55 },
    ]
  }
};

export function getConnections(layerId, activeSolutions) {
  const L = (x, y) => ({ x, y });

  switch (layerId) {
    case 1:
      return [
        { from: L(16,24), to: L(18,60), color: 'amber',   dash: false, label: '' },
        { from: L(84,24), to: L(82,60), color: 'slate',   dash: false, label: '' },
        { from: L(18,60), to: L(82,60), color: 'gap',     dash: true,  label: 'IPL Gap' },
      ];
    case 2:
      return [
        { from: L(12,50), to: L(50,18), color: 'tension', dash: false },
        { from: L(12,50), to: L(50,50), color: 'tension', dash: false },
        { from: L(12,50), to: L(50,82), color: 'tension', dash: false },
        { from: L(88,50), to: L(50,18), color: 'tension', dash: false },
        { from: L(88,50), to: L(50,50), color: 'tension', dash: false },
        { from: L(88,50), to: L(50,82), color: 'tension', dash: false },
      ];
    case 3:
      // activeSolutions are 0–100 intensity values
      return [
        { from: L(12,50), to: L(50,18), intensity: activeSolutions[0], solveIdx: 0 },
        { from: L(12,50), to: L(50,50), intensity: activeSolutions[1], solveIdx: 1 },
        { from: L(12,50), to: L(50,82), intensity: activeSolutions[2], solveIdx: 2 },
        { from: L(50,18), to: L(88,50), intensity: activeSolutions[0], solveIdx: 0 },
        { from: L(50,50), to: L(88,50), intensity: activeSolutions[1], solveIdx: 1 },
        { from: L(50,82), to: L(88,50), intensity: activeSolutions[2], solveIdx: 2 },
      ];
    case 4:
      return [
        { from: L(22,55), to: L(50,47), color: 'amber',   dash: false },
        { from: L(78,55), to: L(50,47), color: 'slate',   dash: false },
      ];
    default:
      return [];
  }
}
