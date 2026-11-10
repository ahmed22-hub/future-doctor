interface AdvantageCard {
  id: string;
  iconName: string;
  title: string;
  shortText: string;
  note: string;
}

const ADVANTAGES: AdvantageCard[] = [
  {
    id: 'precision',
    iconName: '🎯',
    title: 'Précision',
    shortText: 'Des mouvements très précis.',
    note: 'Le robot ne tremble pas.',
  },
  {
    id: 'automation',
    iconName: '🤖',
    title: 'Automatisation',
    shortText: 'Le robot peut réaliser certaines tâches seul.',
    note: 'Il aide sur les gestes répétitifs.',
  },
  {
    id: 'surveillance',
    iconName: '📡',
    title: 'Surveillance',
    shortText: 'Le patient est surveillé en continu.',
    note: 'Les constantes sont vérifiées en direct.',
  },
  {
    id: 'rapidity',
    iconName: '⚡',
    title: 'Rapidité',
    shortText: 'L\'IA peut analyser les informations rapidement.',
    note: 'Moins de temps perdu.',
  },
];

export default function AdvantagesSection() {
  return (
    <section id="avantages" className="py-24 bg-[#070b16] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Les avantages */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 6</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Les avantages
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed text-balance">
            Quatre points forts pour rendre les opérations plus sûres et plus efficaces.
          </p>
        </div>

        {/* 4 Advantages Grid with exact user requested texts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0a1020] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group"
            >
              <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110">
                {item.iconName}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>

              {/* Exact user requested short text */}
              <p className="text-base text-cyan-300 font-semibold leading-relaxed mb-4">
                « {item.shortText} »
              </p>

              <div className="pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
