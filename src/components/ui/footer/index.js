"use client";

import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const footerLinks = {
    platform: [
      { name: t("nav.home"), href: "/#home" },
      { name: t("nav.about"), href: "/#about" },
      { name: t("nav.validate"), href: "/#validation" },
      { name: t("footer.register"), href: "/register" },
      { name: t("footer.whyBlockchain") === "footer.whyBlockchain" ? "Why Blockchain?" : t("footer.whyBlockchain"), href: "/whyblockchain" },
    ],
    help: [
      { name: t("nav.faq"), href: "/#faq" },
      { name: t("nav.contact"), href: "/#contact" },
    ],
    legal: [
      { name: t("footer.privacyPolicy"), href: "/privacy" },
      { name: t("footer.termsOfService"), href: "/terms" },
    ],
  };

  const features = [
    { icon: Shield, text: t("footer.features.security") },
    { icon: Zap, text: t("footer.features.instant") },
    { icon: Globe, text: t("footer.features.global") },
  ];

  return (
    <footer className="relative w-full mt-auto pt-12 pb-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#005461] to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005461]/20 rounded-full blur-[100px]" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-[#00b7b5]/10 rounded-full blur-[80px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        { }
        <div className="mb-12 sm:mb-16 flex items-center justify-center gap-2 w-full">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#005461] to-[#00b7b5]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00b7b5] shadow-[0_0_8px_#00b7b5]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#005461] to-[#00b7b5]/50" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 mb-4">
          <div className="w-full lg:w-4/12 xl:w-3/12">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/certify.png"
                alt="Certify Logo"
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold text-[#F4F4F4] font-lexend">
                Certify
              </span>
            </div>
            <p className="text-[#F4F4F4]/70 text-sm mb-6 leading-relaxed">
              {t("footer.description")}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#F4F4F4]/80 whitespace-nowrap"
                >
                  <feature.icon className="w-3.5 h-3.5 text-[#00b7b5]" />
                  {feature.text}
                </div>
              ))}
            </div>

          </div>

          <div className="w-full lg:w-4/12 xl:w-5/12 grid grid-cols-2 gap-8 sm:gap-16">
            <div className="">
              <h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
                {t("footer.platform")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F4F4F4]/60 hover:text-[#00b7b5] transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#00b7b5]/0 group-hover:bg-[#00b7b5] transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
                {t("footer.help")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F4F4F4]/60 hover:text-[#00b7b5] transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#00b7b5]/0 group-hover:bg-[#00b7b5] transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-3/12 xl:w-3/12">
            <h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
              {t("footer.stayUpdated")}
            </h4>
            <p className="text-xs text-[#F4F4F4]/60 mb-4">
              {t("footer.newsletter.description")}
            </p>
            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm sm:max-w-none">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter.placeholder")}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-[#F4F4F4] text-sm placeholder-[#F4F4F4]/40 focus:outline-none focus:border-[#00b7b5]/50 focus:ring-1 focus:ring-[#00b7b5]/20 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md text-[#F4F4F4] hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                >
                  {isSubscribed ? (
                    <Shield className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-[#00b7b5] mt-2 animate-pulse">
                  {t("footer.newsletter.subscribed")}
                </p>
              )}
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#F4F4F4]/60">
                <Mail className="w-4 h-4 text-[#00b7b5]" />
                <span>hello@certify.io</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F4F4F4]/60">
                <MapPin className="w-4 h-4 text-[#00b7b5]" />
                <span>{t("footer.contact.location")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left w-full">
            <div className="sm:flex-1 flex justify-center sm:justify-start">
              <p className="text-sm text-[#F4F4F4]/50">
                © {new Date().getFullYear()} Certify. {t("footer.copyright")}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap sm:flex-none">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-xs text-[#F4F4F4]/50 hover:text-[#00b7b5] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="sm:flex-1 flex justify-center sm:justify-end">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#00b7b5] animate-pulse" />
                <span className="text-xs text-[#F4F4F4]/60">
                  {t("footer.protocol")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#005461]" />
          <div className="w-1 h-1 rounded-full bg-[#00b7b5]" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#005461]" />
        </div>
      </div>
    </footer>
  );
}
