// All game content lives here so the political message and numbers stay easy to
// edit. Costs are expressed in millions of pounds.

export type ProjectId =
  | 'healthcare'
  | 'buses'
  | 'police'
  | 'business'
  | 'potholes'
  | 'galleyHill'

export interface Project {
  id: ProjectId
  /** Short name shown on the project card and map. */
  name: string
  /** Cost in millions of pounds. */
  cost: number
  /** Emoji/glyph used on the pixel map. */
  glyph: string
  /** Persuasive description shown on the project card. */
  blurb: string
  /** One-line summary of the good outcome once funded. */
  fundedSummary: string
  /** Label used on the results screen. */
  resultLabel: string
  /** Value shown if Dartford had actually funded this. */
  goodValue: string
  /** Value shown in the Option 4D bad ending (Jim's choice). */
  badValue: string
}

interface IntroBodyLine {
  text: string
  tone?: 'warn'
}

/** Total money on the table, in millions of pounds. */
export const TOTAL_BUDGET = 135.9

export const PROJECTS: Project[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    cost: 12,
    glyph: '🏥',
    blurb:
      'Build 2 new GP hubs and upgrade existing sites, unlocking thousands of new GP appointments.',
    fundedSummary: '2 GP hubs built — thousands of new appointments unlocked.',
    resultLabel: 'GP Hubs Built',
    goodValue: '2',
    badValue: '0',
  },
  {
    id: 'buses',
    name: 'Local Bus Services',
    cost: 20,
    glyph: '🚌',
    blurb: 'Improve the frequency and reliability of local bus services.',
    fundedSummary: 'Buses run more often and on time across the borough.',
    resultLabel: 'Bus Services Improved',
    goodValue: 'Yes',
    badValue: 'No',
  },
  {
    id: 'police',
    name: 'Policing',
    cost: 25,
    glyph: '👮',
    blurb: 'Hire 80 new police officers in the borough for five years.',
    fundedSummary: '80 new police officers on the streets for five years.',
    resultLabel: 'Police Officers Hired',
    goodValue: '80',
    badValue: '0',
  },
  {
    id: 'business',
    name: 'Small Businesses',
    cost: 18,
    glyph: '🏪',
    blurb: '£18M of relief for local small businesses in Dartford.',
    fundedSummary: 'Local high-street businesses get the relief they need.',
    resultLabel: 'Small Businesses Helped',
    goodValue: '1,200',
    badValue: '0',
  },
  {
    id: 'potholes',
    name: 'Pothole Repairs',
    cost: 10,
    glyph: '🛣️',
    blurb: 'Repair 30,000 potholes across Kent.',
    fundedSummary: '30,000 potholes repaired across Kent.',
    resultLabel: 'Potholes Repaired',
    goodValue: '30,000',
    badValue: '0',
  },
  {
    id: 'galleyHill',
    name: 'Galley Hill',
    cost: 50,
    glyph: '⛰️',
    blurb: 'Fix Galley Hill and reopen the route for good.',
    fundedSummary: 'Galley Hill is finally being fixed.',
    resultLabel: 'Galley Hill Fixed',
    goodValue: 'Yes',
    badValue: 'No',
  },
]

/** Extra outcome rows for the bad ending that are not tied to a project. */
export interface ResultRow {
  label: string
  value: string
  /** When true the value is rendered as a warning (red). */
  bad?: boolean
}

export const BAD_ENDING_EXTRAS: ResultRow[] = [
  { label: 'Budget Left', value: '£0', bad: true },
  { label: 'Dartford Split in Half', value: 'Yes', bad: true },
  { label: 'Disappointed Constituents', value: '75,426', bad: true },
]

export const COPY = {
  introTitle: 'There is £135.9M on the table.',
  introBody: [
    {
      text: 'That could fix roads, improve buses, boost GP appointments, support small businesses, hire more police and finally fix Galley Hill.',
    },
    {
      text: 'Instead, it’s being spent on Option 4D - a plan to split Dartford in two.',
      tone: 'warn',
    },
    { text: "Dartford's Labour MP is in favour of this." },
  ] satisfies IntroBodyLine[],
  introCallout: 'See What Dartford Could Have.',
  introButton: 'See What Dartford Could Have',
  budgetAllSelected:
    'You improved healthcare, buses, policing, roads, local businesses and Galley Hill — and still had £0.9M left.',
  budgetButton: "Now See Jim's Choice",
  revealBody:
    'Instead of all that, Jim is currently spending the whole £135.9M on Option 4D.',
  revealButton: 'Spend It All on Option 4D',
  resultsPortraitCaption: 'Jim chose Option 4D.',
  splitOverlayMessage: 'Stop the Split, Stop Option 4D, Stop Jim.',
  splitOverlayCallToAction: 'Save Dartford',
  endingMessage: '£135.9M spent. Dartford divided. Nothing fixed.',
  rejectButton: 'Say No: Sign our Petition',
}

/** Where to point the "Tell Jim" call to action. */
export const REJECT_URL =
  'https://www.dartfordconservatives.org.uk/dont-let-them-divide-dartford-only-you-can-stop-them'
