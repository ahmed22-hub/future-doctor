import { ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ConceptSectionProps {
  robotImage: string;
}

export default function ConceptSection({ robotImage }: ConceptSectionProps) {
  const stepsFlow = [
    { label: 'Médecin', sub: 'Surveille', icon: '👨‍⚕️' },
    { label: 'Vérification', sub: 'Donne son accord', icon: '🧠' },
    { label: 'IA', sub: 'Calcule le plan', icon: '🤖' },
    { label: 'Robot', sub: 'Fait les gestes', icon: '🦾' },
    { label: 'Opération', sub: 'Patient', icon: '🏥' },
  ];

  return (
    <section id="concept" className="py-24 bg-[#070b16] border-t border-cyan-900/30 relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Le métier */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 1</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-balance">
            Le métier
          </h2>
          {/* Exact requested text */}
          <p className="text-lg sm:text-2xl text-slate-100 font-normal leading-relaxed mb-4 text-balance">
            « Le chirurgien du futur travaille avec des robots et l&apos;intelligence artificielle. Les robots peuvent réaliser une grande partie de l&apos;opération. Le médecin surveille le travail et peut intervenir si nécessaire. »
          </p>
        </div>

        {/* The Simple Step Visual */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#0a1020] border border-cyan-500/25 shadow-[0_0_25px_rgba(6,182,212,0.08)]">
          <div className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-6 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-300">Comment se passe une opération</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-cyan-400 font-bold">Du médecin vers le robot</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {stepsFlow.map((step, idx) => (
              <div
                key={step.label}
                className="relative flex flex-col items-center text-center p-4 rounded-xl bg-[#060912] border border-slate-800 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{step.icon}</div>
                <div className="text-sm font-bold text-white mb-0.5">{step.label}</div>
                <div className="text-xs text-cyan-400 font-mono font-medium">{step.sub}</div>

                {idx < stepsFlow.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-cyan-400/70">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Large Visual Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-cyan-500/25 group bg-[#060912] shadow-xl">
            <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
              <img
                src={robotImage}
                alt="Bras robotique chirurgical autonome avec micro-scalpel de haute précision"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#070c18]/92 border border-cyan-500/30 p-4 sm:p-5 rounded-xl backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                <span className="font-bold uppercase tracking-wider">Le bras du robot</span>
                <span className="text-slate-400">Micro-instruments</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                Des instruments très petits pour opérer sans trembler et sans abîmer les tissus autour.
              </p>
            </div>
          </div>

          {/* Simple Comparison */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0a1020] border border-slate-800/90 shadow-md">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                Aujourd&apos;hui
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">
                Le médecin fait les gestes
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Le médecin contrôle les outils directement avec ses mains. Les robots actuels suivent ses mouvements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Dans le futur</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Le robot opère, le médecin surveille
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                L&apos;IA aide à préparer et guider les gestes. Le médecin supervise et prend les décisions importantes.
              </p>
            </div>

            {/* Note simple */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="font-semibold text-amber-300">À retenir pour l&apos;oral :</strong> C&apos;est une vision du futur. Aujourd&apos;hui, les robots ne font pas l&apos;opération tout seuls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
