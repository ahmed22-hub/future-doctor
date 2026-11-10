import { useState } from 'react';
import { CheckCircle2, ShieldAlert, Activity, RotateCcw } from 'lucide-react';
import {
  createInitialSupervisionState,
  validateCurrentPhase,
  triggerManualOverride,
  restoreAutonomousMode,
} from '../utils/supervisionProtocol.ts';

interface DoctorRoleSectionProps {
  doctorImage: string;
}

export default function DoctorRoleSection({ doctorImage }: DoctorRoleSectionProps) {
  const [protocolState, setProtocolState] = useState(createInitialSupervisionState());

  const handleValidate = () => {
    setProtocolState((prev) => validateCurrentPhase(prev));
  };

  const handleOverride = () => {
    setProtocolState((prev) => triggerManualOverride(prev));
  };

  const handleRestore = () => {
    setProtocolState((prev) => restoreAutonomousMode(prev));
  };

  const currentPhase = protocolState.phases[protocolState.currentPhaseIndex];

  return (
    <section id="medecin" className="py-24 bg-[#070b16] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Le rôle du médecin */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 3</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-balance">
            Le rôle du médecin
          </h2>
          {/* Exact requested text */}
          <p className="text-lg sm:text-2xl text-slate-100 font-normal leading-relaxed text-balance">
            « Le médecin ne disparaît pas. Il surveille le robot et intervient si nécessaire. »
          </p>
        </div>

        {/* 3 Pillars strictly requested: Surveiller, Vérifier, Intervenir */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* 1. Surveiller */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a1020] border border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👁️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Surveiller</h3>
            <p className="text-base text-slate-200 leading-relaxed font-medium">
              Le médecin regarde le déroulement de l&apos;opération.
            </p>
          </div>

          {/* 2. Vérifier */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a1020] border border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✅</div>
            <h3 className="text-2xl font-bold text-white mb-3">Vérifier</h3>
            <p className="text-base text-slate-200 leading-relaxed font-medium">
              Il vérifie les décisions du système.
            </p>
          </div>

          {/* 3. Intervenir */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a1020] border border-rose-500/30 hover:border-rose-400 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)] transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚨</div>
            <h3 className="text-2xl font-bold text-white mb-3">Intervenir</h3>
            <p className="text-base text-slate-200 leading-relaxed font-medium">
              Il peut reprendre le contrôle en cas de problème.
            </p>
          </div>
        </div>

        {/* Doctor Console Visual & Interactive Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070c1a] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Large Image of Supervising Doctor */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-cyan-500/30 bg-[#050811] shadow-2xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={doctorImage}
                alt="Chirurgien devant son écran de contrôle pour surveiller le robot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-65" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-[#050811]/92 border border-cyan-500/30 p-4 rounded-xl backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="font-bold uppercase tracking-wider">Le médecin aux commandes</span>
                <span className="text-slate-400">Poste de contrôle</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Le médecin valide chaque étape importante sur son écran avant que le robot ne bouge.
              </p>
            </div>
          </div>

          {/* Interactive Protocol Control Simulation with Simple Text */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-1">
                Exemple pratique pour l&apos;oral
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Tester le rôle du médecin
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Appuyez sur les boutons pour valider une étape ou pour simuler un arrêt d&apos;urgence.
              </p>
            </div>

            {/* Current Phase Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#050811] border border-slate-800 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Étape en cours</span>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-md font-bold ${
                    protocolState.isManualOverride
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : currentPhase.status === 'validated'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  }`}
                >
                  {protocolState.isManualOverride
                    ? 'LE MÉDECIN A REPRIS LA MAIN'
                    : currentPhase.status === 'validated'
                    ? 'ÉTAPE VALIDÉE'
                    : 'EN ATTENTE DU MÉDECIN'}
                </span>
              </div>

              <div>
                <div className="text-base sm:text-lg font-bold text-white">{currentPhase.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{currentPhase.shortDesc}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Confiance du robot :</span>
                  <span className="text-cyan-300 font-bold">{currentPhase.aiConfidence}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rôle humain :</span>
                  <span className="text-slate-200 font-bold">Vérification</span>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-xs font-mono text-slate-200 p-3 rounded-lg bg-[#050811] border border-cyan-500/20 flex items-start gap-2.5">
              <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{protocolState.lastActionMessage}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!protocolState.isManualOverride ? (
                <>
                  <button
                    type="button"
                    onClick={handleValidate}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valider l&apos;étape</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOverride}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-rose-300 bg-rose-950/40 border border-rose-500/40 hover:bg-rose-900/60 rounded-xl transition-colors cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Reprendre la main</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleRestore}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/60 rounded-xl transition-colors cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rallumer le mode autonome</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
