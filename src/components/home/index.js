"use client";

import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, UserPlus } from 'lucide-react';
import RotatingText from '../ui/text/RotatingText'
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const glassVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { 
      opacity: 1, 
      backdropFilter: "blur(12px)", 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const badgeVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 30 } 
    }
  };

  const protocolVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 30 } 
    }
  };

  const titleVariants = {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rotatingTextWrapperVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <main id="home" className="flex flex-col items-start justify-start min-h-screen w-full select-none px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 sm:pt-40 md:pt-48 pb-16 lg:relative">
        <motion.div 
          className="flex items-center gap-2 mb-6 sm:mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span 
            className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/80 shadow flex items-center gap-2"
            variants={glassVariants}
          >
            <motion.span
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
              variants={badgeVariants}
            >
              {t('home.badge')}
            </motion.span>
            <motion.span variants={protocolVariants}>
              {t('home.protocol')}
            </motion.span>
          </motion.span>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F4F4F4] text-left mb-6 font-outfit drop-shadow-lg">
          <span className="block">
            <motion.span
              className="inline-flex overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              <span className="inline-block">{t('home.titleTop')}</span>
              <span className="inline-block">&nbsp;</span>
            </motion.span>
            <motion.span
              className="inline-flex overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={rotatingTextWrapperVariants}
            >
              <RotatingText
                texts={t('home.rotatingTexts')}
                mainClassName="inline-flex overflow-hidden"
                elementLevelClassName="inline-block"
                splitLevelClassName="overflow-hidden"
                staggerFrom="last"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                staggerDuration={0.025}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                splitBy="characters"
                auto
                loop
              />
            </motion.span>
          </span>
          <motion.span
            className="block"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            {t('home.titleBottom')}
          </motion.span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#F4F4F4]/80 text-left max-w-xl md:max-w-2xl mb-8 font-poppins">
          {t('home.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-[2rem] font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0, 183, 181, 0.12) 70%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 rounded-[2rem]" style={{ boxShadow: 'inset 0 0 30px rgba(255,255,255,0.14)' }} />
            <span className="absolute left-0 top-0 h-full w-0 transition-all duration-500 group-hover:w-full rounded-[2rem] pointer-events-none z-10" style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0, 183, 181, 0.12) 70%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.3)'}} />
            <span className="relative flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              {t('home.register')}
            </span>
          </button>
          <button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-[2rem] font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(244, 244, 244, 0.2)',
              boxShadow: '0 16px 30px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 rounded-[2rem]" style={{ boxShadow: 'inset 0 0 24px rgba(255,255,255,0.08)' }} />
            <span className="absolute left-0 top-0 h-full w-0 transition-all duration-500 group-hover:w-full rounded-[2rem] pointer-events-none z-10" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(244, 244, 244, 0.2)', boxShadow: '0 16px 30px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255,255,255,0.12)'}} />
            <span className="relative flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              {t('home.validate')}
            </span>
          </button>
        </div>
        <img src="/images/certify-3d.png" alt="Home Illustration" className="mt-16 lg:absolute lg:right-0 lg:top-0 lg:mt-0 w-full lg:w-4/5 lg:max-w-4xl max-w-3xl object-contain -z-10" />
      </main>
    </>
  );
}