import { Quote } from 'lucide-react';

interface LimitItem {
  id: string;
  iconName: string;
  title: string;
  shortText: string;
  question: string;
}

const LIMITS: LimitItem[] = [
  {
    id: 'security',
    iconName: '🛡️',
    title: 'Sécurité',
    shortText: 'Le système doit être très fiable.',
    question: 'Le robot ne doit jamais tomber en panne pendant une opération.',
  },
  {
    id: 'liability',
    iconName: '⚖️',
    title: 'Responsabilité',
    shortText: 'Il faut savoir qui est responsable en cas de problème.',
    question: 'Est-ce la responsabilité du médecin, de l\'hôpital ou du fabricant ?',
  },
  {
    id: 'data',
    iconName: '🔐',
    title: 'Données',
    shortText: 'Les données médicales doivent rester protégées.',
    question: 'Les informations personnelles des patients doivent rester secrètes.',
  },
];

export default function EthicsSection() {
  return (
    <section id="ethique" className="py-24 bg-[#050811] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Les limites */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 7</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Les limites
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed text-balance">
            Trois questions importantes à poser lors d&apos;une présentation sur la chirurgie du futur.
          </p>
        </div>

        {/* Central Quote Callout */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0a1020] to-purple-950/30 border border-cyan-500/35 shadow-[0_0_35px_rgba(6,182,212,0.12)] mb-14 relative overflow-hidden">
          <Quote className="w-16 h-16 text-cyan-500/15 absolute -top-2 right-4 pointer-events-none" />
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed text-balance">
            « Plus les robots deviennent autonomes, plus la responsabilité humaine devient importante. »
          </blockquote>
          <div className="mt-4 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            Point clé à retenir pour la discussion
          </div>
        </div>

        {/* 3 Elements strictly requested: Sécurité, Responsabilité, Données */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIMITS.map((point) => (
            <div
              key={point.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#090e1f] border border-slate-800/90 hover:border-cyan-500/40 transition-colors shadow-md"
            >
              <div className="text-4xl mb-4">{point.iconName}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{point.title}</h3>
              <p className="text-base text-cyan-300 font-semibold leading-relaxed mb-3">
                « {point.shortText} »
              </p>
              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {point.question}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
