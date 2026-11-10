/**
 * Protocole de supervision chirurgicale simplifié
 * Modélise la chaîne de décision : Médecin -> Validation -> IA -> Robot
 */

export interface SurgicalPhase {
  id: string;
  name: string;
  shortDesc: string;
  aiConfidence: number; // 0 to 100
  requiresDoctorValidation: boolean;
  status: 'pending' | 'in_progress' | 'awaiting_validation' | 'validated' | 'manual_override';
  safetyMarginMicrons: number;
}

export interface SupervisionState {
  currentPhaseIndex: number;
  phases: SurgicalPhase[];
  isManualOverride: boolean;
  totalInterventionsCount: number;
  lastActionMessage: string;
}

export const INITIAL_PHASES: SurgicalPhase[] = [
  {
    id: 'scan-mapping',
    name: '1. Analyse des images',
    shortDesc: 'Le système charge et analyse les scanners du patient',
    aiConfidence: 99.4,
    requiresDoctorValidation: false,
    status: 'validated',
    safetyMarginMicrons: 40,
  },
  {
    id: 'trajectory-planning',
    name: '2. Plan de l\'opération',
    shortDesc: 'L\'IA propose le chemin le plus sûr pour opérer',
    aiConfidence: 98.1,
    requiresDoctorValidation: true,
    status: 'awaiting_validation',
    safetyMarginMicrons: 25,
  },
  {
    id: 'robotic-resection',
    name: '3. Gestes du robot',
    shortDesc: 'Le robot réalise les gestes avec une grande précision',
    aiConfidence: 96.8,
    requiresDoctorValidation: true,
    status: 'pending',
    safetyMarginMicrons: 10,
  },
  {
    id: 'hemostasis-verification',
    name: '4. Surveillance finale',
    shortDesc: 'Vérification de l\'état du patient avant la fin',
    aiConfidence: 99.2,
    requiresDoctorValidation: true,
    status: 'pending',
    safetyMarginMicrons: 30,
  },
];

export function createInitialSupervisionState(): SupervisionState {
  return {
    currentPhaseIndex: 1,
    phases: JSON.parse(JSON.stringify(INITIAL_PHASES)),
    isManualOverride: false,
    totalInterventionsCount: 0,
    lastActionMessage: 'En attente de validation par le médecin.',
  };
}

/**
 * Le médecin valide la phase en cours pour autoriser l'action du robot
 */
export function validateCurrentPhase(state: SupervisionState): SupervisionState {
  if (state.isManualOverride) {
    return {
      ...state,
      lastActionMessage: 'Action refusée : le médecin est en contrôle manuel.',
    };
  }

  const currentPhase = state.phases[state.currentPhaseIndex];
  if (!currentPhase) return state;

  const updatedPhases = [...state.phases];
  updatedPhases[state.currentPhaseIndex] = {
    ...currentPhase,
    status: 'validated',
  };

  const nextIndex = state.currentPhaseIndex + 1;
  let nextMessage = '';

  if (nextIndex < updatedPhases.length) {
    updatedPhases[nextIndex] = {
      ...updatedPhases[nextIndex],
      status: updatedPhases[nextIndex].requiresDoctorValidation ? 'awaiting_validation' : 'in_progress',
    };
    nextMessage = `Étape "${currentPhase.name}" validée par le médecin. Passage à : ${updatedPhases[nextIndex].name}.`;
  } else {
    nextMessage = 'Opération terminée avec succès sous la surveillance du médecin.';
  }

  return {
    ...state,
    currentPhaseIndex: Math.min(nextIndex, updatedPhases.length - 1),
    phases: updatedPhases,
    lastActionMessage: nextMessage,
  };
}

/**
 * Le médecin reprend le contrôle en cas de problème
 */
export function triggerManualOverride(state: SupervisionState): SupervisionState {
  const updatedPhases = state.phases.map((p, idx) => {
    if (idx === state.currentPhaseIndex) {
      return { ...p, status: 'manual_override' as const };
    }
    return p;
  });

  return {
    ...state,
    isManualOverride: true,
    totalInterventionsCount: state.totalInterventionsCount + 1,
    phases: updatedPhases,
    lastActionMessage: '🚨 Arrêt d\'urgence : le médecin reprend le contrôle manuel.',
  };
}

/**
 * Le médecin réactive le mode autonome
 */
export function restoreAutonomousMode(state: SupervisionState): SupervisionState {
  const updatedPhases = state.phases.map((p, idx) => {
    if (idx === state.currentPhaseIndex && p.status === 'manual_override') {
      return { ...p, status: 'awaiting_validation' as const };
    }
    return p;
  });

  return {
    ...state,
    isManualOverride: false,
    phases: updatedPhases,
    lastActionMessage: 'Mode autonome réactivé sous la surveillance du médecin.',
  };
}
