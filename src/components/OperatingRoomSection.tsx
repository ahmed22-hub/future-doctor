import { useState } from 'react';
import { Layers } from 'lucide-react';

interface OperatingRoomSectionProps {
  panoramicImage: string;
}

interface RoomHotspot {
  id: string;
  title: string;
  desc: string;
  xPercent: number;
  yPercent: number;
}

const ROOM_HOTSPOTS: RoomHotspot[] = [
  {
    id: 'robots',
    title: 'Les bras du robot',
    desc: 'Accrochés au plafond, ils bougent tout autour de la table pour opérer facilement.',
    xPercent: 50,
    yPercent: 44,
  },
  {
    id: 'patient-pod',
    title: 'Le patient',
    desc: 'Installé sur la table dans un environnement propre et protégé.',
    xPercent: 52,
    yPercent: 62,
  },
  {
    id: 'screens',
    title: 'Les écrans de contrôle',
    desc: 'Ils montrent le corps du patient en 3D et les constantes vitales en direct.',
    xPercent: 24,
    yPercent: 52,
  },
  {
    id: 'ai-core',
    title: 'L\'ordinateur et l\'IA',
    desc: 'Le système calcule en direct pour aider le robot à faire les bons gestes.',
    xPercent: 12,
    yPercent: 48,
  },
  {
    id: 'supervisors',
    title: 'Le médecin qui surveille',
    desc: 'Il regarde les écrans et peut intervenir à tout moment si besoin.',
    xPercent: 74,
    yPercent: 56,
  },
  {
    id: 'surveillance-sys',
    title: 'La salle moderne',
    desc: 'Une pièce stérile avec un éclairage adapté et des capteurs partout.',
    xPercent: 36,
    yPercent: 65,
  },
];

export default function OperatingRoomSection({ panoramicImage }: OperatingRoomSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<RoomHotspot>(ROOM_HOTSPOTS[0]);

  return (
    <section id="bloc-operatoire" className="py-24 bg-[#050811] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Le bloc opératoire du futur */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
            <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 inline-block"></span>
            <span>Section 5</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Le bloc opératoire du futur
          </h2>
          {/* Exact requested text */}
          <p className="text-slate-200 text-lg sm:text-2xl font-normal text-balance">
            « Dans le futur, la salle d&apos;opération pourra utiliser des robots, des écrans et l&apos;intelligence artificielle. »
          </p>
        </div>

        {/* Hotspot quick selector buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5 font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Que voit-on dans la salle ?</span>
          </span>
          {ROOM_HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              type="button"
              onClick={() => setActiveHotspot(spot)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeHotspot.id === spot.id
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-[#090e1f] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {spot.title}
            </button>
          ))}
        </div>

        {/* Panoramic Visual */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060a14] shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden">
            <img
              src={panoramicImage}
              alt="Vue panoramique de la salle d'opération du futur avec robots, écrans et médecin"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-75" />

            {/* Interactive Pins on Image */}
            {ROOM_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspot(spot)}
                  style={{ top: `${spot.yPercent}%`, left: `${spot.xPercent}%` }}
                  aria-label={spot.title}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform hover:scale-125 cursor-pointer z-20 ${
                    isSelected
                      ? 'bg-cyan-400 text-black ring-4 ring-cyan-400/40 shadow-[0_0_15px_#06b6d4]'
                      : 'bg-[#050811]/85 text-cyan-400 border border-cyan-400/70 backdrop-blur-sm hover:bg-cyan-950'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                </button>
              );
            })}

            {/* Active Hotspot Floating Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 max-w-lg bg-[#070b16]/92 border border-cyan-500/40 p-4 sm:p-5 rounded-xl backdrop-blur-md shadow-2xl z-20">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 font-bold">
                Élément sélectionné
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {activeHotspot.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeHotspot.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
