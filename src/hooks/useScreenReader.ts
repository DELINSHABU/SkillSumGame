import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing screen reader announcements
 * Uses ARIA live regions to announce dynamic content changes
 */
export function useScreenReader() {
  const politeRegionRef = useRef<HTMLDivElement | null>(null);
  const assertiveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create polite live region (for non-critical updates)
    const politeRegion = document.createElement('div');
    politeRegion.setAttribute('role', 'status');
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.className = 'sr-only';
    document.body.appendChild(politeRegion);
    politeRegionRef.current = politeRegion;

    // Create assertive live region (for critical updates)
    const assertiveRegion = document.createElement('div');
    assertiveRegion.setAttribute('role', 'alert');
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.className = 'sr-only';
    document.body.appendChild(assertiveRegion);
    assertiveRegionRef.current = assertiveRegion;

    return () => {
      document.body.removeChild(politeRegion);
      document.body.removeChild(assertiveRegion);
    };
  }, []);

  /**
   * Announce a message to screen readers
   * @param message - The message to announce
   * @param priority - 'polite' for non-urgent, 'assertive' for urgent
   */
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const region = priority === 'assertive' ? assertiveRegionRef.current : politeRegionRef.current;
    
    if (region) {
      // Clear and then set the message to ensure it's announced
      region.textContent = '';
      setTimeout(() => {
        region.textContent = message;
      }, 100);
    }
  }, []);

  return { announce };
}
