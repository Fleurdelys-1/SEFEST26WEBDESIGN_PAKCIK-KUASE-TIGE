"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";


const LAST_UPDATED = "15 May 2026";

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Certify. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform and use our blockchain-based certificate verification services.",
  },
  {
    title: "2. Information We Collect",
    content:
      "We may collect information that you voluntarily provide when using our services, including your name, email address, and certificate-related data submitted for verification. We also automatically collect certain technical data such as IP address, browser type, and usage patterns to improve platform performance.",
  },
  {
    title: "3. How We Use Your Information",
    content:
      "We use the information we collect to provide, operate, and improve our services; process certificate verifications on the blockchain; communicate with you regarding your requests; ensure the security and integrity of the platform; and comply with applicable legal obligations.",
  },
  {
    title: "4. Blockchain & On-Chain Data",
    content:
      "Certify utilizes blockchain technology for certificate verification. Only cryptographic proof hashes and minimal verification metadata are stored on-chain. No personally identifiable information (PII) is written to the public blockchain. All sensitive data remains encrypted and off-chain.",
  },
  {
    title: "5. Sharing Your Information",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist in operating our platform, provided they agree to keep this information confidential. We may also disclose information when required by law or to protect our rights.",
  },
  {
    title: "6. Data Security",
    content:
      "We implement industry-standard security measures including AES-256 encryption, secure HTTPS connections, and regular security audits to protect your information. While we strive to protect your data, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "7. Cookies & Tracking",
    content:
      "We use cookies and similar tracking technologies to enhance your experience on our platform. These help us remember your preferences and analyze how our service is used. You may disable cookies through your browser settings, though some features may not function properly as a result.",
  },
  {
    title: "8. Your Rights",
    content:
      "Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your information; the right to object to or restrict processing; and the right to data portability. To exercise these rights, please contact us at the email below.",
  },
  {
    title: "9. Third-Party Links",
    content:
      "Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.",
  },
  {
    title: "10. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the 'Last Updated' date at the top of this page. Continued use of the platform after changes constitutes your acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    content:
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: hello@certify.io — We aim to respond to all inquiries within 48 hours.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20">

      {}
      <motion.div
        className="w-full max-w-4xl mb-8"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back To Home
        </Link>
      </motion.div>

      {}
      <motion.div
        className="text-center mb-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F4F4F4] font-outfit mb-3 drop-shadow-lg">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#F4F4F4]/50 font-poppins">
          Last Update, {LAST_UPDATED}
        </p>
      </motion.div>

      {}
      <motion.div
        className="w-full max-w-4xl relative rounded-[48px] border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl overflow-hidden"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80" />

        <div className="relative z-10">
          {}
          <p className="text-[#F4F4F4]/65 text-sm sm:text-base leading-7 mb-8 font-poppins">
            At Certify, your privacy is a priority. Please read this policy carefully to understand how we handle your data when you use our blockchain-powered certificate verification platform.
          </p>

          {}
          <div className="w-full h-px mb-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {}
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3 + i * 0.04,
                }}
              >
                <div className="flex items-start gap-4">
                  {}
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

                {}
                {i < sections.length - 1 && (
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
