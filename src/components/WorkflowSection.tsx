import { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';

interface WorkflowSectionProps {
  scanImage: string;
}

interface StepItem {
  number: string;
  iconName: string;
  title: string;
  shortText: string;
  explanation: string;
  keyPoint: string;
}

const STEPS: StepItem[] = [
  {
    number: '1',
    iconName: '🩻',
    title: 'Données du patient',
    shortText: 'Le robot reçoit les données du patient.',
    explanation: 'Le système utilise les scanners et les images 3D du patient avant de commencer.',
    keyPoint: 'Images et scans 3D',
  },
  {
    number: '2',
    iconName: '🧠',
    title: 'Analyse IA',
    shortText: 'L\'IA analyse les informations.',
    explanation: 'L\'intelligence artificielle repère les zones à opérer et les zones à protéger.',
    keyPoint: 'Analyse automatique',
  },
  {
    number: '3',
    iconName: '📋',
    title: 'Préparation',
    shortText: 'Le système prépare l\'opération.',
    explanation: 'Le logiciel calcule le trajet exact des instruments pour faire le moins de dégâts possible.',
    keyPoint: 'Plan de l\'opération',
  },
  {
    number: '4',
    iconName: '🦾',
    title: 'Gestes du robot',
    shortText: 'Le robot réalise les gestes chirurgicaux.',
    explanation: 'Les bras du robot coupent et recousent avec une précision impossible à la main.',
    keyPoint: 'Mouvements sans tremblement',
  },
  {
    number: '5',
    iconName: '👨‍⚕️',
    title: 'Surveillance',
    shortText: 'Le médecin surveille l\'opération.',
    explanation: 'Le chirurgien regarde les écrans et peut appuyer sur un bouton pour reprendre la main.',
    keyPoint: 'Médecin en contrôle',
  },
];

export default function WorkflowSection({ scanImage }: WorkflowSectionProps) {
  const [selectedStep, setSelectedStep] = useState(1); // default step 2

  const activeStep = STEPS[selectedStep];

  return (
    <section id="fonctionnement" className="py-24 bg-[#050811] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Comment ça fonctionne ? */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 2</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Comment ça fonctionne ?
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed text-balance">
            L&apos;opération se déroule en 5 étapes simples, du scan initial jusqu&apos;à la surveillance finale.
          </p>
        </div>

        {/* 5 Simple Steps Timeline */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#090e1f] border border-cyan-500/25 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Les 5 étapes de l&apos;opération
            </div>
            <div className="text-xs font-mono text-slate-400 hidden sm:block">
              Cliquez pour voir les détails
            </div>
          </div>

          {/* Connected Grid of 5 steps */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {STEPS.map((step, index) => {
              const isSelected = selectedStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setSelectedStep(index)}
                  className={`relative flex flex-col items-center text-center p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/60 border-2 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.35)] scale-105 z-10'
                      : 'bg-[#060914] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#080d1e]'
                  }`}
                >
                  <div className="text-3xl mb-2">{step.iconName}</div>
                  <div className="text-xs font-mono text-cyan-400 font-bold mb-1">
                    Étape {step.number}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-300 font-medium leading-snug">
                    {step.shortText}
                  </p>

                  {/* Connecting arrow */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 pointer-events-none z-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed View of Active Step */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070c1a] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Visual Scan Image */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-cyan-500/30 bg-[#050811] shadow-2xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={scanImage}
                alt="Image 3D du cerveau et des vaisseaux analysée par l'ordinateur"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Simple indicator */}
            <div className="absolute top-4 left-4 bg-[#050811]/90 border border-cyan-500/40 px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-2 shadow-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span className="text-xs font-mono text-cyan-300 font-semibold">Analyse des images en direct</span>
            </div>
          </div>

          {/* Active Step Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">{activeStep.iconName}</span>
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                  Étape {activeStep.number} sur 5
                </span>
                <h3 className="text-2xl font-bold text-white">{activeStep.title}</h3>
              </div>
            </div>

            {/* Exact short sentence */}
            <p className="text-lg text-cyan-300 font-semibold leading-relaxed">
              « {activeStep.shortText} »
            </p>

            <p className="text-base text-slate-300 leading-relaxed border-l-2 border-cyan-400 pl-4 py-1 bg-cyan-950/15 rounded-r-lg">
              {activeStep.explanation}
            </p>

            <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                Point important pour l&apos;oral
              </div>
              <div className="text-lg font-bold text-white">
                {activeStep.keyPoint}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Cliquez sur les 5 étapes ci-dessus pour expliquer le déroulement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
