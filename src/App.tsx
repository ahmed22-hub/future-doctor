import { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ConceptSection from './components/ConceptSection.tsx';
import WorkflowSection from './components/WorkflowSection.tsx';
import DoctorRoleSection from './components/DoctorRoleSection.tsx';
import RobotSection from './components/RobotSection.tsx';
import OperatingRoomSection from './components/OperatingRoomSection.tsx';
import AdvantagesSection from './components/AdvantagesSection.tsx';
import EthicsSection from './components/EthicsSection.tsx';
import ConclusionSection from './components/ConclusionSection.tsx';
import Footer from './components/Footer.tsx';
import PresentationMode from './components/PresentationMode.tsx';

import heroImage from './assets/images/hero_surgery_future_1794337129638.jpg';
import robotImage from './assets/images/robot_surgical_precision_1794337130471.jpg';
import scanImage from './assets/images/ai_scan_analysis_1794337131499.jpg';
import doctorImage from './assets/images/surgeon_supervisor_hud_1794337132890.jpg';
import panoramicImage from './assets/images/operating_room_panoramic_1794337132595.jpg';
import conclusionImage from './assets/images/future_surgery_vision_1794337827119.jpg';

// High-fidelity image assets bundled by Vite for production
const IMAGES = {
  hero: heroImage,
  robot: robotImage,
  scan: scanImage,
  doctor: doctorImage,
  panoramic: panoramicImage,
  conclusion: conclusionImage,
};

export default function App() {
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 🧭 Top Navigation with MODE PRÉSENTATION trigger */}
      <Navbar onStartPresentation={() => setIsPresentationOpen(true)} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <Hero
          heroImage={IMAGES.hero}
          onStartPresentation={() => setIsPresentationOpen(true)}
        />

        {/* 01 — LE CONCEPT */}
        <ConceptSection robotImage={IMAGES.robot} />

        {/* 02 — COMMENT ÇA FONCTIONNE */}
        <WorkflowSection scanImage={IMAGES.scan} />

        {/* 03 — LE RÔLE DU MÉDECIN */}
        <DoctorRoleSection doctorImage={IMAGES.doctor} />

        {/* 04 — LE ROBOT */}
        <RobotSection robotImage={IMAGES.robot} />

        {/* 05 — LE BLOC OPÉRATOIRE DU FUTUR */}
        <OperatingRoomSection panoramicImage={IMAGES.panoramic} />

        {/* 06 — AVANTAGES */}
        <AdvantagesSection />

        {/* 07 — LIMITES & ÉTHIQUE */}
        <EthicsSection />

        {/* 08 — CONCLUSION */}
        <ConclusionSection conclusionImage={IMAGES.conclusion} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* 🎤 FULLSCREEN INTERACTIVE PRESENTATION MODE */}
      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        images={IMAGES}
      />
    </div>
  );
}
