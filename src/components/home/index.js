"use client";

import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, SquarePen } from 'lucide-react';
import RotatingText from '../ui/text/rotating-text'
import { motion, useAnimation } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';



export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const imgWrapperRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const floatControls = useAnimation();

  useEffect(() => {
    (async () => {
      await floatControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.9, ease: "easeOut" },
      });
      floatControls.start({
        y: [0, -18, 0],
        transition: {
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    })();
  }, [floatControls]);

  const handleMouseMove = useCallback((e) => {
    const rect = imgWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -14, y: dx * 14 });
    setShinePos({ x: (dx + 1) * 50, y: (dy + 1) * 50 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
  }, []);

  const handleRegister = () => {
    router.push('/register');
  };

  const handleValidate = () => {
    const element = document.getElementById('validation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 }
    }
  };

  const glassVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(12px)", transition: { duration: 0.6, ease: "easeOut" } }
  };

  const badgeVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 30 } }
  };

  const protocolVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 30 } }
  };

  const titleVariants = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const rotatingTextWrapperVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const buttonContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const imageVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
  };

  const buttonVariants = {
    hidden: { y: -24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <main id="home" className="relative flex flex-col items-start justify-start lg:justify-center min-h-screen w-full select-none px-4 sm:px-6 lg:px-8 xl:px-12 pt-28 sm:pt-32 md:pt-36 pb-16 lg:pb-36">
        <motion.div
          className="flex items-center gap-2 mb-7 sm:mb-8"
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
        <h1 className="text-[clamp(1.4rem,6.5vw,1.875rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F4F4F4] text-left mb-5 sm:mb-6 font-outfit drop-shadow-lg leading-tight">
          <span className="block whitespace-nowrap">
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
                elementLevelClassName="inline-block text-[#00B7B5]"
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
            className="block whitespace-nowrap"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            {t('home.titleBottom')}
          </motion.span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#F4F4F4]/80 text-left max-w-sm sm:max-w-xl md:max-w-2xl mb-7 sm:mb-8 font-poppins leading-relaxed">
          {t('home.description').split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial="hidden"
          animate="visible"
          variants={buttonContainerVariants}
        >
          <motion.button
            onClick={handleRegister}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-[2rem] font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
            variants={buttonVariants}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0, 183, 181, 0.12) 70%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 rounded-[2rem]" style={{ boxShadow: 'inset 0 0 30px rgba(255,255,255,0.14)' }} />
            <span className="absolute left-0 top-0 h-full w-0 transition-all duration-500 group-hover:w-full rounded-[2rem] pointer-events-none z-10" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0, 183, 181, 0.12) 70%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.3)' }} />
            <span className="relative z-20 flex items-center gap-2">
              <SquarePen className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {t('home.register')}
            </span>
          </motion.button>
          <motion.button
            onClick={handleValidate}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-[2rem] font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
            variants={buttonVariants}
            style={{
              background: 'rgba(20, 20, 20, 0.4)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 rounded-[2rem]" style={{ boxShadow: 'inset 0 0 30px rgba(255,255,255,0.14)' }} />
            <span className="absolute left-0 top-0 h-full w-0 transition-all duration-500 group-hover:w-full rounded-[2rem] pointer-events-none z-10" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0, 183, 181, 0.12) 70%, rgba(255,255,255,0.08) 100%)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.3)' }} />
            <span className="relative z-20 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {t('home.validate')}
            </span>
          </motion.button>
        </motion.div>
        <motion.div
          ref={imgWrapperRef}
          className="hidden lg:block lg:absolute lg:right-[-100px] lg:top-0 lg:w-4/5 lg:max-w-4xl -z-10"
          initial={{ y: 40, opacity: 0 }}
          animate={floatControls}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: isHovered
                ? "radial-gradient(ellipse at 50% 60%, rgba(0,183,181,0.45) 0%, transparent 70%)"
                : "radial-gradient(ellipse at 50% 60%, rgba(0,183,181,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
              transition: "background 0.5s ease",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.04 : 1})`,
              transition: isHovered
                ? "transform 0.12s cubic-bezier(0.23, 1, 0.32, 1)"
                : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
              transformStyle: "preserve-3d",
              position: "relative",
              zIndex: 2,
              willChange: "transform",
            }}
          >
            <img
              src="/images/certify-3d.png"
              alt="Home Illustration"
              className="w-full h-full object-contain"
              draggable={false}
              style={{ userSelect: "none", display: "block" }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,${isHovered ? 0.13 : 0}) 0%, transparent 55%)`,
                transition: isHovered ? "background 0.05s linear" : "background 0.6s ease",
                pointerEvents: "none",
                borderRadius: "inherit",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </motion.div>
      </main>
    </>
  );
}