"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FileUp, QrCode, Search, Upload, Lock, CheckCircle2, ArrowRight, ShieldCheck, Zap, AlertCircle, Copy, ExternalLink, X, Hash, Download } from 'lucide-react';
import { searchCertificate } from '../../lib/utils';

const maskText = (text) => {
  if (!text) return '';
  const half = Math.ceil(text.length / 2);
  return text.slice(0, half) + '*'.repeat(text.length - half);
};

const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return maskText(email);
  const half = Math.ceil(local.length / 2);
  return local.slice(0, half) + '*'.repeat(local.length - half) + '@' + domain;
};

export default function Validation({ initialTab = 'manual', initialQueryValue = '' }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchValue, setSearchValue] = useState(initialQueryValue);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchOrigin, setSearchOrigin] = useState(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const isInitialLoad = useRef(!!initialQueryValue);

  const performSearch = (queryValue, isInitial = false, origin = 'manual') => {
    const trimmedValue = queryValue.trim();
    if (!trimmedValue) return;

    setIsSearching(true);

    const delay = isInitial ? 0 : 1200;
    setTimeout(() => {
      const result = searchCertificate(trimmedValue);
      setSearchResult(result);
      setSearchOrigin(origin);
      setIsSearching(false);
    }, delay);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    performSearch(searchValue, false, 'manual');
  };

  useEffect(() => {
    if (!isInitialLoad.current) return;

    setActiveTab(initialTab || 'qr');
    setSearchValue(initialQueryValue.trim());
    performSearch(initialQueryValue.trim(), true, initialTab === 'qr' ? 'qr' : 'manual');

    isInitialLoad.current = false;
  }, []);


  useEffect(() => {
    if (!searchResult || !initialQueryValue?.trim()) return;

    const timer = setTimeout(() => {
      const section = document.getElementById('validation');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchResult, initialQueryValue]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const resetSearch = () => {
    setSearchResult(null);
    setSearchOrigin(null);
    setSearchValue('');
  };

  const showManualResult = searchResult && searchOrigin === 'manual';
  const showQrResult = searchResult && searchOrigin === 'qr';

  const badgeContainerVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const badgeContentVariants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const sectionTextVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(16px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.72,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const sectionItemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: 'easeOut',
      },
    },
  };

  const tabContainerVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const tabItemVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
  };

  const inputRowVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(18px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const inputItemVariants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(14px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.58,
        ease: 'easeOut',
      },
    },
  };

  const verifyButtonVariants = {
    hidden: { opacity: 0, x: 70, filter: 'blur(18px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.72,
        ease: 'easeOut',
      },
    },
  };

  const cryptoTextVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(14px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cryptoGlassVariants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(18px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const cryptoLeftButtonVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.68,
        ease: 'easeOut',
      },
    },
  };

  const cryptoRightButtonVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.68,
        ease: 'easeOut',
      },
    },
  };

  const resultContainerVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const resultItemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(15px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  };

  const resultGlassStyle = {
    background: 'linear-gradient(135deg, rgba(10, 30, 40, 0.65), rgba(0, 40, 50, 0.5))',
    backdropFilter: 'blur(28px) saturate(200%)',
    WebkitBackdropFilter: 'blur(28px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 80px rgba(0, 183, 181, 0.04)',
  };

  return (
    <section id="validation" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[100px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={badgeContainerVariants}
        >
          <motion.span
            className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-white/90 backdrop-blur-md shadow flex items-center gap-2"
            style={{
              background: 'rgba(0, 84, 97, 0.3)',
              border: '1px solid rgba(0, 183, 181, 0.4)',
              boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
            }}
            variants={badgeContainerVariants}
          >
            <motion.span className="inline-flex items-center gap-2" variants={badgeContentVariants}>
              <motion.span className="inline-flex items-center justify-center" variants={badgeContentVariants}>
                <CheckCircle2 className="w-4 h-4" />
              </motion.span>
              <motion.span variants={badgeContentVariants}>{t('validate.badge')}</motion.span>
            </motion.span>
          </motion.span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionTextVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#F4F4F4] mb-4 font-outfit drop-shadow-lg"
            variants={sectionItemVariants}
          >
            {t('validate.title')}
          </motion.h2>

          <motion.p
            className="text-center text-base sm:text-lg text-[#F4F4F4]/75 max-w-2xl mx-auto mb-12 font-poppins"
            variants={sectionItemVariants}
          >
            {t('validate.description')}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:gap-6 mb-10 justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={tabContainerVariants}
        >
          <motion.div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl" variants={tabContainerVariants}>
            <motion.button
              type="button"
              onClick={() => setActiveTab('manual')}
              variants={tabItemVariants}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'manual'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${activeTab === 'manual'
                  ? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                  : 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <Search className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.manual')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.manualShort')}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setActiveTab('pdf')}
              variants={tabItemVariants}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'pdf'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${activeTab === 'pdf'
                  ? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                  : 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <FileUp className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.pdf')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.pdfShort')}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setActiveTab('qr')}
              variants={tabItemVariants}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'qr'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${activeTab === 'qr'
                  ? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                  : 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <QrCode className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.qr')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.qrShort')}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'manual' && (
            <motion.div
              key="manual"
              initial={{ opacity: 0, scaleY: 0, rotateX: -12 }}
              animate={{ opacity: 1, scaleY: 1, rotateX: 0 }}
              exit={{ opacity: 0, scaleY: 0, rotateX: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
              style={{ transformOrigin: 'top center' }}
            >
              <div className="space-y-6">

                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-3 px-4 py-3 rounded-xl"
                  style={glassCardStyle}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={inputRowVariants}
                >
                  <motion.div
                    className="flex items-center pl-3"
                    variants={inputItemVariants}
                  >
                    <Search className="w-5 h-5 text-white/50" />
                  </motion.div>
                  <motion.input
                    type="text"
                    placeholder={t('validate.placeholder')}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    variants={inputItemVariants}
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 outline-none text-base font-poppins"
                  />
                  <motion.button
                    onClick={handleSearch}
                    disabled={isSearching}
                    variants={verifyButtonVariants}
                    className="min-w-[180px] rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: 'linear-gradient(to right, rgba(0, 84, 97, 0.3), rgba(244, 244, 244, 0.2))',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
                    }}
                  >
                    {isSearching ? t('validate.validating') : t('validate.verify')}
                  </motion.button>
                </motion.div>


                {!searchResult && (
                  <motion.div
                    className="max-w-3xl mx-auto mt-0 p-3 sm:p-4 rounded-2xl"
                    style={glassCardStyle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cryptoGlassVariants}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 flex items-center justify-center">
                        <div className="w-1 h-1 bg-[#00B7B5] rounded-full animate-pulse" />
                      </div>
                      <motion.p className="text-xs font-bold text-[#F4F4F4] uppercase tracking-wider" variants={cryptoTextVariants}>
                        RUN A CRYPTOGRAPHIC VALIDATION TEST WITH REAL CERTIFICATE DATA:
                      </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.div
                        className="group relative px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          backdropFilter: 'blur(18px)',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => setSearchValue('CERT-C14B116C16F9')}
                        variants={cryptoLeftButtonVariants}
                      >
                        <span className="text-xs font-bold text-white/50 group-hover:text-white transition-colors duration-300">ID:</span>
                        <span className="font-mono font-semibold text-white/50 text-xs truncate group-hover:text-white transition-colors duration-300">CERT-C14B116C16F9</span>
                        <ArrowRight className="w-3 h-3 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto flex-shrink-0" />
                      </motion.div>
                      <motion.div
                        className="group relative px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          backdropFilter: 'blur(18px)',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => setSearchValue('bdab84b566f9460c7b27e616ca85d18d96fd07d7b25f1eae65104d2359cb9ce1')}
                        variants={cryptoRightButtonVariants}
                      >
                        <span className="text-xs font-bold text-white/50 group-hover:text-white transition-colors duration-300">Hash:</span>
                        <span className="font-mono font-semibold text-white/50 text-xs truncate group-hover:text-white transition-colors duration-300">bdab84b...cb9ce1</span>
                        <ArrowRight className="w-3 h-3 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto flex-shrink-0" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}


                {showManualResult && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={resultContainerVariants}
                    className="space-y-4"
                  >
                    {searchResult.found ? (
                      <>
                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-2xl p-4 sm:p-6"
                          style={{
                            ...resultGlassStyle,
                            background: 'linear-gradient(135deg, rgba(10, 30, 40, 0.7), rgba(0, 50, 60, 0.55))',
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`flex-shrink-0 p-2 rounded-full ${searchResult.isActive ? 'bg-[#00B7B5]/20' : 'bg-red-500/20'}`}>
                                <CheckCircle2 className={`w-6 h-6 ${searchResult.isActive ? 'text-[#00B7B5]' : 'text-red-400'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="px-3 py-1 rounded-full text-xs font-bold text-[#F4F4F4]/80 backdrop-blur-md" style={{
                                    background: 'rgba(0, 84, 97, 0.4)',
                                    border: '1px solid rgba(0, 183, 181, 0.5)',
                                  }}>
                                    STATUS: {searchResult.certificate.status}
                                  </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit mb-2">
                                  {searchResult.isActive ? 'Validate Certificate' : 'Certificate Revoked'}
                                </h3>
                                <p className="text-sm text-white/70 font-poppins">
                                  {searchResult.certificate.statusReason}
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <button
                                onClick={resetSearch}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                              >
                                <X className="w-5 h-5 text-white/50 hover:text-white" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            <div className="p-3 rounded-lg relative" style={{ background: 'rgba(0, 183, 181, 0.1)' }}>
                              <button
                                onClick={() => { navigator.clipboard.writeText(searchResult.certificate.id); setCopiedId(true); setTimeout(() => setCopiedId(false), 2000); }}
                                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200"
                              >
                                <Copy className={`w-4 h-4 ${copiedId ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                              </button>
                              <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1">Unique Credential ID</p>
                              <p className="text-lg font-mono text-[#00B7B5] break-all pr-8">{searchResult.certificate.id}</p>
                            </div>
                            <div className="p-3 rounded-lg relative" style={{ background: 'rgba(0, 183, 181, 0.1)' }}>
                              <button
                                onClick={() => copyToClipboard(searchResult.certificate.hash)}
                                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200"
                              >
                                <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                              </button>
                              <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1">Certificate Hash</p>
                              <p className="text-lg font-mono text-[#00B7B5] break-all pr-8">{searchResult.certificate.hash}</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div className="rounded-xl p-4" style={resultGlassStyle}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">User Information</p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Full Name</p>
                                <p className="text-sm text-white font-poppins">{searchResult.certificate.userInformation.fullName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">ID Number</p>
                                <p className="text-sm font-mono text-white/80">{maskText(searchResult.certificate.userInformation.idNumber)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Email</p>
                                <p className="text-xs font-mono text-white/70 break-all">{maskEmail(searchResult.certificate.userInformation.email)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Country</p>
                                <p className="text-sm text-white/80">{searchResult.certificate.userInformation.country}</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl p-4" style={resultGlassStyle}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Program Detail</p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Course Name</p>
                                <p className="text-sm text-white/90">{searchResult.certificate.programDetail.courseName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Event Code</p>
                                <p className="text-sm font-mono text-[#00B7B5]">{searchResult.certificate.programDetail.academicEventCode}</p>
                              </div>
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Level</p>
                                  <p className="text-xs text-white/80">{searchResult.certificate.programDetail.level}</p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Language</p>
                                  <p className="text-xs text-white/80">{searchResult.certificate.programDetail.language}</p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Grade</p>
                                  <p className="text-xs text-white/80">{searchResult.certificate.programDetail.grade}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl p-4" style={resultGlassStyle}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Certificates Details</p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Institution</p>
                                <p className="text-sm text-white/90">{searchResult.certificate.issuingInstitution.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Modality</p>
                                <p className="text-sm text-white/80">{searchResult.certificate.issuingInstitution.modality}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Issued Date</p>
                                <p className="text-sm text-white/80">{searchResult.certificate.dates.issueDate}</p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Study Period</p>
                                <p className="text-xs text-white/70">{searchResult.certificate.dates.studyPeriodStart} - {searchResult.certificate.dates.studyPeriodEnd}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-xl p-4"
                          style={resultGlassStyle}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Credentials</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">Instructors</p>
                              <div className="flex flex-wrap gap-2">
                                {searchResult.certificate.credentials.instructors.map((instructor, idx) => (
                                  <span key={idx} className="px-2 py-1 rounded text-xs text-white/80" style={{
                                    background: 'rgba(0, 183, 181, 0.15)',
                                    border: '1px solid rgba(0, 183, 181, 0.3)',
                                  }}>
                                    {instructor}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">Signatories</p>
                              <div className="flex flex-wrap gap-2">
                                {searchResult.certificate.credentials.signatories.map((signatory, idx) => (
                                  <span key={idx} className="px-2 py-1 rounded text-xs text-white/80" style={{
                                    background: 'rgba(0, 183, 181, 0.15)',
                                    border: '1px solid rgba(0, 183, 181, 0.3)',
                                  }}>
                                    {signatory}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-xl p-4"
                          style={resultGlassStyle}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-[#00B7B5]" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest"># Blockchain Digital Evidence</p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(0, 183, 181, 0.1)' }}>
                              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Smart Contract Verified</p>
                              <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold ${searchResult.certificate.blockchainEvidence.smartContractVerified ? 'bg-[#00B7B5]/20 text-[#00B7B5]' : 'bg-red-500/20 text-red-400'}`}>
                                {searchResult.certificate.blockchainEvidence.smartContractVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {searchResult.certificate.blockchainEvidence.smartContractVerified ? 'Verified' : 'Not Verified'}
                              </span>
                            </div>

                            {[{ label: 'TX A: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txA }, { label: 'TX B: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txB }].map((item, idx) => (
                              <div key={idx} className="rounded-lg p-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">{item.label}</p>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="font-mono text-xs text-white/70 break-all flex-1">{item.tx.hash}</span>
                                  <button
                                    onClick={() => copyToClipboard(item.tx.hash)}
                                    className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0"
                                  >
                                    <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40'}`} />
                                  </button>
                                </div>
                                <a
                                  href={item.tx.scanLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs text-[#00B7B5] hover:text-[#018790] transition-colors duration-200"
                                >
                                  View on Polygonscan
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="flex gap-3"
                        >
                          <a
                            href={`/api/certificate/${searchResult.certificate.id}/audit`}
                            download
                            className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] backdrop-blur-sm text-center flex items-center justify-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, rgba(10, 30, 40, 0.6), rgba(0, 40, 50, 0.45))',
                              backdropFilter: 'blur(28px) saturate(200%)',
                              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <Download className="w-4 h-4" />
                            Audit Report
                          </a>
                          <a
                            href={`/api/certificate/${searchResult.certificate.id}/pdf`}
                            download
                            className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] backdrop-blur-sm flex items-center justify-center gap-2"
                            style={{
                              background: 'linear-gradient(to right, rgba(0, 84, 97, 0.3), rgba(244, 244, 244, 0.2))',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
                            }}
                          >
                            <Download className="w-4 h-4" />
                            PDF Download
                          </a>
                        </motion.div>
                      </>
                    ) : (
                      <motion.div
                        variants={resultItemVariants}
                        className="rounded-2xl p-6 text-center"
                        style={{
                          ...resultGlassStyle,
                          border: '1px solid rgba(255, 59, 48, 0.35)',
                          boxShadow: '0 12px 30px rgba(255, 59, 48, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white font-outfit mb-2">Certificate Not Found</h3>
                        <p className="text-white/70 mb-6 font-poppins">{searchResult.message}</p>
                        <button
                          onClick={resetSearch}
                          className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]"
                          style={{
                            background: 'linear-gradient(to right, rgba(0, 84, 97, 0.3), rgba(244, 244, 244, 0.2))',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
                          }}
                        >
                          Try Another Search
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'pdf' && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, scaleY: 0, rotateX: -12 }}
              animate={{ opacity: 1, scaleY: 1, rotateX: 0 }}
              exit={{ opacity: 0, scaleY: 0, rotateX: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto space-y-6"
              style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            >
              <div
                className="p-6 rounded-3xl"
                style={{
                  ...glassCardStyle,
                  border: '2px dashed rgba(0, 183, 181, 0.3)',
                }}
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-6 rounded-3xl bg-[#00B7B5]/10">
                    <Upload className="w-10 h-10 text-[#00B7B5]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit mb-2">
                      {t('validate.pdf.title')}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base font-poppins">
                      {t('validate.pdf.description')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
                    <Lock className="w-4 h-4" />
                    <span>{t('validate.pdf.security')}</span>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-3xl"
                style={{
                  ...glassCardStyle,
                  border: '2px dashed rgba(0, 183, 181, 0.3)',
                }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#018790]/15 text-[#00B7B5]">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
                        DOWNLOAD TEST CERTIFICATE
                      </p>
                      <p className="mt-1 text-sm text-white/70 font-poppins">
                        Get the demo certificate file and use it for your validation test.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="min-w-[180px] rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(to right, rgba(0, 84, 97, 0.35), rgba(255, 255, 255, 0.18))',
                      border: '1px solid rgba(255, 255, 255, 0.26)',
                      boxShadow: '0 0 24px rgba(0, 183, 181, 0.18)',
                    }}
                  >
                    DOWNLOAD FILE
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'qr' && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scaleY: 0, rotateX: -12 }}
              animate={{ opacity: 1, scaleY: 1, rotateX: 0 }}
              exit={{ opacity: 0, scaleY: 0, rotateX: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
              style={{ transformOrigin: 'top center' }}
            >
              {!showQrResult ? (
                <div className="rounded-3xl p-4 sm:p-6" style={{
                  ...glassCardStyle,
                  border: '2px dashed rgba(0, 183, 181, 0.3)',
                  boxShadow: '0 30px 70px rgba(0, 183, 181, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                  minHeight: '120px',
                }}>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-[320px_1fr] gap-6 sm:gap-8 items-center">
                      <div className="flex justify-center sm:justify-start">
                        <div
                          className="p-6 rounded-2xl flex flex-col items-center gap-4 w-full max-w-[320px] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]"
                          style={glassCardStyle}
                        >
                          <img
                            src="/images/qr.png"
                            alt="QR code"
                            className="w-full h-auto rounded-3xl border border-white/10 object-contain"
                          />
                          <div className="text-center">
                            <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                              CERT CERTIFICATE
                            </p>
                            <p className="text-xs font-mono mt-1" style={{ color: '#00B7B5' }}>
                              ID: CERT-C14B116C16F9
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit mb-3">
                            {t('validate.qr.title')}
                          </h3>
                          <p className="text-white/70 text-sm sm:text-base font-poppins leading-relaxed">
                            {t('validate.qr.description')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={resultContainerVariants}
                  className="space-y-4"
                >
                  {searchResult.found ? (
                    <>
                      <motion.div
                        variants={resultItemVariants}
                        className="rounded-2xl p-4 sm:p-6"
                        style={{
                          ...resultGlassStyle,
                          background: 'linear-gradient(135deg, rgba(10, 30, 40, 0.7), rgba(0, 50, 60, 0.55))',
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`flex-shrink-0 p-2 rounded-full ${searchResult.isActive ? 'bg-[#00B7B5]/20' : 'bg-red-500/20'}`}>
                              <CheckCircle2 className={`w-6 h-6 ${searchResult.isActive ? 'text-[#00B7B5]' : 'text-red-400'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="px-3 py-1 rounded-full text-xs font-bold text-[#F4F4F4]/80 backdrop-blur-md" style={{
                                  background: 'rgba(0, 84, 97, 0.4)',
                                  border: '1px solid rgba(0, 183, 181, 0.5)',
                                }}>
                                  STATUS: {searchResult.certificate.status}
                                </span>
                              </div>
                              <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit mb-2">
                                {searchResult.isActive ? 'Validate Certificate' : 'Certificate Revoked'}
                              </h3>
                              <p className="text-sm text-white/70 font-poppins">
                                {searchResult.certificate.statusReason}
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <button
                              onClick={resetSearch}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                            >
                              <X className="w-5 h-5 text-white/50 hover:text-white" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="p-3 rounded-lg relative" style={{ background: 'rgba(0, 183, 181, 0.1)' }}>
                            <button
                              onClick={() => { navigator.clipboard.writeText(searchResult.certificate.id); setCopiedId(true); setTimeout(() => setCopiedId(false), 2000); }}
                              className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200"
                            >
                              <Copy className={`w-4 h-4 ${copiedId ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                            </button>
                            <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1">Unique Credential ID</p>
                            <p className="text-lg font-mono text-[#00B7B5] break-all pr-8">{searchResult.certificate.id}</p>
                          </div>
                          <div className="p-3 rounded-lg relative" style={{ background: 'rgba(0, 183, 181, 0.1)' }}>
                            <button
                              onClick={() => copyToClipboard(searchResult.certificate.hash)}
                              className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200"
                            >
                              <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                            </button>
                            <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1">Certificate Hash</p>
                            <p className="text-lg font-mono text-[#00B7B5] break-all pr-8">{searchResult.certificate.hash}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={resultItemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="rounded-xl p-4" style={resultGlassStyle}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">User Information</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Full Name</p>
                              <p className="text-sm text-white font-poppins">{searchResult.certificate.userInformation.fullName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">ID Number</p>
                              <p className="text-sm font-mono text-white/80">{maskText(searchResult.certificate.userInformation.idNumber)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Email</p>
                              <p className="text-xs font-mono text-white/70 break-all">{maskEmail(searchResult.certificate.userInformation.email)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Country</p>
                              <p className="text-sm text-white/80">{searchResult.certificate.userInformation.country}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl p-4" style={resultGlassStyle}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Program Detail</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Course Name</p>
                              <p className="text-sm text-white/90">{searchResult.certificate.programDetail.courseName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Event Code</p>
                              <p className="text-sm font-mono text-[#00B7B5]">{searchResult.certificate.programDetail.academicEventCode}</p>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Level</p>
                                <p className="text-xs text-white/80">{searchResult.certificate.programDetail.level}</p>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Language</p>
                                <p className="text-xs text-white/80">{searchResult.certificate.programDetail.language}</p>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Grade</p>
                                <p className="text-xs text-white/80">{searchResult.certificate.programDetail.grade}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl p-4" style={resultGlassStyle}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Certificates Details</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Institution</p>
                              <p className="text-sm text-white/90">{searchResult.certificate.issuingInstitution.name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Modality</p>
                              <p className="text-sm text-white/80">{searchResult.certificate.issuingInstitution.modality}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Issued Date</p>
                              <p className="text-sm text-white/80">{searchResult.certificate.dates.issueDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">Study Period</p>
                              <p className="text-xs text-white/70">{searchResult.certificate.dates.studyPeriodStart} - {searchResult.certificate.dates.studyPeriodEnd}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={resultItemVariants}
                        className="rounded-xl p-4"
                        style={resultGlassStyle}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
                          <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Credentials</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">Instructors</p>
                            <div className="flex flex-wrap gap-2">
                              {searchResult.certificate.credentials.instructors.map((instructor, idx) => (
                                <span key={idx} className="px-2 py-1 rounded text-xs text-white/80" style={{
                                  background: 'rgba(0, 183, 181, 0.15)',
                                  border: '1px solid rgba(0, 183, 181, 0.3)',
                                }}>
                                  {instructor}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">Signatories</p>
                            <div className="flex flex-wrap gap-2">
                              {searchResult.certificate.credentials.signatories.map((signatory, idx) => (
                                <span key={idx} className="px-2 py-1 rounded text-xs text-white/80" style={{
                                  background: 'rgba(0, 183, 181, 0.15)',
                                  border: '1px solid rgba(0, 183, 181, 0.3)',
                                }}>
                                  {signatory}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={resultItemVariants}
                        className="rounded-xl p-4"
                        style={resultGlassStyle}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldCheck className="w-5 h-5 text-[#00B7B5]" />
                          <p className="text-xs font-bold text-white/60 uppercase tracking-widest"># Blockchain Digital Evidence</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(0, 183, 181, 0.1)' }}>
                            <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Smart Contract Verified</p>
                            <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold ${searchResult.certificate.blockchainEvidence.smartContractVerified ? 'bg-[#00B7B5]/20 text-[#00B7B5]' : 'bg-red-500/20 text-red-400'}`}>
                              {searchResult.certificate.blockchainEvidence.smartContractVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                              {searchResult.certificate.blockchainEvidence.smartContractVerified ? 'Verified' : 'Not Verified'}
                            </span>
                          </div>

                          {[{ label: 'TX A: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txA }, { label: 'TX B: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txB }].map((item, idx) => (
                            <div key={idx} className="rounded-lg p-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">{item.label}</p>
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="font-mono text-xs text-white/70 break-all flex-1">{item.tx.hash}</span>
                                <button
                                  onClick={() => copyToClipboard(item.tx.hash)}
                                  className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0"
                                >
                                  <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40'}`} />
                                </button>
                              </div>
                              <a
                                href={item.tx.scanLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs text-[#00B7B5] hover:text-[#018790] transition-colors duration-200"
                              >
                                View on Polygonscan
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        variants={resultItemVariants}
                        className="flex gap-3"
                      >
                        <a
                          href={`/api/certificate/${searchResult.certificate.id}/audit`}
                          download
                          className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] backdrop-blur-sm text-center flex items-center justify-center gap-2"
                          style={{
                            background: 'linear-gradient(135deg, rgba(10, 30, 40, 0.6), rgba(0, 40, 50, 0.45))',
                            backdropFilter: 'blur(28px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <Download className="w-4 h-4" />
                          Audit Report
                        </a>
                        <a
                          href={`/api/certificate/${searchResult.certificate.id}/pdf`}
                          download
                          className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] backdrop-blur-sm flex items-center justify-center gap-2"
                          style={{
                            background: 'linear-gradient(to right, rgba(0, 84, 97, 0.3), rgba(244, 244, 244, 0.2))',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
                          }}
                        >
                          <Download className="w-4 h-4" />
                          PDF Download
                        </a>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      variants={resultItemVariants}
                      className="rounded-2xl p-6 text-center"
                      style={{
                        ...resultGlassStyle,
                        border: '1px solid rgba(255, 59, 48, 0.35)',
                        boxShadow: '0 12px 30px rgba(255, 59, 48, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white font-outfit mb-2">Certificate Not Found</h3>
                      <p className="text-white/70 mb-6 font-poppins">{searchResult.message}</p>
                      <button
                        onClick={resetSearch}
                        className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01]"
                        style={{
                          background: 'linear-gradient(to right, rgba(0, 84, 97, 0.3), rgba(244, 244, 244, 0.2))',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
                        }}
                      >
                        Try Another Search
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}