"use client";

import { useEffect } from 'react';

export default function ScrollHandler() {
  useEffect(() => {
    // Handle smooth scroll for hash in URL
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Remove hash from URL after scrolling
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname);
          }, 600); // Wait for smooth scroll to complete
        }
      }, 100);
    }
  }, []);

  return null;
}
