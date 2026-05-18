"use client";

import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { motion } from "framer-motion";
import GlareHover from "../../components/ui/glare-hover";
import BorderGlow from "../../components/ui/card/border-glow";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Link2Off, 
  Database, 
  Scale, 
  Fingerprint, 
  Link as LinkIcon, 
  Search, 
  Lock, 
  Cpu, 
  Activity, 
  FileSearch, 
  Leaf, 
  Globe, 
  Zap, 
  HelpCircle,
  FileText,
  ShieldAlert
} from "lucide-react";

const defaultProblems = [
  {
    title: "Certification can be edited without leaving a trace",
    desc: "PDFs and digital files can be easily edited or falsified with no visible trace."
  },
  {
    title: "Verification links often stop working",
    desc: "School database validation links decay or break over time when web domains expire."
  },
  {
    title: "The issuing institution must be contacted manually",
    desc: "Manual verifications via emails or phone calls waste hours of administrative labor."
  },
  {
    title: "The system depends entirely on a private database",
    desc: "Private database hacks or crashes can corrupt all validation records permanently."
  },
  {
    title: "Legal uncertainty about file integrity",
    desc: "Without public digital signatures, proving original integrity in court is extremely costly."
  }
];

const defaultBenefits = [
  {
    title: "Unique Fingerprint",
    description: "A cryptographic fingerprint is generated that changes completely if even a single character in the document is altered."
  },
  {
    title: "Public Record",
    description: "That fingerprint is permanently and immutably recorded on a decentralized, public blockchain network."
  },
  {
    title: "Verification",
    description: "Anyone can verify the existence, timestamp, and immutability of the record using standard public on-chain tools."
  }
];

const defaultWhyPolygon = [
  {
    title: "Transparent verification",
    description: "Anyone can verify a Certify record using standard public explorers like Polygonscan, bypassing any proprietary middleman."
  },
  {
    title: "Sustainable costs",
    description: "Allows registering thousands of certifications at micro-cent transaction costs, making the service accessible to all institutions."
  },
  {
    title: "Recognized standards",
    description: "Being fully compatible with the Ethereum Virtual Machine (EVM), it uses formats widely accepted in international auditing and compliance."
  },
  {
    title: "Institutional reputation",
    description: "Trusted and used by multiple global enterprises and governments, conveying unparalleled seriousness and technical stability."
  },
  {
    title: "Long-term vision",
    description: "Has an incredibly active developer community, deep liquidity, and a technological roadmap designed to last for decades."
  }
];

const defaultSuitabilityConditions = [
  "Public and Verifiable",
  "Immutability",
  "Technical Maturity",
  "Temporal Stability",
  "Independent Auditing",
  "Sustainability"
];

