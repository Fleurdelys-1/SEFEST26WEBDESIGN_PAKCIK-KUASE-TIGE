"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();
  const sections = t("terms.sections");
  const sectionsArray = Array.isArray(sections) ? sections : [];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20">

      <motion.div
        className="w-full max-w-4xl mb-8"
        initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t("terms.backToHome")}
        </Link>
      </motion.div>

      <motion.div
        className="text-center mb-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F4F4F4] font-outfit mb-3 drop-shadow-lg">
          {t("terms.title")}
        </h1>
        <p className="text-sm text-[#F4F4F4]/50 font-poppins">
          {t("terms.lastUpdate")}, {t("terms.lastUpdatedDate")}
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl relative rounded-[48px] border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl overflow-hidden"
        initial={{ opacity: 0, y: 60, filter: "blur(16px)", scale: 0.96 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80" />

        <div className="relative z-10">
          <motion.p 
            className="text-[#F4F4F4]/65 text-sm sm:text-base leading-7 mb-8 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("terms.intro")}
          </motion.p>

          <motion.div 
            className="w-full h-px mb-8 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left" 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />

          <div className="space-y-8">
            {sectionsArray.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4 + i * 0.06,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-0.5 mt-1 self-stretch rounded-full"
                    style={{
                      background: "linear-gradient(180deg, #00B7B5, rgba(0,183,181,0.1))",
                      minHeight: "1.5rem",
                    }}
                  />
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#F4F4F4] font-outfit mb-2">
                      {section.title}
                    </h2>
                    <p className="text-sm sm:text-[15px] leading-7 text-[#F4F4F4]/60 font-poppins">
                      {section.content}
                    </p>
                  </div>
                </div>

                {i < sectionsArray.length - 1 && (
                  <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
