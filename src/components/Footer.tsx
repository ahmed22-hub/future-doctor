export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03050c] border-t border-cyan-900/30 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#06b6d4]" />
            <span className="font-bold text-white text-sm tracking-wider uppercase">
              Chirurgien <span className="text-cyan-400">du futur</span>
            </span>
            <span className="text-slate-600 mx-2">|</span>
            <span className="text-slate-400 font-mono">Présentation pour étudiants</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium text-slate-300">
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => scrollTo('concept')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Le métier
            </button>
            <button
              type="button"
              onClick={() => scrollTo('fonctionnement')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Fonctionnement
            </button>
            <button
              type="button"
              onClick={() => scrollTo('medecin')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Le médecin
            </button>
            <button
              type="button"
              onClick={() => scrollTo('robot')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Le robot
            </button>
            <button
              type="button"
              onClick={() => scrollTo('bloc-operatoire')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Bloc opératoire
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            Projet d&apos;étudiant · Présentation sur la chirurgie du futur et les robots
          </div>
          <div className="text-cyan-400/80">
            Facile à lire et à présenter à l&apos;oral
          </div>
        </div>
      </div>
    </footer>
  );
}
