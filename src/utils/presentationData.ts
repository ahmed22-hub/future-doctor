export interface PresentationStep {
  number: number;
  title: string;
  shortText: string;
  explanation: string;
  keyPoint: string;
  imageKey: 'scan' | 'robot' | 'panoramic' | 'doctor';
}

export interface PresentationSlide {
  id: number;
  sectionNumber: string;
  title: string;
  subtitle?: string;
  badge?: string;
  quote?: string;
  imageKey?: 'hero' | 'robot' | 'scan' | 'doctor' | 'panoramic' | 'conclusion';
  type: 'hero' | 'concept' | 'workflow' | 'doctor' | 'robot' | 'or' | 'advantages' | 'limits' | 'conclusion';
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
    badge?: string;
  }>;
  steps?: PresentationStep[];
}

export const WORKFLOW_PRESENTATION_STEPS: PresentationStep[] = [
  {
    number: 1,
    title: 'Données du patient',
    shortText: 'Le robot reçoit les données du patient.',
    explanation: 'Le système charge les scanners, IRM et constantes vitales pour modéliser le corps en 3D.',
    keyPoint: 'Scanners et images 3D',
    imageKey: 'scan',
  },
  {
    number: 2,
    title: 'Analyse par l\'IA',
    shortText: 'L\'IA analyse les informations.',
    explanation: 'L\'intelligence artificielle identifie la zone à opérer et repère les vaisseaux à protéger.',
    keyPoint: 'Analyse prédictive en temps réel',
    imageKey: 'scan',
  },
  {
    number: 3,
    title: 'Préparation de l\'opération',
    shortText: 'Le système prépare l\'opération.',
    explanation: 'Un trajet millimétré est calculé pour que les instruments évitent tous les tissus sains.',
    keyPoint: 'Plan chirurgical sur mesure',
    imageKey: 'panoramic',
  },
  {
    number: 4,
    title: 'Le robot opère',
    shortText: 'Le robot réalise les gestes chirurgicaux.',
    explanation: 'Les bras robotisés effectuent les incisions et sutures avec une précision constante sans fatigue.',
    keyPoint: 'Gestes sans tremblement',
    imageKey: 'robot',
  },
  {
    number: 5,
    title: 'Surveillance',
    shortText: 'Le médecin surveille l\'opération.',
    explanation: 'Le chirurgien garde les yeux sur les écrans de contrôle et peut stopper ou reprendre la main.',
    keyPoint: 'Contrôle humain permanent',
    imageKey: 'doctor',
  },
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  // SLIDE 1
  {
    id: 1,
    sectionNumber: '01 / 09',
    title: 'Chirurgien du futur',
    subtitle: 'Robots autonomes & Intelligence Artificielle',
    badge: 'Vision prospective',
    quote: '« Dans le futur, les robots et l\'intelligence artificielle pourront aider à réaliser des opérations. »',
    imageKey: 'hero',
    type: 'hero',
    items: [
      { title: 'Médecine de demain', description: 'Une transformation profonde du bloc opératoire.' },
      { title: 'Précision robotique', description: 'Assistance automatisée pour des gestes millimétrés.' },
      { title: 'Supervision humaine', description: 'Le médecin reste le maître de la décision médicale.' },
    ],
  },
  // SLIDE 2
  {
    id: 2,
    sectionNumber: '02 / 09',
    title: 'Le métier',
    subtitle: 'Une nouvelle façon d\'opérer',
    badge: 'Le concept',
    quote: '« Le chirurgien du futur travaille avec des robots et l\'intelligence artificielle. Les robots peuvent réaliser une grande partie de l\'opération. Le médecin surveille le travail et peut intervenir si nécessaire. »',
    imageKey: 'robot',
    type: 'concept',
    items: [
      {
        badge: 'Chirurgie classique',
        title: 'Le médecin opérateur',
        description: 'Le chirurgien réalise chaque geste manuellement pendant plusieurs heures.',
      },
      {
        badge: 'Chirurgie du futur',
        title: 'Le médecin superviseur',
        description: 'Le robot exécute les gestes avec précision sous l\'œil attentif du médecin.',
      },
    ],
  },
  // SLIDE 3
  {
    id: 3,
    sectionNumber: '03 / 09',
    title: 'Comment ça fonctionne ?',
    subtitle: 'Les 5 étapes de l\'intervention',
    badge: 'Processus pas à pas',
    type: 'workflow',
    steps: WORKFLOW_PRESENTATION_STEPS,
  },
  // SLIDE 4
  {
    id: 4,
    sectionNumber: '04 / 09',
    title: 'Le rôle du médecin',
    subtitle: 'La supervision humaine indispensable',
    badge: 'Supervision',
    quote: '« Le médecin ne disparaît pas. Il surveille le robot et intervient si nécessaire. »',
    imageKey: 'doctor',
    type: 'doctor',
    items: [
      {
        title: 'Surveiller',
        description: 'Le médecin regarde le déroulement de l\'opération en temps réel sur ses écrans.',
        icon: 'Eye',
      },
      {
        title: 'Vérifier',
        description: 'Il vérifie les décisions du système et valide chaque étape critique.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Intervenir',
        description: 'Il peut reprendre le contrôle immédiat à tout moment en cas d\'imprévu.',
        icon: 'AlertTriangle',
      },
    ],
  },
  // SLIDE 5
  {
    id: 5,
    sectionNumber: '05 / 09',
    title: 'Le robot',
    subtitle: 'Capacités technologiques du système chirurgical',
    badge: 'Technologie',
    imageKey: 'robot',
    type: 'robot',
    items: [
      {
        title: 'Précision',
        description: 'Le robot peut faire des mouvements très précis et stables au micromètre.',
        icon: 'Target',
      },
      {
        title: 'Intelligence',
        description: 'L\'IA analyse les données du patient et adapte la trajectoire des instruments.',
        icon: 'Cpu',
      },
      {
        title: 'Surveillance',
        description: 'Le système surveille le patient et ses constantes vitales pendant l\'opération.',
        icon: 'Activity',
      },
      {
        title: 'Autonomie',
        description: 'Le robot peut réaliser certaines tâches simples et répétitives seul.',
        icon: 'Sparkles',
      },
    ],
  },
  // SLIDE 6
  {
    id: 6,
    sectionNumber: '06 / 09',
    title: 'Le bloc opératoire du futur',
    subtitle: 'Environnement immersif connecté',
    badge: 'Bloc opératoire',
    quote: '« Dans le futur, la salle d\'opération pourra utiliser des robots, des écrans et l\'intelligence artificielle. »',
    imageKey: 'panoramic',
    type: 'or',
    items: [
      {
        title: 'Robots articulés',
        description: 'Bras chirurgicaux autonomes positionnés au-dessus du patient.',
      },
      {
        title: 'Écrans de données',
        description: 'Visualisation 3D holographique des organes en direct.',
      },
      {
        title: 'Console de contrôle',
        description: 'Poste de télé-supervision pour le chirurgien en retrait.',
      },
    ],
  },
  // SLIDE 7
  {
    id: 7,
    sectionNumber: '07 / 09',
    title: 'Les avantages',
    subtitle: 'Ce qu\'apporte la chirurgie robotique assistée par IA',
    badge: 'Bénéfices',
    type: 'advantages',
    items: [
      {
        title: 'Précision',
        description: 'Des mouvements très précis sans fatigue ni tremblement.',
        icon: 'Target',
      },
      {
        title: 'Rapidité',
        description: 'Des opérations plus rapides et des gestes calculés au millimètre.',
        icon: 'Zap',
      },
      {
        title: 'Automatisation',
        description: 'Le robot peut réaliser certaines tâches seul pour soulager l\'équipe.',
        icon: 'Bot',
      },
      {
        title: 'Surveillance',
        description: 'Suivi continu des paramètres du patient en direct pendant l\'acte.',
        icon: 'Activity',
      },
    ],
  },
  // SLIDE 8
  {
    id: 8,
    sectionNumber: '08 / 09',
    title: 'Les limites',
    subtitle: 'Les défis éthiques, techniques et juridiques',
    badge: 'Points de vigilance',
    type: 'limits',
    items: [
      {
        title: 'Sécurité',
        description: 'Éviter les pannes, les bugs et garantir un système infaillible.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Responsabilité',
        description: 'Définir qui est responsable en cas d\'erreur : le médecin ou le concepteur de l\'IA ?',
        icon: 'Scale',
      },
      {
        title: 'Données médicales',
        description: 'Protéger la confidentialité et la sécurité des informations des patients.',
        icon: 'Lock',
      },
    ],
  },
  // SLIDE 9
  {
    id: 9,
    sectionNumber: '09 / 09',
    title: 'Conclusion',
    subtitle: 'La chirurgie de demain',
    badge: 'Synthèse finale',
    quote: '« Le médecin et le robot travailleront ensemble pour rendre les opérations plus précises et plus sûres. »',
    imageKey: 'conclusion',
    type: 'conclusion',
    items: [
      {
        title: 'Collaboration',
        description: 'L\'IA et le robot ne remplacent pas l\'humain : ils amplifient ses capacités.',
      },
      {
        title: 'Sécurité accrue',
        description: 'La double vérification machine + chirurgien diminue le risque d\'erreur.',
      },
      {
        title: 'Avenir prometteur',
        description: 'Une étape majeure pour rendre la chirurgie de pointe accessible.',
      },
    ],
  },
];

/**
 * Slide index helpers to support smooth keyboard and button navigation.
 */
export function getNextSlideIndex(currentIndex: number, totalSlides: number = PRESENTATION_SLIDES.length): number {
  if (currentIndex < totalSlides - 1) {
    return currentIndex + 1;
  }
  return currentIndex;
}

export function getPrevSlideIndex(currentIndex: number): number {
  if (currentIndex > 0) {
    return currentIndex - 1;
  }
  return 0;
}

export function clampSlideIndex(index: number, totalSlides: number = PRESENTATION_SLIDES.length): number {
  if (index < 0) return 0;
  if (index >= totalSlides) return totalSlides - 1;
  return index;
}
