"use client";

import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Layers, Zap, BadgeAlert } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: ShieldCheck,
      title: t('about.cards.secure.title'),
      description: t('about.cards.secure.description'),
    },
    {
      icon: Layers,
      title: t('about.cards.trust.title'),
      description: t('about.cards.trust.description'),
    },
    {
      icon: Zap,
      title: t('about.cards.instant.title'),
      description: t('about.cards.instant.description'),
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[100px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <span
              className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-white/90 backdrop-blur-md shadow flex items-center gap-2"
              style={{
                background: 'rgba(0, 84, 97, 0.3)',
                border: '1px solid rgba(0, 183, 181, 0.4)',
                boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
              }}
            >
              <BadgeAlert className="w-4 h-4" />
              {t('about.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F4] leading-tight">
            {t('about.title')}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#F4F4F4]/70 font-medium">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-lg mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="relative z-10 text-xl sm:text-2xl font-semibold text-[#F4F4F4] mb-3">
                  {card.title}
                </h3>
                <p className="relative z-10 text-sm sm:text-base leading-7 text-[#F4F4F4]/70">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
