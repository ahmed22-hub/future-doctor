import { useState } from 'react';
import { Target, Zap, ShieldCheck } from 'lucide-react';

interface RobotSectionProps {
  robotImage: string;
}

interface RobotCard {
  id: string;
  iconName: string;
  title: string;
  shortText: string;
  detail: string;
}

const ROBOT_CARDS: RobotCard[] = [
  {
    id: 'precision',
    iconName: '🎯',
    title: 'Précision',
    shortText: 'Le robot peut faire des mouvements très précis.',
    detail: 'Il ne tremble jamais et peut faire des gestes de quelques micromètres seulement.',
  },
  {
    id: 'intelligence',
    iconName: '🧠',
    title: 'Intelligence',
    shortText: 'L\'IA analyse les données du patient.',
    detail: 'L\'ordinateur étudie les images du corps pour trouver le meilleur chemin.',
  },
  {
    id: 'surveillance',
    iconName: '📡',
    title: 'Surveillance',
    shortText: 'Le système surveille le patient pendant l\'opération.',
    detail: 'Des capteurs vérifient le cœur, la respiration et les tissus à chaque seconde.',
  },
  {
    id: 'autonomie',
    iconName: '⚡',
    title: 'Autonomie',
    shortText: 'Le robot peut réaliser certaines tâches seul.',
    detail: 'Il peut faire des gestes répétitifs comme recoudre ou couper une zone définie.',
  },
];

export default function RobotSection({ robotImage }: RobotSectionProps) {
  const [activeCard, setActiveCard] = useState(ROBOT_CARDS[0]);

  return (
    <section id="robot" className="py-24 bg-[#050811] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Le robot */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 4</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Le robot
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed text-balance">
            Quatre capacités clés qui rendent le robot chirurgical performant.
          </p>
        </div>

        {/* 4 Feature Cards with exact user requested texts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {ROBOT_CARDS.map((item) => {
            const isSelected = activeCard.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCard(item)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/50 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]'
                    : 'bg-[#090e1f] border border-slate-800/90 hover:border-cyan-500/40 hover:bg-[#0c1428]'
                }`}
              >
                <div className="text-4xl mb-3">{item.iconName}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-cyan-300 font-medium leading-relaxed mb-2">
                  {item.shortText}
                </p>
                <p className="text-xs text-slate-400 leading-normal">
                  {item.detail}
                </p>
              </button>
            );
          })}
        </div>

        {/* Central Visual Focus */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060a14] shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={robotImage}
              alt="Gros plan sur les bras du robot chirurgical avec micro-outils et capteurs"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/30 to-transparent opacity-85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/80 via-transparent to-[#050811]/60" />
          </div>

          {/* Overlaid Active Feature Information */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="bg-[#070b16]/92 border border-cyan-500/35 p-5 rounded-xl backdrop-blur-md max-w-xl shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1.5 font-bold">
                <span>Capacité sélectionnée</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-white">{activeCard.title}</span>
              </div>
              <p className="text-base text-cyan-300 font-semibold mb-1">
                « {activeCard.shortText} »
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeCard.detail}
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-300 bg-[#070b16]/90 border border-slate-800 px-4 py-3 rounded-xl backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sécurité du matériel</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Gestes vérifiés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
