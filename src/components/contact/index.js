"use client";

import { Mail, Sparkles, Send, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    
    setIsLoading(true);
    

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[100px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] items-start">
          <div className="space-y-10">
            <div className="space-y-6 max-w-2xl">
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md"
                style={{
                  background: "rgba(0, 84, 97, 0.3)",
                  border: "1px solid rgba(0, 183, 181, 0.4)",
                  boxShadow: "0 0 20px rgba(0, 183, 181, 0.2)",
                }}
              >
                <Mail className="h-4 w-4 text-[#F4F4F4]" />
                {t("contact.badge")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F4] leading-tight">
                {t("contact.title")}
              </h2>
              <p className="text-base sm:text-lg text-[#F4F4F4]/70 font-medium max-w-xl">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.15)] backdrop-blur-xl min-h-[320px] flex flex-col justify-between overflow-hidden relative hover:border-[#00B7B5]/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#00B7B5]/25 to-[#00B7B5]/10 border border-[#00B7B5]/40 shadow-lg shadow-[#00B7B5]/10 group-hover:shadow-[#00B7B5]/20 transition-all duration-300">
                  <Mail className="h-8 w-8 text-[#00B7B5] group-hover:text-[#00B7B5]/90 transition-colors" />
                </div>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#F4F4F4]/50 font-semibold">{t("contact.emailLabel")}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#F4F4F4] break-all">{t("contact.manualEmail")}</p>
                </div>

                <div className="h-px bg-gradient-to-r from-[#00B7B5]/30 via-[#00B7B5]/10 to-transparent" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-sm" />
                  <p className="text-xs text-[#F4F4F4]/60">24/7 Support Available</p>
                </div>
                <p className="text-sm leading-relaxed text-[#F4F4F4]/50">
                  Reach out to us anytime. We're here to help and answer any questions you might have.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[48px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl overflow-hidden min-h-[560px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#F4F4F4]">{t("contact.formTitle")}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#F4F4F4]/70">
                  {t("contact.formSubtitle")}
                </p>
              </div>

              {isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30">
                    <Loader2 className="h-10 w-10 text-cyan-300 animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-[#F4F4F4]">Sending your message...</h4>
                    <p className="text-sm text-[#F4F4F4]/60">Please wait while we process your request</p>
                  </div>
                </div>
              )}

              {isSubmitted && !isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-green-400/10 border border-green-400/30">
                    <CheckCircle className="h-10 w-10 text-green-300" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-[#F4F4F4]">Message sent successfully!</h4>
                    <p className="text-sm text-[#F4F4F4]/60">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {!isLoading && !isSubmitted && (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#F4F4F4]/80">{t("contact.namePlaceholder")}</span>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.namePlaceholder")}
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F4F4F4] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#F4F4F4]/80">{t("contact.emailPlaceholder")}</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.emailPlaceholder")}
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F4F4F4] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#F4F4F4]/80">{t("contact.messagePlaceholder")}</span>
                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.messagePlaceholder")}
                      className="h-40 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F4F4F4] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10 resize-none"
                    />
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md px-8 py-4 text-sm font-semibold text-[#F4F4F4] transition-all duration-200 hover:from-[#005461]/40 hover:to-[#F4F4F4]/30 hover:border-white/40 hover:shadow-xl hover:shadow-[#00B7B5]/25 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send className="h-4 w-4" />
                      {t("contact.submit")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
