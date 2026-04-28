
"use client";

import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full select-none">
      <div className="flex items-center gap-2 mb-6">
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/80 backdrop-blur-md shadow flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center font-bold mr-1"
            style={{
              background: 'rgba(255,255,255,0.85)',
              color: '#222',
              borderRadius: '999px',
              padding: '0.15em 0.9em',
              fontSize: '0.85em',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.08)',
              letterSpacing: '0.04em',
            }}
          >
            {t('home.badge')}
          </span>
          {t('home.protocol')}
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#F4F4F4] text-center mb-8 font-outfit drop-shadow-lg">
        {t('home.title')}
      </h1>
      <p className="text-lg md:text-xl text-[#F4F4F4]/80 text-center max-w-2xl mb-12 font-poppins">
        {t('home.description')}
      </p>
    </main>
  );
}
