"use client";

import { useLanguage } from '../context/LanguageContext';
import { PenLine, ShieldCheck } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col items-start justify-end min-h-[80vh] w-full select-none pl-8 md:pl-16">
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
      <h1 className="text-4xl md:text-5xl font-bold text-[#F4F4F4] text-left mb-4 font-outfit drop-shadow-lg">
        {t('home.title')}
      </h1>
      <p className="text-lg md:text-xl text-[#F4F4F4]/80 text-left max-w-2xl mb-8 font-poppins">
        {t('home.description')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          className="group relative px-8 py-4 rounded-xl font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 84, 97, 0.6) 0%, rgba(1, 135, 144, 0.4) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 183, 181, 0.3)',
            boxShadow: '0 0 20px rgba(0, 183, 181, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute inset-0 rounded-xl" style={{ boxShadow: 'inset 0 0 20px rgba(0, 183, 181, 0.1)' }} />
          <span className="relative flex items-center gap-2">
            <PenLine className="w-5 h-5" />
            {t('home.register')}
          </span>
        </button>
        <button 
          className="group relative px-8 py-4 rounded-xl font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 244, 244, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            {t('home.validate')}
          </span>
        </button>
      </div>
      <div className="flex flex-wrap gap-8 mt-12">
        <div>
          <p className="text-2xl font-bold text-[#F4F4F4]">10,000+</p>
          <p className="text-sm text-[#F4F4F4]/60">Certificates</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#F4F4F4]">500+</p>
          <p className="text-sm text-[#F4F4F4]/60">Institutions</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#F4F4F4]">50,000+</p>
          <p className="text-sm text-[#F4F4F4]/60">Validations</p>
        </div>
      </div>
    </main>
  );
}
