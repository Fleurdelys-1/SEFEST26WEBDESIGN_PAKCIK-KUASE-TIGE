"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, CircleQuestionMark } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import BorderGlow from "../ui/card/BorderGlow";

export default function FAQ() {
  const { t } = useLanguage();
  const categories = t("faq.tabs") || [];
  const itemsByCategory = t("faq.items") || {};
  const defaultCategory = categories[0]?.key || "general";

  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const faqs = useMemo(
    () => itemsByCategory[activeCategory] || [],
    [activeCategory, itemsByCategory]
  );

  const currentFaq = faqs[activeIndex] || {};

  const badgeContainerVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 },
    },
  };

  const badgeContentVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const sectionTextVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 },
    },
  };

  const sectionItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const tabContainerVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 },
    },
  };

  const tabItemVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(7px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const listContainerVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(8px)',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardContentVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="faq" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-start pt-24 sm:pt-28 lg:pt-28 pb-16">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[40px] sm:rounded-t-[70px] lg:rounded-t-[100px]" />
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            className="flex justify-center mb-6 sm:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={badgeContainerVariants}
          >
            <motion.span
              className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-white/90 backdrop-blur-md shadow inline-flex items-center gap-2 mx-auto"
              style={{
                background: "rgba(0, 84, 97, 0.3)",
                border: "1px solid rgba(0, 183, 181, 0.4)",
                boxShadow: "0 0 20px rgba(0, 183, 181, 0.2)",
              }}
              variants={badgeContainerVariants}
            >
              <motion.span variants={badgeContentVariants} className="inline-flex items-center gap-2">
                <CircleQuestionMark className="w-4 h-4 text-[#F4F4F4]" />
                {t("faq.badge")}
              </motion.span>
            </motion.span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionTextVariants}
          >
            <motion.h2 variants={sectionItemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#F4F4F4] mb-4 font-outfit drop-shadow-lg">
              {t("faq.title")}
            </motion.h2>
            <motion.p variants={sectionItemVariants} className="text-center text-base sm:text-lg text-[#F4F4F4]/75 max-w-2xl mx-auto mb-12 font-poppins">
              {t("faq.subtitle")}
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-col gap-4 sm:gap-6 mb-10 justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={tabContainerVariants}
        >
          <motion.div variants={tabContainerVariants} className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            {categories.map((category) => {
              const isActive = activeCategory === category.key;
              return (
                <motion.button
                  variants={tabItemVariants}
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#F4F4F4]"
                      : "text-[#F4F4F4]/80 hover:text-[#F4F4F4]"
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md"
                        : "w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md"
                    }`}
                  />
                  <span className="relative z-10">{category.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.55fr)_minmax(320px,0.45fr)]">
          <div className="relative space-y-4 sm:space-y-6 pl-6">
            <div 
              className="absolute left-0 w-px bg-gradient-to-b from-cyan-300/70 via-white/0 to-cyan-300/70"
              style={{
                top: '1.5rem',
                height: `calc(100% - 3rem)`
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, amount: 0.1 }}
                variants={listContainerVariants}
                className="space-y-4 sm:space-y-6 w-full"
              >
                {faqs.map((faq, index) => {
                  const isOpen = index === activeIndex;
                  return (
                    <motion.button
                      variants={listItemVariants}
                      key={faq.question}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 transition duration-300 text-left ${
                        isOpen ? "shadow-[0_28px_100px_rgba(0,183,181,0.16)] bg-white/10" : "hover:border-cyan-300/30 hover:bg-white/10"
                      }`}
                      type="button"
                    >
                      <div className="flex w-full items-center justify-between gap-4 px-5 py-5">
                        <p className="text-base sm:text-lg font-semibold text-[#F4F4F4]">
                          {faq.question}
                        </p>
                        <ChevronDown
                          className={`h-5 w-5 text-[#F4F4F4] transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "-rotate-90" : "rotate-0"
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.article 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={cardContentVariants}
            className="relative rounded-[48px] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80" />
            <BorderGlow
              edgeSensitivity={30}
              glowColor="179 100 36"
              backgroundColor="transparent"
              borderRadius={48}
              glowRadius={40}
              glowIntensity={0.8}
              coneSpread={25}
              animated={false}
              colors={['#00B7B5', '#018790', '#005461']}
              className="relative p-8 h-full border-none"
            >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFaq.question}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col justify-start gap-4"
                  >
                    <div>
                      <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#F4F4F4] backdrop-blur-md border border-white/10">
                        {t("faq.badge")}
                      </span>
                      <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-[#F4F4F4]">
                        {currentFaq.question}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-[#F4F4F4]/70">
                        {currentFaq.answer}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
            </BorderGlow>
          </motion.article>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={cardContentVariants} 
            className="lg:col-span-2"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-[#F4F4F4]/70">
              <p className="font-medium text-[#F4F4F4] mb-2">Need more clarity?</p>
              <p>Tap another category or question to discover more about Certify’s validation flow, security, and web3-native design.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
