"use client";

import { useEffect } from 'react';

export default function ScrollHandler() {
  useEffect(() => {
    
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname);
          }, 600); 
        }
      }, 100);
    }
  }, []);

  return null;
}
