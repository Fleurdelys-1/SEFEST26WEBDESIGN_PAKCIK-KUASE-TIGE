"use client";

import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Zap, FileLock2, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CountUp from '../ui/CountUp';
import GlareHover from '../ui/GlareHover';
import BorderGlow from '../ui/card/BorderGlow';

export default function About() {
  const { t } = useLanguage();
  const router = useRouter();

  const features = [
    {
      icon: ShieldCheck,
      title: t('about.cards.security.title'),
      description: t('about.cards.security.description'),
    },
    {
      icon: FileLock2,
      title: t('about.cards.tamper.title'),
      description: t('about.cards.tamper.description'),
    },
    {
      icon: Zap,
      title: t('about.cards.instant.title'),
      description: t('about.cards.instant.description'),
    },
    {
      icon: CheckCircle2,
      title: t('about.cards.trusted.title'),
      description: t('about.cards.trusted.description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="about" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 lg:pt-28 pb-16 flex flex-col items-center justify-start">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[40px] sm:rounded-t-[70px] lg:rounded-t-[100px]" />
      
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-start">
          
          {/* Left Column */}
          <motion.div 
            className="flex flex-col items-start space-y-6 sm:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md mx-auto sm:mx-0"
              style={{
                background: 'rgba(0, 84, 97, 0.3)',
                border: '1px solid rgba(0, 183, 181, 0.4)',
                boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
              }}
            >
              <Info className="h-4 w-4 text-[#F4F4F4]" />
              {t('about.badge')}
            </motion.span>

            <div className="space-y-4 w-full">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-bold text-[#F4F4F4] leading-[1.15] tracking-tight">
                <span>{t('about.title')}</span>
                <br />
                <span className="text-[#00B7B5]">{t('about.titleHighlight')}</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm sm:text-base text-[#F4F4F4]/70 font-medium max-w-xl leading-relaxed">
                {t('about.subtitle')}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 w-full mt-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4 items-start group">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-inner group-hover:border-cyan-400/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-[#F4F4F4] group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#F4F4F4] mb-1">{feature.title}</h4>
                    <p className="text-xs text-[#F4F4F4]/60 leading-relaxed pr-2">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.button 
              variants={itemVariants}
              onClick={() => router.push('/register')}
              className="group relative mt-2 px-6 sm:px-8 py-3 sm:py-4 rounded-[2rem] font-semibold text-[#F4F4F4] overflow-hidden transition-all duration-300 hover:scale-105"
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
                {t('about.register')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="flex flex-col gap-4 w-full mt-8 lg:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={statVariants} className="h-full">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="16px"
                  glareColor="#00B7B5"
                  className="shadow-xl backdrop-blur-xl hover:border-[#00B7B5]/30 transition-all duration-300"
                >
                  <div className="w-full h-full flex flex-col justify-center items-start p-5 sm:p-6 min-h-[110px] sm:min-h-[120px]">
                    <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#00B7B5] mb-1">
                      <CountUp from={0} to={parseInt(t('about.stats.satisfaction.value')) || 0} />
                      {t('about.stats.satisfaction.value').replace(/[0-9]/g, '')}
                    </h3>
                    <p className="text-xs text-[#F4F4F4]/70 font-medium">{t('about.stats.satisfaction.label')}</p>
                  </div>
                </GlareHover>
              </motion.div>
              
              <motion.div variants={statVariants} className="h-full">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="16px"
                  glareColor="#00B7B5"
                  className="shadow-xl backdrop-blur-xl hover:border-[#00B7B5]/30 transition-all duration-300"
                >
                  <div className="w-full h-full flex flex-col justify-center items-start p-5 sm:p-6 min-h-[110px] sm:min-h-[120px]">
                    <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#00B7B5] mb-1">
                      <CountUp from={0} to={parseInt(t('about.stats.active.value')) || 0} />
                      {t('about.stats.active.value').replace(/[0-9]/g, '')}
                    </h3>
                    <p className="text-xs text-[#F4F4F4]/70 font-medium">{t('about.stats.active.label')}</p>
                  </div>
                </GlareHover>
              </motion.div>

              <motion.div variants={statVariants} className="h-full">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="16px"
                  glareColor="#00B7B5"
                  className="shadow-xl backdrop-blur-xl hover:border-[#00B7B5]/30 transition-all duration-300"
                >
                  <div className="w-full h-full flex flex-col justify-center items-start p-5 sm:p-6 min-h-[110px] sm:min-h-[120px]">
                    <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#00B7B5] mb-1">
                      <CountUp from={0} to={parseInt(t('about.stats.experience.value')) || 0} />
                      {t('about.stats.experience.value').replace(/[0-9]/g, '')}
                    </h3>
                    <p className="text-xs text-[#F4F4F4]/70 font-medium">{t('about.stats.experience.label')}</p>
                  </div>
                </GlareHover>
              </motion.div>

              <motion.div variants={statVariants} className="h-full">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="16px"
                  glareColor="#00B7B5"
                  className="shadow-xl backdrop-blur-xl hover:border-[#00B7B5]/30 transition-all duration-300"
                >
                  <div className="w-full h-full flex flex-col justify-center items-start p-5 sm:p-6 min-h-[110px] sm:min-h-[120px]">
                    <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#00B7B5] mb-1">
                      <CountUp from={0} to={parseInt(t('about.stats.records.value')) || 0} />
                      {t('about.stats.records.value').replace(/[0-9]/g, '')}
                    </h3>
                    <p className="text-xs text-[#F4F4F4]/70 font-medium">{t('about.stats.records.label')}</p>
                  </div>
                </GlareHover>
              </motion.div>
            </div>

            <motion.div variants={statVariants} className="group rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <BorderGlow
                edgeSensitivity={30}
                glowColor="179 100 36"
                backgroundColor="transparent"
                borderRadius={24}
                glowRadius={40}
                glowIntensity={0.8}
                coneSpread={25}
                animated={false}
                colors={['#00B7B5', '#018790', '#005461']}
                className="relative p-6 sm:p-8 h-full border-none flex flex-col justify-center"
              >
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F4] mb-3">{t('about.vision.title')}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#F4F4F4]/60">
                    {t('about.vision.description')}
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
