import { useEffect, useState } from 'react';

/**
 * Custom hook to detect exit intent when cursor leaves the viewport towards the top edge.
 * Fires only once per session if not previously dismissed.
 */
export function useExitIntent() {
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user already dismissed or submitted in this session
    const isDismissed = sessionStorage.getItem('yumeiho_newsletter_dismissed') === 'true';
    if (isDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Exit intent condition: cursor leaves top of window (clientY <= 10)
      if (e.clientY <= 10) {
        setShowExitModal(true);
        // Remove listener once triggered
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Delay adding listener by 3 seconds so fast mouse moves upon initial landing don't trigger it prematurely
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const closeModal = () => {
    setShowExitModal(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('yumeiho_newsletter_dismissed', 'true');
    }
  };

  const triggerModal = () => {
    setShowExitModal(true);
  };

  return {
    showExitModal,
    closeModal,
    triggerModal
  };
}
