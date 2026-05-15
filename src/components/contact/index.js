"use client";

import { Mail, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import BorderGlow from "../ui/card/BorderGlow";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("contact.errorName");
    if (!formData.email.trim()) newErrors.email = t("contact.errorEmail");
    if (!formData.message.trim()) newErrors.message = t("contact.errorMessage");
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => { setIsSubmitted(false); }, 3000);
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 } },
  };
  const badgeContentVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const sectionTextVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 } },
  };
  const sectionItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.15 } },
  };
  const cardItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-start pt-24 sm:pt-28 lg:pt-28 pb-16">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[40px] sm:rounded-t-[70px] lg:rounded-t-[100px]" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/*
          Layout strategy:
          - Mobile: badge+title (centered) → form → email card (stacked)
          - Desktop lg: LEFT col = badge+title+email card | RIGHT col = form
          We achieve this with a 2-col grid on lg where the left col contains
          the header + email card naturally, and the form is in the right col.
        */}

        {/* Mobile-only header (hidden on lg) */}
        <div className="flex flex-col items-center gap-4 mb-8 lg:hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={badgeContainerVariants}>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md"
              style={{ background: "rgba(0, 84, 97, 0.3)", border: "1px solid rgba(0, 183, 181, 0.4)", boxShadow: "0 0 20px rgba(0, 183, 181, 0.2)" }}
              variants={badgeContainerVariants}
            >
              <motion.span variants={badgeContentVariants} className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#F4F4F4]" />
                {t("contact.badge")}
              </motion.span>
            </motion.span>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionTextVariants} className="space-y-2 text-center">
            <motion.h2 variants={sectionItemVariants} className="text-3xl sm:text-4xl font-bold text-[#F4F4F4] leading-tight">{t("contact.title")}</motion.h2>
            <motion.p variants={sectionItemVariants} className="text-sm sm:text-base text-[#F4F4F4]/70 font-medium max-w-md mx-auto">{t("contact.subtitle")}</motion.p>
          </motion.div>
        </div>

        {/* Mobile: form first, then email card */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* Form */}
          <FormCard t={t} formData={formData} errors={errors} isLoading={isLoading} isSubmitted={isSubmitted} handleChange={handleChange} handleSubmit={handleSubmit} cardVariants={cardVariants} cardItemVariants={cardItemVariants} />
          {/* Email card */}
          <EmailCard t={t} cardVariants={cardVariants} cardItemVariants={cardItemVariants} />
        </div>

        {/* Desktop: 2-col grid */}
        <div className="hidden lg:grid lg:grid-cols-[0.45fr_0.55fr] gap-8 items-start">
          {/* Left col: header + email card */}
          <div className="space-y-8">
            {/* Desktop header */}
            <div className="space-y-5">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={badgeContainerVariants}>
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md"
                  style={{ background: "rgba(0, 84, 97, 0.3)", border: "1px solid rgba(0, 183, 181, 0.4)", boxShadow: "0 0 20px rgba(0, 183, 181, 0.2)" }}
                  variants={badgeContainerVariants}
                >
                  <motion.span variants={badgeContentVariants} className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#F4F4F4]" />
                    {t("contact.badge")}
                  </motion.span>
                </motion.span>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionTextVariants} className="space-y-3">
                <motion.h2 variants={sectionItemVariants} className="text-4xl md:text-5xl font-bold text-[#F4F4F4] leading-tight">{t("contact.title")}</motion.h2>
                <motion.p variants={sectionItemVariants} className="text-base text-[#F4F4F4]/70 font-medium max-w-xl">{t("contact.subtitle")}</motion.p>
              </motion.div>
            </div>
            {/* Email card */}
            <EmailCard t={t} cardVariants={cardVariants} cardItemVariants={cardItemVariants} />
          </div>

          {/* Right col: form */}
          <FormCard t={t} formData={formData} errors={errors} isLoading={isLoading} isSubmitted={isSubmitted} handleChange={handleChange} handleSubmit={handleSubmit} cardVariants={cardVariants} cardItemVariants={cardItemVariants} />
        </div>

      </div>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function EmailCard({ t, cardVariants, cardItemVariants }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 to-white/3 shadow-[0_40px_120px_rgba(0,0,0,0.15)] backdrop-blur-xl min-h-[200px] overflow-hidden relative hover:border-[#00B7B5]/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <BorderGlow
        edgeSensitivity={30}
        glowColor="179 100 36"
        backgroundColor="transparent"
        borderRadius={32}
        glowRadius={40}
        glowIntensity={0.8}
        coneSpread={25}
        animated={false}
        colors={['#00B7B5', '#018790', '#005461']}
        className="relative p-6 sm:p-8 h-full min-h-[200px] border-none flex flex-col justify-center gap-6"
      >
        <div className="relative z-10 space-y-6">
          <motion.div variants={cardItemVariants} className="flex items-center gap-4 sm:gap-6">
            <div className="inline-flex shrink-0 h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#00B7B5]/25 to-[#00B7B5]/10 border border-[#00B7B5]/40 shadow-lg shadow-[#00B7B5]/10 group-hover:shadow-[#00B7B5]/20 transition-all duration-300">
              <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-[#00B7B5]" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#F4F4F4]/50 font-semibold">{t("contact.emailLabel")}</p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#F4F4F4] break-all">{t("contact.manualEmail")}</p>
            </div>
          </motion.div>
          <motion.div variants={cardItemVariants} className="h-px bg-gradient-to-r from-[#00B7B5]/30 via-[#00B7B5]/10 to-transparent" />
        </div>
        <motion.div variants={cardItemVariants} className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00b7b5] animate-pulse shadow-[0_0_8px_#00b7b5]" />
            <p className="text-xs text-[#F4F4F4]/60">{t("contact.supportAvailable")}</p>
          </div>
          <p className="text-sm leading-relaxed text-[#F4F4F4]/50">{t("contact.supportDescription")}</p>
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
}

function FormCard({ t, formData, errors, isLoading, isSubmitted, handleChange, handleSubmit, cardVariants, cardItemVariants }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="relative rounded-[48px] border border-white/10 bg-white/5 p-6 sm:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80" />
      <div className="relative z-10 flex flex-col gap-6">
        <motion.div variants={cardItemVariants}>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F4]">{t("contact.formTitle")}</h3>
          <p className="mt-2 text-sm leading-6 text-[#F4F4F4]/70">{t("contact.formSubtitle")}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div key="loading"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }} transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center space-y-4 py-10"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30">
                <Loader2 className="h-8 w-8 text-cyan-300 animate-spin" />
              </div>
              <div><h4 className="text-lg font-semibold text-[#F4F4F4]">{t("contact.sendingTitle")}</h4>
                <p className="text-sm text-[#F4F4F4]/60">{t("contact.sendingSubtitle")}</p></div>
            </motion.div>
          )}
          {isSubmitted && !isLoading && (
            <motion.div key="success"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }} transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center space-y-4 py-10"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-green-400/10 border border-green-400/30">
                <CheckCircle className="h-8 w-8 text-green-300" />
              </div>
              <div><h4 className="text-lg font-semibold text-[#F4F4F4]">{t("contact.successTitle")}</h4>
                <p className="text-sm text-[#F4F4F4]/60">{t("contact.successSubtitle")}</p></div>
            </motion.div>
          )}
          {!isLoading && !isSubmitted && (
            <motion.form key="form"
              initial="hidden" animate="visible"
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)', transition: { duration: 0.4 } }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="space-y-4" onSubmit={handleSubmit}
            >
              <motion.div variants={cardItemVariants}>
                <span className="mb-1.5 block text-sm font-medium text-[#F4F4F4]/80">{t("contact.nameLabel")}</span>
                <input name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")}
                  className={`w-full rounded-3xl border ${errors.name ? 'border-red-500/70' : 'border-white/10'} bg-white/5 px-4 py-3 text-sm text-[#F4F4F4] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10`} />
                {errors.name && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
              </motion.div>
              <motion.div variants={cardItemVariants}>
                <span className="mb-1.5 block text-sm font-medium text-[#F4F4F4]/80">{t("contact.emailLabel2")}</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")}
                  className={`w-full rounded-3xl border ${errors.email ? 'border-red-500/70' : 'border-white/10'} bg-white/5 px-4 py-3 text-sm text-[#F4F4F4] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10`} />
                {errors.email && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
              </motion.div>
              <motion.div variants={cardItemVariants}>
                <span className="mb-1.5 block text-sm font-medium text-[#F4F4F4]/80">{t("contact.messageLabel")}</span>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder={t("contact.messagePlaceholder")}
                  className={`h-32 sm:h-36 w-full rounded-3xl border ${errors.message ? 'border-red-500/70' : 'border-white/10'} bg-white/5 px-4 py-3 text-sm text-[#F4F4F4] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10 resize-none`} />
                {errors.message && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><AlertCircle className="h-3.5 w-3.5" />{errors.message}</p>}
              </motion.div>
              <motion.div variants={cardItemVariants}>
                <button type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-[#F4F4F4] transition-all duration-200 hover:from-[#005461]/40 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  {t("contact.submit")}
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
