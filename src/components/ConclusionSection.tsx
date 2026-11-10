import { ArrowUp } from 'lucide-react';

interface ConclusionSectionProps {
  conclusionImage: string;
}

export default function ConclusionSection({ conclusionImage }: ConclusionSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="conclusion" className="py-24 bg-[#050811] border-t border-cyan-900/30 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-600/12 via-blue-600/10 to-purple-600/8 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section 8 — Le futur */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-4">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 8</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Le futur
          </h2>
          {/* Exact requested text */}
          <p className="text-lg sm:text-2xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed text-balance">
            « Cette technologie n&apos;est pas encore totalement autonome. Mais dans le futur, les robots pourraient réaliser de plus en plus de tâches médicales. »
          </p>
        </div>

        {/* Large Final Visual Showcase with Conclusion Text */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060a14] shadow-[0_0_50px_rgba(6,182,212,0.18)] mb-12 max-w-5xl mx-auto group">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              src={conclusionImage}
              alt="Vision du chirurgien du futur aux côtés du robot chirurgical dans un hôpital moderne"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-6 rounded-xl bg-[#070b16]/92 border border-cyan-500/30 backdrop-blur-md shadow-2xl space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Conclusion
            </div>
            {/* Exact requested title and text */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              La chirurgie de demain
            </h3>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              « Le médecin et le robot travailleront ensemble pour rendre les opérations plus précises et plus sûres. »
            </p>
          </div>
        </div>

        {/* Return to Top Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl hover:from-cyan-300 hover:to-cyan-200 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-95 cursor-pointer"
          >
            <span>Retour en haut</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
}
