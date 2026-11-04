import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PelvisTheorySection } from './components/PelvisTheorySection';
import { HistoryTimeline } from './components/HistoryTimeline';
import { YumeihoHeritage } from './components/YumeihoHeritage';
import { SomaticBreathingPlayer } from './components/SomaticBreathingPlayer';
import { TherapyRecoveryWizard } from './components/TherapyRecoveryWizard';
import { TherapeuticModulesSection } from './components/TherapeuticModulesSection';
import { KataAnatomyMatrix } from './components/KataAnatomyMatrix';
import { MeridianMap3D } from './components/MeridianMap3D';
import { KataTechniquesSection } from './components/KataTechniquesSection';
import { EducationPlatformSection } from './components/EducationPlatformSection';
import { TherapySection } from './components/TherapySection';
import { TrainingAcademySection } from './components/TrainingAcademySection';
import { YumeihoInsightsSection } from './components/YumeihoInsightsSection';
import { RepresentativeSection } from './components/RepresentativeSection';
import { TestimonialsAndCasesSection } from './components/TestimonialsAndCasesSection';
import { ContactAndEventsSection } from './components/ContactAndEventsSection';
import { DigitalZenGarden } from './components/DigitalZenGarden';
import { DigitalIncense } from './components/DigitalIncense';
import { TransformationMarquee } from './components/TransformationMarquee';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { NewsletterModal } from './components/NewsletterModal';
import { ScrollToTop } from './components/ScrollToTop';
import { SectionReveal } from './components/SectionReveal';
import { useDynamicSeo } from './hooks/useDynamicSeo';
import { useExitIntent } from './hooks/useExitIntent';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTab, setBookingTab] = useState<'therapy' | 'seminar'>('therapy');
  const [prefilledNote, setPrefilledNote] = useState('');
  const [prefilledSeminar, setPrefilledSeminar] = useState('');

  // Exit intent hook for newsletter subscription
  const { showExitModal, closeModal, triggerModal } = useExitIntent();

  // Dynamically update document <title>, <meta name="description">, OpenGraph, and JSON-LD structured data on scroll
  useDynamicSeo();

  // Scroll Progress Bar calculation with spring smoothing
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenBooking = (tab: 'therapy' | 'seminar' = 'therapy', noteOrSeminar?: string) => {
    setBookingTab(tab);
    if (tab === 'therapy') {
      setPrefilledNote(noteOrSeminar || '');
      setPrefilledSeminar('');
    } else {
      setPrefilledSeminar(noteOrSeminar || '');
      setPrefilledNote('');
    }
    setIsBookingOpen(true);
  };

  const handleNavigateToTest = () => {
    const el = document.getElementById('pelvis-felsefesi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 selection:bg-amber-900 selection:text-white relative transition-colors duration-300">
      {/* Subtle, slim scroll progress bar at the very top of the screen */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#8B261E] via-[#C49B66] to-[#8B261E] origin-left z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* 1. Top Bar Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Floating Top-Right Digital Incense (Senko) Micro-Interaction */}
      <DigitalIncense />

      {/* Main Content Sections with Staggered Framer Motion Scroll Entrance */}
      <main className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* 1. Hero Section */}
        <SectionReveal id="hero">
          <Hero
            onOpenBooking={handleOpenBooking}
            onNavigateToTest={handleNavigateToTest}
          />
        </SectionReveal>

        {/* 2. Pelvis Theory & Posture Self-Assessment */}
        <SectionReveal id="pelvis-felsefesi">
          <PelvisTheorySection
            onOpenBooking={(tab, note) => handleOpenBooking(tab, note)}
          />
        </SectionReveal>

        {/* 3. Interactive History & Growth Timeline (1978 Tokyo -> 2026 Turkey) */}
        <SectionReveal id="tarihce">
          <HistoryTimeline />
        </SectionReveal>

        {/* 3.5 Atmospheric Yumeiho Heritage Editorial Gallery */}
        <SectionReveal id="yumeiho-heritage">
          <YumeihoHeritage />
        </SectionReveal>

        {/* 4. Somatic Zen Breathing & 432Hz/528Hz Sound Player */}
        <SectionReveal id="somatic-breathing">
          <SomaticBreathingPlayer />
        </SectionReveal>

        {/* 5. Biomechanical Therapy Recovery Wizard */}
        <SectionReveal id="recovery-wizard">
          <TherapyRecoveryWizard
            onOpenBooking={(tab, note) => handleOpenBooking(tab, note)}
          />
        </SectionReveal>

        {/* 6. Therapeutic Modules (Anxiety, Stress, Confidence, Sleep) */}
        <SectionReveal id="terapotik-moduller">
          <TherapeuticModulesSection
            onOpenBooking={(tab, note) => handleOpenBooking(tab, note)}
          />
        </SectionReveal>

        {/* 7. 100 Kata Muscle & Spinal Anatomy Matrix */}
        <SectionReveal id="100-kata">
          <KataAnatomyMatrix />
        </SectionReveal>

        {/* 7.5 3D Interactive Meridian & Tsubo Map */}
        <SectionReveal id="meridian-map-3d">
          <MeridianMap3D />
        </SectionReveal>

        {/* 8. 100 Kata Technique Explorer */}
        <SectionReveal id="kata-techniques">
          <KataTechniquesSection />
        </SectionReveal>

        {/* 9. Education Platform (Beginner to Advanced, Breathing, Meditation, Principles) */}
        <SectionReveal id="egitim-platformu">
          <EducationPlatformSection
            onOpenBooking={(tab, seminar) => handleOpenBooking(tab, seminar)}
          />
        </SectionReveal>

        {/* 10. Clinical Therapy Sessions & Steps */}
        <SectionReveal id="terapi-seanslari">
          <TherapySection
            onOpenBooking={handleOpenBooking}
          />
        </SectionReveal>

        {/* 11. Training Academy & 1-5 Dan Certification System */}
        <SectionReveal id="egitim-akademisi">
          <TrainingAcademySection
            onOpenBooking={(tab, seminar) => handleOpenBooking(tab, seminar)}
          />
        </SectionReveal>

        {/* 12. Yumeiho Insights & Clinical Magazine Articles */}
        <SectionReveal id="yumeiho-insights">
          <YumeihoInsightsSection />
        </SectionReveal>

        {/* 13. Turkey Representative Ali Gökmen Düzgün Profile */}
        <SectionReveal id="temsilcimiz">
          <RepresentativeSection
            onOpenBooking={handleOpenBooking}
          />
        </SectionReveal>

        {/* 14. Clinical Case Studies & Quantified Outcomes */}
        <SectionReveal id="cases-testimonials">
          <TestimonialsAndCasesSection />
        </SectionReveal>

        {/* 15. User-Friendly Contact Form, Planned Events Calendar & FAQ */}
        <SectionReveal id="iletisim-etkinlikler">
          <ContactAndEventsSection
            onOpenBooking={(tab, noteOrTitle) => handleOpenBooking(tab, noteOrTitle)}
          />
        </SectionReveal>

        {/* 16. Yumeiho Transformation Outcomes Marquee */}
        <SectionReveal id="transformation-marquee">
          <TransformationMarquee />
        </SectionReveal>

        {/* 17. Procedural Digital Zen Garden (Sand Raking Micro-Interaction) */}
        <SectionReveal id="zen-garden">
          <DigitalZenGarden />
        </SectionReveal>
      </main>

      {/* Footer */}
      <Footer onOpenNewsletter={triggerModal} />

      {/* Exit Intent Newsletter Modal */}
      <NewsletterModal
        isOpen={showExitModal}
        onClose={closeModal}
      />

      {/* Interactive Booking & Enrollment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTab={bookingTab}
        prefilledNotes={prefilledNote}
        prefilledSeminar={prefilledSeminar}
      />

      {/* Minimalist Scroll-To-Top Button */}
      <ScrollToTop />
    </div>
  );
}

