import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PelvisTheorySection } from './components/PelvisTheorySection';
import { HistoryTimeline } from './components/HistoryTimeline';
import { TherapeuticModulesSection } from './components/TherapeuticModulesSection';
import { EducationPlatformSection } from './components/EducationPlatformSection';
import { TherapySection } from './components/TherapySection';
import { TrainingAcademySection } from './components/TrainingAcademySection';
import { KataTechniquesSection } from './components/KataTechniquesSection';
import { RepresentativeSection } from './components/RepresentativeSection';
import { TestimonialsAndCasesSection } from './components/TestimonialsAndCasesSection';
import { ContactAndEventsSection } from './components/ContactAndEventsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTab, setBookingTab] = useState<'therapy' | 'seminar'>('therapy');
  const [prefilledNote, setPrefilledNote] = useState('');
  const [prefilledSeminar, setPrefilledSeminar] = useState('');

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
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-900 selection:text-white relative">
      {/* Subtle, slim scroll progress bar at the very top of the screen */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#8B261E] via-[#C49B66] to-[#8B261E] origin-left z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* 1. Top Bar Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onNavigateToTest={handleNavigateToTest}
        />

        {/* 2. Pelvis Theory & Posture Self-Assessment */}
        <PelvisTheorySection
          onOpenBooking={(tab, note) => handleOpenBooking(tab, note)}
        />

        {/* 3. Interactive History & Growth Timeline (1978 Tokyo -> 2026 Turkey) */}
        <HistoryTimeline />

        {/* 4. Therapeutic Modules (Anxiety, Stress, Confidence, Sleep) */}
        <TherapeuticModulesSection
          onOpenBooking={(tab, note) => handleOpenBooking(tab, note)}
        />

        {/* 4. Education Platform (Beginner to Advanced, Breathing, Meditation, Principles) */}
        <EducationPlatformSection
          onOpenBooking={(tab, seminar) => handleOpenBooking(tab, seminar)}
        />

        {/* 5. Clinical Therapy Sessions & Steps */}
        <TherapySection
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Training Academy & 1-5 Dan Certification System */}
        <TrainingAcademySection
          onOpenBooking={(tab, seminar) => handleOpenBooking(tab, seminar)}
        />

        {/* 7. 100 Kata Technique Explorer */}
        <KataTechniquesSection />

        {/* 8. Turkey Representative Ali Gökmen Düzgün Profile */}
        <RepresentativeSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 9. Clinical Case Studies & Quantified Outcomes */}
        <TestimonialsAndCasesSection />

        {/* 10. User-Friendly Contact Form, Planned Events Calendar & FAQ */}
        <ContactAndEventsSection
          onOpenBooking={(tab, noteOrTitle) => handleOpenBooking(tab, noteOrTitle)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking & Enrollment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTab={bookingTab}
        prefilledNotes={prefilledNote}
        prefilledSeminar={prefilledSeminar}
      />

      {/* Minimalist Awwwards Scroll-To-Top Button (appears > 500px scroll) */}
      <ScrollToTop />
    </div>
  );
}
