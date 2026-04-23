export const characters = {
  linh: {
    name: "Linh",
    role: "Final-year Communication Design student",
    side: "academic",
    attributes: [
      "Strong in 3D motion",
      "Design-theory grounding",
      "Limited client experience",
      "Process-focused mindset",
    ],
    quote:
      "I spent three weeks on this concept. It's the most technically refined thing I've ever made.",
  },
  khoa: {
    name: "Khoa",
    role: "Creative Director at mid-size agency",
    side: "industry",
    attributes: [
      "Pace-driven delivery",
      "Client-first thinking",
      "Values versatility",
      "Iterates fast, often rough",
    ],
    quote:
      "We need someone who can jump between decks, reels, and rapid prototypes in the same afternoon. Depth is great, but range keeps the lights on.",
  },
};

export const tensions = [
  {
    id: 1,
    theme: "Specialist Depth vs. Jack of All Trades",
    conflict:
      "Linh's three-week 3D motion piece impresses her tutors but leaves Khoa cold. He needs a generalist who can pivot fast. Her programme rewarded deep craft; his agency rewards speed and range. Neither is wrong — but they're speaking different professional languages.",
    khoa_quote:
      "Look — the work is beautiful. But if it takes three weeks to make one asset, we'd burn through the whole budget on a single social post.",
    options: {
      a: {
        label: "Assign more 3D specialisation tutorials",
        outcome:
          "Stalls progress. Linh deepens what she already knows; the range gap widens. Khoa moves on to the next candidate.",
      },
      b: {
        label: "Intervention: AI-Assisted Divergent Sprints",
        outcome:
          "Drawing on Google Sprint Methodology, Linh runs compressed diverge-and-converge cycles using AI image-gen and motion tools — producing rough multi-format drafts in hours. She keeps her craft eye while gaining the pace Tom needs.",
        transform: {
          name: "AI-Assisted Divergent Sprints",
          linh_change:
            "Using a Google Sprint-informed structure, Linh now ships a rough brand board, a reel frame, and a deck mockup in a single afternoon — then polishes the one the client picks.",
          before: ["Specialist only", "Slow iteration", "One format at a time"],
          after: [
            "Rapid multi-format",
            "AI-assisted drafts",
            "Selective polish",
          ],
        },
      },
    },
  },
  {
    id: 2,
    theme: "Creativity vs. Client Needs",
    conflict:
      "Linh pitches a concept built around personal expression and visual experimentation. Khoa's clients want brand compliance and measurable recall. Neither position is invalid — but without a shared vocabulary, feedback sessions become mutual frustration.",
    khoa_quote:
      "The client doesn't care about the concept behind the gradient. They care whether their logo reads at 80px on a phone screen.",
    options: {
      a: {
        label: "Run extra creative brief workshops in isolation",
        outcome:
          "Linh writes better briefs for imaginary clients. She still hasn't experienced real-time client pushback or approval dynamics.",
      },
      b: {
        label: "Intervention: Shared Critique Boards",
        outcome:
          "Live online boards where students present work-in-progress and industry mentors give client-voice feedback in real time. Linh learns to defend and adapt simultaneously.",
        transform: {
          name: "Shared Critique Boards",
          linh_change:
            "Linh learns to hold her design rationale lightly — she can argue for a choice and revise it in the same session without feeling like she's failing.",
          before: [
            "Closed studio crits",
            "Tutor-only feedback",
            "Concept-first defence",
          ],
          after: [
            "Live industry voice",
            "Real-time revision",
            "Rationale + flexibility",
          ],
        },
      },
    },
  },
  {
    id: 3,
    theme: "Resilience vs. Agency Pace",
    conflict:
      "Linh's academic environment rewarded careful, considered revision cycles. Khoa's agency runs on compressed timelines where 'good enough to test' beats 'perfect but late'. Linh freezes under time pressure; Khoa reads hesitation as a red flag.",
    khoa_quote:
      "We had an intern last round who was technically excellent but couldn't ship anything without three rounds of internal sign-off. We couldn't keep them.",
    options: {
      a: {
        label: "Add a mandatory 'time management' module to the curriculum",
        outcome:
          "Linh learns calendar frameworks but never practises in high-stakes, ambiguous conditions. The freeze response remains untested.",
      },
      b: {
        label: "Intervention: M-NODE Hackathon",
        outcome:
          "A 48-hour mixed team challenge pairing students with industry partners and real briefs. Linh ships something imperfect under pressure — and survives. That changes everything.",
        transform: {
          name: "M-NODE Hackathon",
          linh_change:
            "Linh now has a concrete story: 'I shipped a working prototype in 48 hours with a team I'd never met.' That sentence is worth more than any polished portfolio piece.",
          before: [
            "Long revision cycles",
            "Controlled feedback loops",
            "Perfectionism under pressure",
          ],
          after: [
            "Ships under constraint",
            "Mixed-team comfort",
            "Productive imperfection",
          ],
        },
      },
    },
  },
];

export const resolution = {
  linh_quote:
    "Understood. If we use AI to quickly re-render the three options, I can have rough mockups in both print and digital formats by end of day. Which direction do you want me to push first?",
  label: "Employability 5.0",
  description:
    "Three targeted IPL interventions bridged the gap between Linh's craft-depth and Khoa's pace-and-range demands. Neither had to abandon their values — the system learned to translate between them.",
};
