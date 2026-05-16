"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const LAST_UPDATED = "15 May 2026";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Certify's platform and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including visitors, registered users, and certificate issuers.",
  },
  {
    title: "2. Description of Services",
    content:
      "Certify provides a blockchain-based certificate verification platform that allows institutions to register credentials and individuals or organizations to verify their authenticity. Our services include manual ID-based verification, QR code scanning, and PDF validation tools.",
  },
  {
    title: "3. User Accounts & Registration",
    content:
      "To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration.",
  },
  {
    title: "4. Acceptable Use",
    content:
      "You agree to use Certify only for lawful purposes. You must not attempt to submit fraudulent certificate data, reverse-engineer the platform, perform unauthorized access to our systems, or use the service in any way that violates applicable laws or regulations.",
  },
  {
    title: "5. Certificate Data & Accuracy",
    content:
      "Certify acts as a verification platform only. The accuracy and legitimacy of certificate data submitted by issuing institutions are the sole responsibility of those institutions. Certify does not independently verify the original credentials submitted by issuers.",
  },
  {
    title: "6. Blockchain Immutability",
    content:
      "Once certificate proof data is recorded on the blockchain, it cannot be altered or deleted. Users and institutions should ensure all submitted data is accurate before initiating on-chain registration. Certify is not liable for errors in data submitted by third parties.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "All content, trademarks, logos, and software on the Certify platform are owned by or licensed to Certify. You may not reproduce, distribute, or create derivative works from any part of the platform without prior written consent from Certify.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "To the maximum extent permitted by law, Certify shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform. Our total liability for direct damages shall not exceed the fees paid by you in the twelve months preceding the claim.",
  },
  {
    title: "9. Disclaimer of Warranties",
    content:
      "Certify provides its services on an 'as is' and 'as available' basis without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of harmful components.",
  },
  {
    title: "10. Termination",
    content:
      "We reserve the right to suspend or terminate your access to the platform at any time, with or without notice, if you violate these Terms of Service or engage in conduct that we determine to be harmful to other users or the integrity of the platform.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia, without regard to conflict of law principles. Any disputes arising under these terms shall be resolved in the courts of the applicable jurisdiction.",
  },
  {
    title: "12. Changes to Terms",
    content:
      "Certify reserves the right to update these Terms of Service at any time. We will notify users of material changes by updating the 'Last Updated' date. Continued use of the platform after such changes constitutes your acceptance of the revised terms.",
  },
  {
    title: "13. Contact Us",
    content:
      "If you have any questions about these Terms of Service, please contact us at: hello@certify.io — We aim to respond to all inquiries within 48 hours.",
  },
];

export default function TermsPage() {
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
          Terms of Service
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
            Please read these Terms of Service carefully before using Certify. By accessing our platform, you agree to comply with and be bound by the following terms and conditions governing your use of our blockchain-powered certificate verification services.
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
