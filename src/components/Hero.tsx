import { ArrowDown, ShieldCheck, Cpu, Sparkles } from 'lucide-react';

interface HeroProps {
  heroImage: string;
  onStartPresentation?: () => void;
}

export default function Hero({ heroImage, onStartPresentation }: HeroProps) {
  const scrollToConcept = () => {
    const el = document.getElementById('concept');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#050811] tech-grid-bg">
      {/* Background ambient lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/12 to-purple-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-4 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-4 w-[350px] h-[350px] bg-purple-600/8 blur-[130px] pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6">
        {/* Academic Presentation Badges - Simple */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono tracking-wider mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            PROJET ÉTUDIANT
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300 font-medium">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            ROBOTS & INTELLIGENCE ARTIFICIELLE
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-400 italic hidden sm:inline text-[13px]">
            Une vision simple du métier médical de demain
          </span>
        </div>

        {/* Top Hero Badge */}
        <div className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]"></span>
          <span>MÉDECINE DU FUTUR · ROBOTS · IA</span>
        </div>

        {/* Hero Headline & Subtitle - Exact user requested text */}
        <div className="max-w-4xl space-y-4 mb-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] text-balance">
            Chirurgien <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent glow-text-cyan">
              du futur
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 font-light max-w-2xl leading-relaxed text-balance">
            « Dans le futur, les robots et l&apos;intelligence artificielle pourront aider à réaliser des opérations. »
          </p>
        </div>

        {/* Action Buttons: EXPLORER LE MÉTIER & MODE PRÉSENTATION */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {onStartPresentation && (
            <button
              type="button"
              onClick={onStartPresentation}
              className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-cyan-600 via-cyan-500 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] active:scale-95 cursor-pointer border border-cyan-400/40"
            >
              <span className="text-cyan-200 text-base animate-pulse">▶</span>
              <span>MODE PRÉSENTATION</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToConcept}
            className="group inline-flex items-center gap-3 px-6 py-4 text-sm font-bold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 rounded-xl hover:from-cyan-300 hover:to-cyan-100 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] active:scale-95 cursor-pointer"
          >
            <span>EXPLORER LE SITE</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1.5" />
          </button>

          <div className="inline-flex items-center gap-2.5 text-xs text-slate-300 font-mono bg-[#090e1e]/80 border border-cyan-500/25 px-4 py-3 rounded-xl backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Soutenance orale & Démo interactive</span>
          </div>
        </div>

        {/* Grand Hero Visual Showcase */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060a14] shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
          <div className="relative aspect-[16/9] w-full max-h-[640px] overflow-hidden">
            <img
              src={heroImage}
              alt="Bloc opératoire futuriste avec robot chirurgical autonome et télémétrie holographique sous supervision médicale"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Measured Scrim for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/30 to-transparent opacity-85" />

            {/* In-visual Floating Overlay with simplified text */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="bg-[#070c18]/90 border border-cyan-500/30 rounded-xl p-4 sm:p-5 backdrop-blur-md max-w-lg shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#06b6d4]"></span>
                  <span className="font-bold uppercase tracking-wider">Salle d&apos;opération du futur</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Le robot réalise les gestes chirurgicaux et le médecin surveille tout sur les écrans.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-300 bg-[#070c18]/90 border border-slate-800 px-4 py-3 rounded-xl backdrop-blur-md shadow-lg">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  Médecin toujours présent
                </span>
                <span aria-hidden="true" className="text-slate-600">|</span>
                <span className="text-cyan-300">Haute précision</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={scrollToConcept}
          className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 font-mono cursor-pointer group"
          aria-label="Faire défiler vers le métier"
        >
          <span>Découvrir la présentation</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
}
