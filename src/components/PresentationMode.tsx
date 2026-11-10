import { useState, useEffect, useCallback, useId } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  AlertTriangle,
  Target,
  Cpu,
  Activity,
  Sparkles,
  Zap,
  Bot,
  ShieldAlert,
  Scale,
  Lock,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import {
  PRESENTATION_SLIDES,
  WORKFLOW_PRESENTATION_STEPS,
  getNextSlideIndex,
  getPrevSlideIndex,
} from '../utils/presentationData.ts';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  images: {
    hero: string;
    robot: string;
    scan: string;
    doctor: string;
    panoramic: string;
    conclusion: string;
  };
}

export default function PresentationMode({ isOpen, onClose, images }: PresentationModeProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0); // 0 to 4 for Slide 3
  const [isFullscreen, setIsFullscreen] = useState(false);
  const titleId = useId();

  // Helper to map image key to actual asset URL
  const getImage = useCallback(
    (key?: 'hero' | 'robot' | 'scan' | 'doctor' | 'panoramic' | 'conclusion') => {
      if (!key) return images.hero;
      return images[key] || images.hero;
    },
    [images]
  );

  // Fullscreen toggle
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch {
      // In iframe or sandboxed environments, fullscreen API might be restricted;
      // the presentation mode is already fixed inset-0 full viewport anyway!
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Slide navigation
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => getNextSlideIndex(prev, PRESENTATION_SLIDES.length));
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => getPrevSlideIndex(prev));
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < PRESENTATION_SLIDES.length) {
      setCurrentSlideIndex(index);
    }
  }, []);

  // Lock body scroll while in presentation mode
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in an input, do nothing
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        // Special case for Slide 3: allow stepping through the 5 workflow steps if desired
        if (currentSlideIndex === 2 && activeWorkflowStep < WORKFLOW_PRESENTATION_STEPS.length - 1 && e.key === ' ') {
          setActiveWorkflowStep((prev) => prev + 1);
        } else {
          goToNextSlide();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, activeWorkflowStep, goToNextSlide, goToPrevSlide, onClose, toggleFullscreen]);

  if (!isOpen) return null;

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const isLastSlide = currentSlideIndex === PRESENTATION_SLIDES.length - 1;
  const isFirstSlide = currentSlideIndex === 0;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050811] text-slate-100 flex flex-col justify-between overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Background futuristic grid & glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 🧭 TOP BAR: Status, Slide Title & Controls */}
      {/* ========================================================================= */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-cyan-500/20 bg-[#070c18]/90 backdrop-blur-md">
        {/* Brand & mode badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_10px_#06b6d4] animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white">
              Chirurgien <span className="text-cyan-400">du futur</span>
            </span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            ▶ Mode Présentation
          </span>
        </div>

        {/* Current Slide Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-500/30">
            Slide {String(currentSlideIndex + 1).padStart(2, '0')} / {String(PRESENTATION_SLIDES.length).padStart(2, '0')}
          </span>
          <span className="text-xs font-medium text-slate-300 hidden lg:inline-block max-w-xs truncate">
            — {currentSlide.title}
          </span>
        </div>

        {/* Top actions: Fullscreen & Exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 bg-[#0d1527] hover:bg-[#13203b] border border-cyan-500/25 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95"
            title="Activer ou quitter le plein écran"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-cyan-400" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Quitter plein écran' : 'Plein écran'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95"
            title="Quitter le mode présentation (Échap)"
          >
            <X className="w-4 h-4 text-red-300" />
            <span className="hidden sm:inline">Quitter</span>
            <kbd className="hidden md:inline text-[10px] bg-red-900/50 px-1 py-0.2 rounded border border-red-500/30 text-red-200">ESC</kbd>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 🖼️ SLIDE MAIN VIEWPORT */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        {/* Large Floating Side Arrows for effortless clicking during presentation */}
        <button
          type="button"
          onClick={goToPrevSlide}
          disabled={isFirstSlide}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-[#070c18]/80 hover:bg-cyan-950/90 border border-cyan-500/30 text-cyan-400 backdrop-blur-md transition-all shadow-xl active:scale-90 cursor-pointer ${
            isFirstSlide ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          }`}
          aria-label="Slide précédente"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <button
          type="button"
          onClick={goToNextSlide}
          disabled={isLastSlide}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-[#070c18]/80 hover:bg-cyan-950/90 border border-cyan-500/30 text-cyan-400 backdrop-blur-md transition-all shadow-xl active:scale-90 cursor-pointer ${
            isLastSlide ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          }`}
          aria-label="Slide suivante"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Dynamic Slide Content Container */}
        <div className="w-full max-w-6xl mx-auto">
          {/* ===================================================================== */}
          {/* SLIDE 1: HERO */}
          {/* ===================================================================== */}
          {currentSlide.type === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.25)] bg-[#070c18] group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getImage('hero')}
                    alt="Chirurgien du futur et robot opératoire"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-300 bg-[#050811]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-cyan-500/30">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Bloc chirurgical autonome & supervisé
                  </span>
                  <span className="text-slate-400 font-mono">Paris • Horizon futuriste</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>

                <h1 id={titleId} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  Chirurgien <span className="text-cyan-400 glow-text-cyan block">du futur</span>
                </h1>

                <p className="text-xl sm:text-2xl text-cyan-200 font-medium leading-snug border-l-4 border-cyan-400 pl-4 py-1 bg-cyan-950/20 rounded-r-xl">
                  {currentSlide.quote}
                </p>

                <div className="space-y-3 pt-2">
                  {currentSlide.items?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#090e1f] border border-cyan-500/20">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_#06b6d4]" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 2: LE MÉTIER */}
          {/* ===================================================================== */}
          {currentSlide.type === 'concept' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-[#070c18]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getImage('robot')}
                    alt="Robot chirurgical de précision"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#050811]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  Précision submillimétrique constante
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>

                <h2 id={titleId} className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Le métier
                </h2>

                <p className="text-lg sm:text-xl text-slate-200 leading-relaxed bg-[#090e1f] p-5 rounded-2xl border border-cyan-500/25">
                  {currentSlide.quote}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentSlide.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${
                        idx === 1
                          ? 'bg-cyan-950/40 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'bg-[#090e1f] border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/40 text-cyan-300 inline-block mb-2">
                        {item.badge}
                      </span>
                      <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 3: COMMENT ÇA FONCTIONNE ? (INTERACTIVE 5 STEPS) */}
          {/* ===================================================================== */}
          {currentSlide.type === 'workflow' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-cyan-500/20 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-1">
                    <span>✦ Section 2 • Présentation interactive</span>
                  </div>
                  <h2 id={titleId} className="text-3xl sm:text-4xl font-extrabold text-white">
                    Comment ça fonctionne ?
                  </h2>
                </div>
                <div className="text-xs font-mono text-slate-300 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                  Cliquez sur chaque étape pour changer l&apos;image et l&apos;explication
                </div>
              </div>

              {/* 5 Step Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {WORKFLOW_PRESENTATION_STEPS.map((step, idx) => {
                  const isActive = activeWorkflowStep === idx;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveWorkflowStep(idx)}
                      className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-950/90 to-cyan-900/60 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]'
                          : 'bg-[#090e1f] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0c142b]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                          ÉTAPE {step.number} / 5
                        </span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />}
                      </div>
                      <div className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {step.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Display Container: Big image on Left + Text on Right */}
              {(() => {
                const currentStepData = WORKFLOW_PRESENTATION_STEPS[activeWorkflowStep];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#070c1a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    {/* Big Image on Left */}
                    <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-cyan-500/30 bg-[#050811] shadow-2xl group">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          key={currentStepData.imageKey}
                          src={getImage(currentStepData.imageKey)}
                          alt={currentStepData.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-[#050811]/90 border border-cyan-500/40 px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-xs font-mono text-cyan-300 font-bold">
                          Étape {currentStepData.number} / 5 en direct
                        </span>
                      </div>
                    </div>

                    {/* Content on Right */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase">
                        <span>Étape {currentStepData.number} sur 5</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {currentStepData.title}
                      </h3>

                      <p className="text-lg text-cyan-300 font-bold leading-relaxed border-l-4 border-cyan-400 pl-4 py-1 bg-cyan-950/20 rounded-r-lg">
                        « {currentStepData.shortText} »
                      </p>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-[#050811] p-4 rounded-xl border border-slate-800">
                        {currentStepData.explanation}
                      </p>

                      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-transparent border border-cyan-500/30 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                            Point important pour l&apos;oral
                          </div>
                          <div className="text-base font-bold text-white">
                            {currentStepData.keyPoint}
                          </div>
                        </div>
                        {activeWorkflowStep < 4 ? (
                          <button
                            type="button"
                            onClick={() => setActiveWorkflowStep((prev) => prev + 1)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Suivante</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Cycle complet
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 4: LE RÔLE DU MÉDECIN */}
          {/* ===================================================================== */}
          {currentSlide.type === 'doctor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-[#070c18]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getImage('doctor')}
                    alt="Médecin supervisant une opération robotique"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#050811]/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center justify-between">
                  <span>Console de supervision en retrait</span>
                  <span className="text-emerald-400 font-bold">● Contrôle total</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>

                <h2 id={titleId} className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Le rôle du médecin
                </h2>

                <p className="text-lg sm:text-xl text-cyan-200 font-medium leading-relaxed bg-[#090e1f] p-5 rounded-2xl border border-cyan-500/25">
                  {currentSlide.quote}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {currentSlide.items?.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#090e1f] border border-cyan-500/25 hover:border-cyan-400 transition-colors">
                      <div className="text-cyan-400 mb-2">
                        {item.icon === 'Eye' && <Eye className="w-6 h-6" />}
                        {item.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6" />}
                        {item.icon === 'AlertTriangle' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-300 leading-snug">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 5: LE ROBOT */}
          {/* ===================================================================== */}
          {currentSlide.type === 'robot' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-[#070c18]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getImage('robot')}
                    alt="Bras robotisé autonome de chirurgie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#050811]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  Système articulé multi-axes
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>

                <h2 id={titleId} className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Le robot
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentSlide.items?.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#090e1f] border border-cyan-500/20 hover:border-cyan-400 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                          {item.icon === 'Target' && <Target className="w-4 h-4" />}
                          {item.icon === 'Cpu' && <Cpu className="w-4 h-4" />}
                          {item.icon === 'Activity' && <Activity className="w-4 h-4" />}
                          {item.icon === 'Sparkles' && <Sparkles className="w-4 h-4 text-purple-400" />}
                        </span>
                        <h4 className="text-base font-bold text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-snug">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 6: LE BLOC OPÉRATOIRE DU FUTUR */}
          {/* ===================================================================== */}
          {currentSlide.type === 'or' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-cyan-500/20 pb-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-1">
                    <span>✦ Section 5 • Immersion</span>
                  </div>
                  <h2 id={titleId} className="text-3xl sm:text-4xl font-extrabold text-white">
                    Le bloc opératoire du futur
                  </h2>
                </div>
                <p className="text-sm text-cyan-300 font-medium max-w-md">
                  {currentSlide.quote}
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] bg-[#070c18]">
                <div className="aspect-[21/9] sm:aspect-[16/8] overflow-hidden">
                  <img
                    src={getImage('panoramic')}
                    alt="Salle d'opération futuriste panoramique"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-70" />

                {/* 3 Hotspot Badges directly over or under panoramic view */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSlide.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#050811]/90 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 shadow-lg"
                    >
                      <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {item.title}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 7: LES AVANTAGES */}
          {/* ===================================================================== */}
          {currentSlide.type === 'advantages' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>
                <h2 id={titleId} className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Les avantages
                </h2>
                <p className="text-slate-300 text-sm sm:text-base">
                  Pourquoi utiliser des robots chirurgicaux autonomes assistés par l&apos;IA ?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {currentSlide.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#090e1f] border border-cyan-500/25 hover:border-cyan-400 transition-all flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        {item.icon === 'Target' && <Target className="w-6 h-6" />}
                        {item.icon === 'Zap' && <Zap className="w-6 h-6 text-amber-400" />}
                        {item.icon === 'Bot' && <Bot className="w-6 h-6 text-purple-400" />}
                        {item.icon === 'Activity' && <Activity className="w-6 h-6" />}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400/80">
                      Bénéfice n°{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 8: LES LIMITES */}
          {/* ===================================================================== */}
          {currentSlide.type === 'limits' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>
                <h2 id={titleId} className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Les limites
                </h2>
                <p className="text-slate-300 text-sm sm:text-base">
                  Les 3 grands défis à résoudre avant une adoption totale
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {currentSlide.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#090e1f] border border-amber-500/25 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                        {item.icon === 'ShieldAlert' && <ShieldAlert className="w-6 h-6" />}
                        {item.icon === 'Scale' && <Scale className="w-6 h-6" />}
                        {item.icon === 'Lock' && <Lock className="w-6 h-6" />}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400/80">
                      Défi majeur {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SLIDE 9: CONCLUSION */}
          {/* ===================================================================== */}
          {currentSlide.type === 'conclusion' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)] bg-[#070c18]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getImage('conclusion')}
                    alt="Vision future de la médecine et de la robotique"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#050811]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center justify-between">
                  <span>Présentation universitaire 2026</span>
                  <span className="text-emerald-400 font-bold">● Fin de présentation</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>✦</span>
                  <span>{currentSlide.badge}</span>
                </div>

                <h2 id={titleId} className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  La chirurgie <span className="text-cyan-400 glow-text-cyan">de demain</span>
                </h2>

                <p className="text-xl sm:text-2xl text-cyan-200 font-bold leading-relaxed border-l-4 border-cyan-400 pl-4 py-2 bg-cyan-950/30 rounded-r-2xl">
                  {currentSlide.quote}
                </p>

                <div className="space-y-2.5">
                  {currentSlide.items?.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#090e1f] border border-cyan-500/20 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final presentation actions */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentSlideIndex(0);
                      setActiveWorkflowStep(0);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer border border-slate-700 active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                    <span>Recommencer</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer active:scale-95"
                  >
                    <span>Quitter vers le site</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 🎮 BOTTOM BAR: Controls, Progress Indicator & Navigation */}
      {/* ========================================================================= */}
      <footer className="relative z-20 px-4 sm:px-8 py-3.5 border-t border-cyan-500/20 bg-[#070c18]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={goToPrevSlide}
              disabled={isFirstSlide}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase rounded-xl transition-all cursor-pointer active:scale-95 ${
                isFirstSlide
                  ? 'bg-slate-900/60 text-slate-600 border border-slate-800 cursor-not-allowed'
                  : 'bg-[#0d162a] text-cyan-300 hover:bg-cyan-950/80 border border-cyan-500/30 hover:border-cyan-400 shadow-md'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            {/* Mobile slide number */}
            <span className="sm:hidden text-xs font-mono font-bold text-cyan-400">
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(PRESENTATION_SLIDES.length).padStart(2, '0')}
            </span>

            {/* Next Button for mobile */}
            <button
              type="button"
              onClick={goToNextSlide}
              disabled={isLastSlide}
              className={`sm:hidden inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold tracking-wide uppercase rounded-xl transition-all cursor-pointer active:scale-95 ${
                isLastSlide
                  ? 'bg-slate-900/60 text-slate-600 border border-slate-800 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950'
              }`}
            >
              <span>Suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Progress Indicators (● ━━━━ ○ ━━━━ ○) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 hidden md:inline-block mr-2">
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(PRESENTATION_SLIDES.length).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-1 sm:gap-1.5">
              {PRESENTATION_SLIDES.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                const isPast = currentSlideIndex > idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    title={`Slide ${idx + 1}: ${slide.title}`}
                    className={`group relative flex items-center transition-all cursor-pointer p-1`}
                  >
                    <span
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-6 sm:w-8 bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
                          : isPast
                          ? 'w-2 sm:w-2.5 bg-cyan-700/70 group-hover:bg-cyan-500'
                          : 'w-2 sm:w-2.5 bg-slate-700 group-hover:bg-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Next Button & Keyboard tips */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-[11px] font-mono text-slate-400 hidden xl:flex items-center gap-2">
              <span>[ ← ] Précédent</span>
              <span>•</span>
              <span>[ Espace / → ] Suivant</span>
              <span>•</span>
              <span>[ Échap ] Quitter</span>
            </div>

            <button
              type="button"
              onClick={goToNextSlide}
              disabled={isLastSlide}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase rounded-xl transition-all cursor-pointer active:scale-95 ${
                isLastSlide
                  ? 'bg-slate-900/60 text-slate-600 border border-slate-800 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              }`}
            >
              <span>Suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
