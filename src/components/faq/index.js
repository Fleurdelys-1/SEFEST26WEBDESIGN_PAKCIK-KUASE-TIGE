"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, CircleQuestionMark } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

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

  return (
    <section id="faq" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[100px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-6 sm:mb-8">
            <span
              className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-white/90 backdrop-blur-md shadow inline-flex items-center gap-2"
              style={{
                background: "rgba(0, 84, 97, 0.3)",
                border: "1px solid rgba(0, 183, 181, 0.4)",
                boxShadow: "0 0 20px rgba(0, 183, 181, 0.2)",
              }}
            >
              <CircleQuestionMark className="w-4 h-4 text-[#F4F4F4]" />
              {t("faq.badge")}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F4F4] leading-tight">
            {t("faq.title")}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#F4F4F4]/70 font-medium">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 mb-10 justify-center items-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            {categories.map((category) => {
              const isActive = activeCategory === category.key;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#F4F4F4]"
                      : "text-[#F4F4F4]/80 hover:text-[#F4F4F4]"
                  }`}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md"
                        : "group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md"
                    }`}
                  />
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.55fr)_minmax(320px,0.45fr)]">
          <div className="relative space-y-4 pl-6">
            <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-300/70 via-white/0 to-cyan-300/70" />
            {faqs.map((faq, index) => {
              const isOpen = index === activeIndex;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[32px] border border-white/10 bg-white/5 transition duration-300 ${
                    isOpen ? "shadow-[0_28px_100px_rgba(0,183,181,0.16)]" : "hover:border-cyan-300/30 hover:bg-white/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-[#F4F4F4]">
                        {faq.question}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-[#F4F4F4] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden px-5 transition-[max-height,opacity] duration-300 ease-out ${
                      isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm leading-7 text-[#F4F4F4]/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <article className="relative rounded-[40px] border border-white/10 bg-gradient-to-br from-[#051d24]/80 via-[#061f26]/80 to-[#062c33]/80 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#00b7b5]/10 via-transparent to-[#ffffff]/10 opacity-40 pointer-events-none" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
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
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-[#F4F4F4]/70">
                <p className="font-medium text-[#F4F4F4] mb-2">Need more clarity?</p>
                <p>Tap another category or question to discover more about Certify’s validation flow, security, and web3-native design.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