export default function WhyBlockchainPage() {
  const { t, language } = useLanguage();
  
  const getString = (key, fallback) => {
    const val = t(key);
    return typeof val === "string" && val !== key ? val : fallback;
  };

  const getArray = (key, fallbackArray) => {
    const val = t(key);
    return Array.isArray(val) ? val : fallbackArray;
  };

  const problemIcons = [FileText, Link2Off, HelpCircle, Database, Scale];
  
  const conditionIcons = [Globe, Lock, Cpu, Activity, FileSearch, Leaf];

  const brandColors = ["#00B7B5", "#018790", "#005461"];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden relative">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00b7b5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-[#005461]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        className="w-full max-w-5xl mb-8 relative z-10"
        initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 group font-poppins"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {getString("whyblockchain.backToHome", "Back To Home")}
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center text-center mb-16 w-full max-w-4xl relative z-10 mx-auto"
        initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-outfit mb-6 tracking-tight leading-tight text-center w-full mx-auto">
          <span className="bg-gradient-to-r from-white via-[#F4F4F4] to-[#00b7b5] bg-clip-text text-transparent">
            {getString("whyblockchain.title", "Why Certify Uses Blockchain")}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#F4F4F4]/70 font-poppins max-w-2xl mx-auto leading-relaxed text-center w-full">
          {getString("whyblockchain.subtitle", "and why we chose Polygon as our industrial and academic trust infrastructure.")}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00b7b5] to-transparent mx-auto mt-6 rounded-full" />
      </motion.div>

      <motion.div
        className="w-full max-w-5xl mb-24 relative z-10 group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <BorderGlow
          edgeSensitivity={30}
          glowColor="179 100 36"
          backgroundColor="transparent"
          borderRadius={32}
          glowRadius={50}
          glowIntensity={0.9}
          coneSpread={25}
          animated={true}
          colors={brandColors}
          className="border-none relative"
        >
          <div className="relative p-8 sm:p-10 z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-start h-full">
            <div className="p-4 rounded-2xl bg-[#00b7b5]/10 border border-[#00b7b5]/20 text-[#00b7b5] shadow-[0_0_15px_rgba(0,183,181,0.15)] flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-outfit mb-4">
                {getString("whyblockchain.conviction.title", "Our Conviction")}
              </h2>
              <p className="text-base text-[#F4F4F4]/80 leading-7 font-poppins mb-4">
                {getString("whyblockchain.conviction.p1", "At Certify, we have a clear conviction: a digital certificate must be independently, simply, and reliably verifiable — today and in the future.")}
              </p>
              <p className="text-sm text-[#F4F4F4]/60 leading-6 font-poppins">
                {getString("whyblockchain.conviction.p2", "In a world where digital documents can be easily copied, altered, or forged, traditional certification based solely on PDF files or private databases is no longer sufficient. For this reason, Certify incorporates blockchain technology as a public verification record, carefully selected and applied with institutional judgment.")}
              </p>
            </div>
          </div>
        </BorderGlow>
      </motion.div>

      <div className="w-full max-w-5xl mb-24 relative z-10">
        <motion.div
          className="text-center mb-10 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUpVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-4">
            {getString("whyblockchain.problem.title", "The problem with traditional certificates")}
          </h2>
          <p className="text-sm sm:text-base text-[#F4F4F4]/60 font-poppins max-w-3xl mx-auto leading-relaxed">
            {getString("whyblockchain.problem.subtitle", "Today, millions of certificates circulate in digital format sharing a fundamental weakness: there is no simple, independent way to verify they haven't been altered.")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {getArray("whyblockchain.problem.items", defaultProblems).map((item, index) => {
            const Icon = problemIcons[index % problemIcons.length] || FileText;
            return (
              <motion.div
                key={index}
                className="w-full"
                variants={fadeInUpVariants}
              >
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(to bottom right, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))"
                  borderColor="rgba(255, 255, 255, 0.12)"
                  borderRadius="20px"
                  glareColor="#00B7B5"
                  glareOpacity={0.4}
                  className="shadow-2xl backdrop-blur-xl hover:border-[#00B7B5]/40 transition-all duration-300 relative group border text-left w-full h-full overflow-hidden"
                >
                  <div className="w-full h-full flex flex-row items-start gap-4 p-5 text-left relative z-10 min-h-[90px]">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#F4F4F4]/60 group-hover:text-[#00b7b5] group-hover:border-[#00b7b5]/30 group-hover:bg-[#00b7b5]/15 transition-all duration-300 flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-[#F4F4F4] font-outfit mb-1.5 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#F4F4F4]/60 leading-relaxed font-poppins">
                        {item.desc}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00b7b5] to-transparent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mb-24 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUpVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-4">
            {getString("whyblockchain.benefits.title", "What blockchain brings to certification")}
          </h2>
          <p className="text-sm sm:text-base text-[#F4F4F4]/60 font-poppins max-w-2xl mx-auto leading-relaxed">
            {getString("whyblockchain.benefits.subtitle", "Blockchain solves this problem elegantly and robustly. At Certify, the process works like this:")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pt-4 overflow-visible"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {getArray("whyblockchain.benefits.cards", defaultBenefits).map((card, index) => {
            const iconsList = [Fingerprint, LinkIcon, Search];
            const StepIcon = iconsList[index] || Fingerprint;
            return (
              <motion.div
                key={index}
                className="w-full h-full relative group rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl relative hover:border-[#00B7B5]/30 transition-all duration-300 overflow-visible"
                variants={fadeInUpVariants}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#00b7b5]/15 border-2 border-[#00b7b5] flex items-center justify-center text-[#00b7b5] text-sm font-extrabold font-mono shadow-[0_0_15px_rgba(0,183,181,0.3)] backdrop-blur-md z-30">
                  {index + 1}
                </div>

                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="179 100 36"
                  backgroundColor="transparent"
                  borderRadius={24}
                  glowRadius={40}
                  glowIntensity={0.8}
                  coneSpread={25}
                  animated={true}
                  colors={brandColors}
                  className="border-none h-full relative overflow-visible"
                >
                  <div className="p-8 pt-10 flex flex-col items-center text-center group h-full z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-[#00b7b5] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-[#00b7b5]/10 group-hover:border-[#00b7b5]/20 transition-all duration-300">
                      <StepIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F4F4F4] font-outfit mb-3 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#F4F4F4]/65 leading-relaxed font-poppins">
                      {card.description}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="w-full group rounded-[20px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUpVariants}
        >
          <BorderGlow
            edgeSensitivity={40}
            glowColor="179 100 36"
            backgroundColor="transparent"
            borderRadius={20}
            glowRadius={30}
            glowIntensity={0.7}
            coneSpread={30}
            animated={false}
            colors={brandColors}
            className="border-none relative"
          >
            <div className="p-6 sm:p-8 flex gap-4 items-center z-10">
              <div className="p-3 rounded-full bg-[#00b7b5]/10 text-[#00b7b5] flex-shrink-0 animate-pulse">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-[#F4F4F4]/80 leading-relaxed font-poppins">
                <span className="font-semibold text-[#00b7b5]">{getString("whyblockchain.benefits.fundamentalLabel", "Fundamental")}: </span>
                {getString("whyblockchain.benefits.fundamentalText", "Certify does not store documents or personal data on the blockchain. The blockchain only contains a technical proof of integrity, protecting the holder's privacy.")}
              </p>
            </div>
          </BorderGlow>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mb-24 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUpVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-4">
            {getString("whyblockchain.suitability.title", "Not all blockchains are suitable")}
          </h2>
          <p className="text-sm sm:text-base text-[#F4F4F4]/60 font-poppins max-w-2xl mx-auto leading-relaxed">
            {getString("whyblockchain.suitability.subtitle", "For Certify, a certification infrastructure must meet very specific conditions to be considered responsible and professional:")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {getArray("whyblockchain.suitability.conditions", defaultSuitabilityConditions).map((cond, index) => {
            const CondIcon = conditionIcons[index] || Globe;
            return (
              <motion.div
                key={index}
                className="w-full h-full"
                variants={fadeInUpVariants}
              >
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(to bottom right, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))"
                  borderColor="rgba(255, 255, 255, 0.12)"
                  borderRadius="16px"
                  glareColor="#00B7B5"
                  glareOpacity={0.3}
                  className="shadow-2xl backdrop-blur-md hover:border-[#00B7B5]/40 transition-all duration-300 group border w-full overflow-hidden"
                >
                  <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center gap-2 relative z-10 min-h-[110px]">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-[#00b7b5] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00b7b5]/15 transition-transform">
                      <CondIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-[#F4F4F4]/75 group-hover:text-white uppercase tracking-wider font-outfit">
                      {cond}
                    </span>
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          
          <motion.div
            className="w-full h-full group rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
            variants={fadeInUpVariants}
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="179 100 36"
              backgroundColor="transparent"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={0.8}
              coneSpread={25}
              animated={true}
              colors={brandColors}
              className="border-none h-full relative"
            >
              <div className="p-8 relative overflow-hidden flex gap-4 items-start z-10 h-full">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 text-[#00b7b5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit mb-3">
                    {getString("whyblockchain.suitability.whyNotEth.title", "Why not Ethereum?")}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F4F4F4]/60 leading-relaxed font-poppins">
                    {getString("whyblockchain.suitability.whyNotEth.description", "Ethereum is the reference standard, but its high operating costs (gas fees) make scalability difficult in educational and institutional contexts. It is not the most responsible option for an accessible, low-barrier, and time-sustainable service.")}
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          <motion.div
            className="w-full h-full group rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
            variants={fadeInUpVariants}
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="179 100 36"
              backgroundColor="transparent"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={0.8}
              coneSpread={25}
              animated={true}
              colors={brandColors}
              className="border-none h-full relative"
            >
              <div className="p-8 relative overflow-hidden flex gap-4 items-start z-10 h-full">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 text-[#00b7b5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit mb-3">
                    {getString("whyblockchain.suitability.whyNotNew.title", "Why not new networks?")}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F4F4F4]/60 leading-relaxed font-poppins">
                    {getString("whyblockchain.suitability.whyNotNew.description", "Experimental networks present risks of instability, centralization, and lesser institutional recognition. In certification, long-term trust and permanence outweigh trendy technological novelty.")}
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-5xl mb-24 relative z-10 group rounded-[32px] border border-white/15 bg-gradient-to-br from-white/15 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#00b7b5_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        
        <BorderGlow
          edgeSensitivity={30}
          glowColor="179 100 36"
          backgroundColor="transparent"
          borderRadius={32}
          glowRadius={60}
          glowIntensity={1.0}
          coneSpread={25}
          animated={true}
          colors={brandColors}
          className="border-none relative h-full"
        >
          <div className="relative p-6 sm:p-8 md:p-10 z-10 flex flex-col items-center h-full w-full">
            
            <div 
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md mx-auto mb-5"
              style={{
                background: "rgba(0, 84, 97, 0.3)",
                border: "1px solid rgba(0, 183, 181, 0.4)",
                boxShadow: "0 0 20px rgba(0, 183, 181, 0.2)",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00b7b5] animate-ping" />
              {getString("whyblockchain.whyPolygon.badge", "Polygon Network Native")}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-outfit text-white mb-3 text-center">
              {getString("whyblockchain.whyPolygon.title", "Why Certify Chose Polygon")}
            </h2>
            <p className="text-xs sm:text-sm text-[#F4F4F4]/60 font-poppins text-center max-w-xl mb-8 leading-relaxed">
              {getString("whyblockchain.whyPolygon.subtitle", "Polygon represents the perfect equilibrium between decentralization, high speed, recognized standards, and minimal costs.")}
            </p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainerVariants}
            >
              {getArray("whyblockchain.whyPolygon.items", defaultWhyPolygon).map((item, index) => {
                const polygonIconsList = [Globe, Zap, ShieldCheck, Cpu, Activity];
                const PolyIcon = polygonIconsList[index % polygonIconsList.length] || ShieldCheck;
                return (
                  <motion.div
                    key={index}
                    className={`flex gap-3 sm:gap-4 items-start rounded-xl p-4 bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 shadow-md ${
                      index === 4 ? "md:col-span-2 max-w-xl mx-auto w-full" : ""
                    }`}
                    variants={fadeInUpVariants}
                  >
                    <div className="p-2 rounded-lg bg-[#00b7b5]/10 text-[#00b7b5] border border-[#00b7b5]/20 flex-shrink-0 mt-0.5 shadow-inner">
                      <PolyIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white font-outfit mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#F4F4F4]/60 leading-relaxed font-poppins">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </BorderGlow>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl relative z-10 group rounded-[28px] border border-white/10 bg-gradient-to-br from-white/15 to-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden hover:border-[#00B7B5]/30 transition-all duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUpVariants}
      >
        <BorderGlow
          edgeSensitivity={30}
          glowColor="179 100 36"
          backgroundColor="transparent"
          borderRadius={28}
          glowRadius={50}
          glowIntensity={0.9}
          coneSpread={25}
          animated={true}
          colors={brandColors}
          className="border-none relative h-full"
        >
          <div className="relative p-8 sm:p-12 flex flex-col items-center text-center z-10">
            <span className="text-7xl font-serif text-[#00b7b5]/30 leading-none h-6 select-none">“</span>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white max-w-2xl font-outfit mb-6 italic leading-relaxed tracking-wide">
              {getString("whyblockchain.commitment.quote", "\"Certify uses blockchain as a public verification record, not as a tech trend or a marketing argument.\"")}
            </h2>
            
            <div className="w-12 h-px bg-white/20 mb-6" />
            
            <p className="text-xs sm:text-sm text-[#F4F4F4]/55 font-poppins max-w-2xl leading-relaxed">
              {getString("whyblockchain.commitment.subtext", "Those who use Certify can rest assured that their certificates are backed by a public, verifiable infrastructure designed to remain trustworthy over time. Polygon officially represents the right balance between trust, stability, and efficiency.")}
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <img src="/images/certify.png" alt="Certify Logo" className="w-7 h-7" />
              <span className="text-white/40 text-xs">|</span>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#00b7b5] text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(0, 84, 97, 0.3)",
                  border: "1px solid rgba(0, 183, 181, 0.4)",
                  boxShadow: "0 0 15px rgba(0, 183, 181, 0.15)",
                }}
              >
                {getString("whyblockchain.whyPolygon.poweredBy", "Powered by Polygon")}
              </div>
            </div>
          </div>
        </BorderGlow>
      </motion.div>

    </main>
  );
}
