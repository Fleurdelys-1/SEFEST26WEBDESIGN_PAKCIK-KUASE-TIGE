"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FileUp, QrCode, Search, Upload, Lock, CheckCircle2, ArrowRight, ShieldCheck, Zap, AlertCircle, Copy, ExternalLink, X, Hash, Download, Trash2 } from 'lucide-react';
import { searchCertificate, validatePdfFile, extractPdfText, extractCertificateData, validateExtractedData } from '../../lib/utils';

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
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [origin, setOrigin] = useState('https://certify.io');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);


  const [uploadedFile, setUploadedFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [pdfSearchResult, setPdfSearchResult] = useState(null);
  const [pdfSearchOrigin, setPdfSearchOrigin] = useState('pdf');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

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
        const yOffset = -100;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchResult, initialQueryValue]);


  useEffect(() => {
    if (searchResult || pdfSearchResult) {
      const timer = setTimeout(() => {
        const resultElement = document.getElementById('search-result-area');
        if (resultElement) {
          const yOffset = -120; // Spacing below the fixed navbar
          const y = resultElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [searchResult, pdfSearchResult]);

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


  const handlePdfFileSelect = async (file) => {
    try {
      setExtractionError(null);
      setExtractedData(null);
      setPdfSearchResult(null);


      const validation = validatePdfFile(file);
      if (!validation.valid) {
        setExtractionError(validation.error);
        return;
      }

      setUploadedFile(file);
      setIsExtracting(true);


      try {
        const pdfText = await extractPdfText(file);


        const certData = extractCertificateData(pdfText);


        setExtractedData(certData);


        await new Promise(resolve => setTimeout(resolve, 500));


        const dataValidation = validateExtractedData(certData);
        if (!dataValidation.valid) {

          setPdfSearchResult({
            found: false,
            message: 'Could not extract valid Certificate ID or Hash from the PDF. Please ensure you uploaded a valid certificate file.'
          });
          setPdfSearchOrigin('pdf');
          setIsExtracting(false);
          return;
        }

        const searchTerm = certData.certId || certData.hash;
        if (searchTerm) {
          const result = searchCertificate(searchTerm);
          setPdfSearchResult(result);
          setPdfSearchOrigin('pdf');
        }
      } catch (extractError) {
        console.error('Extraction error:', extractError);

        setExtractedData({ certId: null, hash: null });
        setPdfSearchResult({
          found: false,
          message: 'Failed to process the PDF file. It might be corrupted or in an unsupported format.'
        });
        setPdfSearchOrigin('pdf');
      }
    } catch (error) {
      console.error('PDF processing error:', error);
      setExtractedData({ certId: null, hash: null });
      setPdfSearchResult({
        found: false,
        message: 'An unexpected error occurred while processing the PDF file.'
      });
      setPdfSearchOrigin('pdf');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePdfFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePdfFileSelect(e.target.files[0]);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setExtractedData(null);
    setExtractionError(null);
    setPdfSearchResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const showPdfResult = pdfSearchResult && extractedData;

  const showManualResult = searchResult && searchOrigin === 'manual';
  const showQrResult = searchResult && searchOrigin === 'qr';

  const badgeContainerVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.34, 1.56, 0.64, 1],
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const badgeContentVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const sectionTextVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
        delayChildren: 0.04,
      },
    },
  };

  const sectionItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tabContainerVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.34, 1.56, 0.64, 1],
        when: 'beforeChildren',
        staggerChildren: 0.04,
        delayChildren: 0.04,
      },
    },
  };

  const tabItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const inputRowVariants = {
    hidden: { y: 25 },
    visible: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.04,
      },
    },
  };

  const inputItemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const verifyButtonVariants = {
    hidden: { opacity: 0, x: 70 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cryptoTextVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cryptoGlassVariants = {
    hidden: { y: 25 },
    visible: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cryptoLeftButtonVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.34,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const cryptoRightButtonVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.34,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const resultContainerVariants = {
    hidden: { y: 25 },
    visible: {
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const resultItemVariants = {
    hidden: { y: 15 },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const liquidGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
    backdropFilter: 'blur(30px) saturate(210%)',
    WebkitBackdropFilter: 'blur(30px) saturate(210%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.12), 0 0 25px rgba(0, 183, 181, 0.06)',
  };

  const resultGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(32px) saturate(220%)',
    WebkitBackdropFilter: 'blur(32px) saturate(220%)',
    border: '1px solid rgba(0, 183, 181, 0.3)',
    boxShadow: '0 35px 90px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 0 35px rgba(0, 183, 181, 0.15)',
  };

  const glassCardStyle = liquidGlassStyle;

  return (
    <section id="validation" className="w-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 pt-24 sm:pt-28 lg:pt-28 pb-16 relative overflow-hidden flex flex-col items-center justify-start">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[40px] sm:rounded-t-[70px] lg:rounded-t-[100px]" />
      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          className="flex justify-center mb-6 sm:mb-8 w-full"
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
          <motion.div
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full p-2 relative overflow-hidden"
            style={liquidGlassStyle}
            variants={tabContainerVariants}
          >
            <motion.button
              type="button"
              onClick={() => setActiveTab('manual')}
              variants={tabItemVariants}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${activeTab === 'manual'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-200 ease-out ${activeTab === 'manual'
                  ? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                  : 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.manual')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.manualShort')}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setActiveTab('pdf')}
              variants={tabItemVariants}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${activeTab === 'pdf'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-200 ease-out ${activeTab === 'pdf'
                  ? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                  : 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.pdf')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.pdfShort')}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setActiveTab('qr')}
              variants={tabItemVariants}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${activeTab === 'qr'
                ? 'text-white'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-200 ease-out ${activeTab === 'qr'
                  ? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                  : 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.qr')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.qrShort')}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'manual' && (
            <motion.div
              key="manual"
              initial={{ y: 25 }}
              animate={{ y: 0 }}
              exit={{ y: 25 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
              style={{ transformOrigin: 'center bottom' }}
            >
              <div className="space-y-6">
                <motion.div
                  className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl relative overflow-hidden"
                  style={liquidGlassStyle}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={inputRowVariants}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <motion.div
                    className="flex items-center flex-shrink-0"
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
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 outline-none text-sm sm:text-base font-poppins"
                  />
                  <motion.button
                    onClick={handleSearch}
                    disabled={isSearching}
                    variants={verifyButtonVariants}
                    className="flex-shrink-0 rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.4), rgba(255, 255, 255, 0.15))',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: '0 10px 25px -5px rgba(0, 183, 181, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                    {isSearching ? t('validate.validating') : t('validate.verify')}
                  </motion.button>
                </motion.div>

                {!searchResult && (
                  <motion.div
                    className="max-w-3xl mx-auto mt-0 p-3 sm:p-4 rounded-2xl relative overflow-hidden"
                    style={liquidGlassStyle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cryptoGlassVariants}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 flex items-center justify-center">
                        <div className="w-1 h-1 bg-[#00B7B5] rounded-full" />
                      </div>
                      <motion.p className="text-xs font-bold text-[#F4F4F4] uppercase tracking-wider" variants={cryptoTextVariants}>
                        RUN A CRYPTOGRAPHIC VALIDATION TEST WITH REAL CERTIFICATE DATA:
                      </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.div
                        className="group relative px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-[transform,box-shadow,border-color] duration-300 hover:scale-105"
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
                        className="group relative px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-[transform,box-shadow,border-color] duration-300 hover:scale-105"
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
                    id="search-result-area"
                    initial="hidden"
                    animate="visible"
                    variants={resultContainerVariants}
                    className="space-y-4"
                  >
                    {searchResult.found ? (
                      <>
                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-2xl p-4 sm:p-6 relative overflow-hidden"
                          style={resultGlassStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,183,181,0.05)] pointer-events-none" />
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
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit mb-2">
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
                            <div
                              className="p-3 rounded-lg relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <button
                                onClick={() => { navigator.clipboard.writeText(searchResult.certificate.id); setCopiedId(true); setTimeout(() => setCopiedId(false), 2000); }}
                                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 z-10"
                              >
                                <Copy className={`w-4 h-4 ${copiedId ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                              </button>
                              <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1 relative z-10">Unique Credential ID</p>
                              <p className="text-lg font-mono text-[#00B7B5] break-all pr-8 relative z-10">{searchResult.certificate.id}</p>
                            </div>
                            <div
                              className="p-3 rounded-lg relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <button
                                onClick={() => copyToClipboard(searchResult.certificate.hash)}
                                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 z-10"
                              >
                                <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                              </button>
                              <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1 relative z-10">Certificate Hash</p>
                              <p className="text-lg font-mono text-[#00B7B5] break-all pr-8 relative z-10">{searchResult.certificate.hash}</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div className="rounded-xl p-4 relative overflow-hidden" style={resultGlassStyle}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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

                          <div className="rounded-xl p-4 relative overflow-hidden" style={resultGlassStyle}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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

                          <div className="rounded-xl p-4 relative overflow-hidden" style={resultGlassStyle}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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
                          className="rounded-xl p-4 relative overflow-hidden"
                          style={resultGlassStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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
                          className="rounded-xl p-4 relative overflow-hidden"
                          style={resultGlassStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-[#00B7B5]" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest"># Blockchain Digital Evidence</p>
                          </div>
                          <div className="space-y-3">
                            <div
                              className="flex items-center justify-between p-3 rounded-lg relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold relative z-10">Smart Contract Verified</p>
                              <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold relative z-10 ${searchResult.certificate.blockchainEvidence.smartContractVerified ? 'bg-[#00B7B5]/20 text-[#00B7B5]' : 'bg-red-500/20 text-red-400'}`}>
                                {searchResult.certificate.blockchainEvidence.smartContractVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {searchResult.certificate.blockchainEvidence.smartContractVerified ? 'Verified' : 'Not Verified'}
                              </span>
                            </div>

                            {[{ label: 'TX A: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txA }, { label: 'TX B: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txB }].map((item, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg p-3 relative overflow-hidden"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                                  backdropFilter: 'blur(10px)',
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 relative z-10">{item.label}</p>
                                <div className="flex items-center gap-2 mb-2 flex-wrap relative z-10">
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
                                  className="inline-flex items-center gap-2 text-xs text-[#00B7B5] hover:text-[#018790] transition-colors duration-200 relative z-10"
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
                          className="flex flex-col sm:flex-row gap-3"
                        >
                          <a
                            href={searchResult.certificate.auditReportPdf || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={Boolean(searchResult.certificate.auditReportPdf)}
                            className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2 relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                              opacity: searchResult.certificate.auditReportPdf ? 1 : 0.5,
                              pointerEvents: searchResult.certificate.auditReportPdf ? 'auto' : 'none',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                            <Download className="w-4 h-4" />
                            Audit Report
                          </a>
                          <a
                            href={searchResult.certificate.certificatePdf || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={Boolean(searchResult.certificate.certificatePdf)}
                            className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md flex items-center justify-center gap-2 relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.3), rgba(255, 255, 255, 0.1))',
                              border: '1px solid rgba(255, 255, 255, 0.35)',
                              boxShadow: '0 15px 30px -5px rgba(0, 183, 181, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                              opacity: searchResult.certificate.certificatePdf ? 1 : 0.5,
                              pointerEvents: searchResult.certificate.certificatePdf ? 'auto' : 'none',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                            <Download className="w-4 h-4" />
                            PDF Download
                          </a>
                        </motion.div>
                      </>
                    ) : (
                      <motion.div
                        variants={resultItemVariants}
                        className="rounded-2xl p-6 text-center relative overflow-hidden"
                        style={{
                          ...resultGlassStyle,
                          border: '1px solid rgba(255, 59, 48, 0.45)',
                          boxShadow: '0 12px 30px rgba(255, 59, 48, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent pointer-events-none" />
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white font-outfit mb-2">Certificate Not Found</h3>
                        <p className="text-white/70 mb-6 font-poppins">{searchResult.message}</p>
                        <button
                          onClick={resetSearch}
                          className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.4), rgba(255, 255, 255, 0.15))',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 10px 25px -5px rgba(0, 183, 181, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
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
              initial={{ y: 25 }}
              animate={{ y: 0 }}
              exit={{ y: 25 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto space-y-6"
              style={{ transformOrigin: 'center bottom' }}
            >
              {!uploadedFile && (
                <div className="space-y-6">
                  <motion.div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`py-6 px-8 sm:py-8 sm:px-10 rounded-[32px] transition-[transform,box-shadow,border-color] duration-300 cursor-pointer overflow-hidden relative group ${dragActive ? 'scale-[1.01] shadow-[0_0_40px_rgba(0,183,181,0.2)]' : ''}`}
                    style={{
                      ...liquidGlassStyle,
                      border: dragActive
                        ? '2px solid rgba(0, 183, 181, 0.6)'
                        : liquidGlassStyle.border,
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    { }
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/5 via-transparent to-white/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center gap-6 relative z-10">
                      { }
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-[#00B7B5]/20 rounded-full blur-2xl"
                          animate={{
                            scale: dragActive ? [1, 1.15, 1] : 1,
                            opacity: dragActive ? [0.4, 0.7, 0.4] : 0.25
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="p-5 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative">
                          <Upload className={`w-10 h-10 transition-colors duration-300 ${dragActive ? 'text-[#00B7B5]' : 'text-white/80'}`} />
                        </div>
                      </div>

                      <div className="text-center max-w-md mx-auto">
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit mb-2 tracking-tight">
                          {t('validate.pdf.title')}
                        </h3>
                        <p className="text-white/60 text-sm sm:text-base font-poppins leading-relaxed">
                          {t('validate.pdf.description')}
                        </p>


                      </div>

                      { }
                      <motion.p
                        className="text-sm font-semibold text-[#00B7B5] mt-4 flex items-center gap-2"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span className="w-1.5 h-1.5 bg-[#00B7B5] rounded-full" />
                        {t('validate.pdf.clickUpload')}
                      </motion.p>
                    </div>
                  </motion.div>

                  { }
                  <AnimatePresence>
                    {extractionError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-lg p-4 flex items-start gap-3"
                        style={{
                          background: 'rgba(255, 59, 48, 0.1)',
                          border: '1px solid rgba(255, 59, 48, 0.3)',
                        }}
                      >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-red-300 mb-1">
                            {t('validate.pdf.uploadError')}
                          </p>
                          <p className="text-xs text-red-200/80">
                            {extractionError === 'fileType'
                              ? t('validate.pdf.fileTypeError')
                              : extractionError === 'fileEmpty'
                                ? t('validate.pdf.fileEmptyError')
                                : extractionError === 'fileSize'
                                  ? t('validate.pdf.fileSizeError')
                                  : extractionError === 'corrupted'
                                    ? t('validate.pdf.corruptedError')
                                    : extractionError === 'noData'
                                      ? t('validate.pdf.noDataFound')
                                      : extractionError === 'noCertId'
                                        ? t('validate.pdf.certIdNotFound')
                                        : t('validate.pdf.hashNotFound')}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  { }
                  <div
                    className="p-5 sm:p-6 rounded-3xl relative overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:scale-[1.01] group"
                    style={liquidGlassStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#018790]/15 text-[#00B7B5]">
                          <FileUp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
                            {t('validate.pdf.downloadTestCert')}
                          </p>
                          <p className="mt-1 text-sm text-white/70 font-poppins">
                            {t('validate.pdf.downloadTestDesc')}
                          </p>
                        </div>
                      </div>
                      <a
                        href="/file/CERT-TEST.pdf"
                        download
                        type="button"
                        className="w-full sm:min-w-[180px] sm:w-auto rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.35), rgba(255, 255, 255, 0.15))',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          boxShadow: '0 12px 24px -5px rgba(0, 183, 181, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                        <Download className="w-4 h-4" />
                        {t('validate.pdf.downloadBtn')}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              { }
              <AnimatePresence>
                {isExtracting && (
                  <motion.div
                    key="extracting-state"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl p-8 text-center space-y-4"
                    style={resultGlassStyle}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 rounded-full border-2 border-[#00B7B5]/30 border-t-[#00B7B5] mx-auto"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white mb-1">
                        {t('validate.pdf.extractingData')}
                      </p>
                      <p className="text-sm text-white/60">
                        {t('validate.pdf.searchingCertificate')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              { }
              <AnimatePresence>
                {uploadedFile && !isExtracting && extractedData && (
                  <motion.div
                    key="extracted-data-display"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    { }
                    <div
                      className="p-4 rounded-lg flex items-center justify-between relative overflow-hidden"
                      style={liquidGlassStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                      <div className="flex items-center gap-3 flex-1 min-w-0 relative z-10">
                        <FileUp className="w-5 h-5 text-[#00B7B5] flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                            File Uploaded
                          </p>
                          <p className="text-sm text-white truncate">{uploadedFile.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeUploadedFile}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0 relative z-10"
                      >
                        <Trash2 className="w-4 h-4 text-white/50 hover:text-white" />
                      </button>
                    </div>


                  </motion.div>
                )}
              </AnimatePresence>

              { }
              <AnimatePresence>
                {showPdfResult && (
                  <motion.div
                    id="search-result-area"
                    key="pdf-search-result"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={resultContainerVariants}
                    className="space-y-4"
                  >
                    {pdfSearchResult.found ? (
                      <>
                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-2xl p-4 sm:p-6 relative overflow-hidden"
                          style={resultGlassStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,183,181,0.05)] pointer-events-none" />
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div
                                className={`flex-shrink-0 p-2 rounded-full ${pdfSearchResult.isActive
                                    ? 'bg-[#00B7B5]/20'
                                    : 'bg-red-500/20'
                                  }`}
                              >
                                <CheckCircle2
                                  className={`w-6 h-6 ${pdfSearchResult.isActive
                                      ? 'text-[#00B7B5]'
                                      : 'text-red-400'
                                    }`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span
                                    className="px-3 py-1 rounded-full text-xs font-bold text-[#F4F4F4]/80 backdrop-blur-md"
                                    style={{
                                      background: 'rgba(0, 84, 97, 0.4)',
                                      border: '1px solid rgba(0, 183, 181, 0.5)',
                                    }}
                                  >
                                    STATUS: {pdfSearchResult.certificate.status}
                                  </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit mb-2">
                                  {pdfSearchResult.isActive
                                    ? 'Valid Certificate'
                                    : 'Certificate Revoked'}
                                </h3>
                                <p className="text-sm text-white/70 font-poppins">
                                  {pdfSearchResult.certificate.statusReason}
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <button
                                onClick={() => removeUploadedFile()}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                              >
                                <X className="w-5 h-5 text-white/50 hover:text-white" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            <div
                              className="p-3 rounded-lg relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    pdfSearchResult.certificate.id
                                  );
                                  setCopiedId(true);
                                  setTimeout(() => setCopiedId(false), 2000);
                                }}
                                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 z-10"
                              >
                                <Copy
                                  className={`w-4 h-4 ${copiedId
                                      ? 'text-[#00B7B5]'
                                      : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'
                                    }`}
                                />
                              </button>
                              <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1 relative z-10">
                                Unique Credential ID
                              </p>
                              <p className="text-lg font-mono text-[#00B7B5] break-all pr-8 relative z-10">
                                {pdfSearchResult.certificate.id}
                              </p>
                            </div>
                            <div
                              className="p-3 rounded-lg relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    pdfSearchResult.certificate.hash
                                  );
                                  setCopiedHash(true);
                                  setTimeout(() => setCopiedHash(false), 2000);
                                }}
                                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 z-10"
                              >
                                <Copy
                                  className={`w-4 h-4 ${copiedHash
                                      ? 'text-[#00B7B5]'
                                      : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'
                                    }`}
                                />
                              </button>
                              <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1 relative z-10">
                                Certificate Hash
                              </p>
                              <p className="text-lg font-mono text-[#00B7B5] break-all pr-8 relative z-10">
                                {pdfSearchResult.certificate.hash}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div
                            className="rounded-xl p-4 relative overflow-hidden"
                            style={resultGlassStyle}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
                              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
                                User Information
                              </p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Full Name
                                </p>
                                <p className="text-sm text-white font-poppins">
                                  {pdfSearchResult.certificate.userInformation.fullName}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  ID Number
                                </p>
                                <p className="text-sm font-mono text-white/80">
                                  {maskText(
                                    pdfSearchResult.certificate.userInformation
                                      .idNumber
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Email
                                </p>
                                <p className="text-xs font-mono text-white/70 break-all">
                                  {maskEmail(
                                    pdfSearchResult.certificate.userInformation
                                      .email
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Country
                                </p>
                                <p className="text-sm text-white/80">
                                  {
                                    pdfSearchResult.certificate.userInformation
                                      .country
                                  }
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="rounded-xl p-4 relative overflow-hidden"
                            style={resultGlassStyle}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
                              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
                                Program Detail
                              </p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Course Name
                                </p>
                                <p className="text-sm text-white/90">
                                  {
                                    pdfSearchResult.certificate.programDetail
                                      .courseName
                                  }
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Event Code
                                </p>
                                <p className="text-sm font-mono text-[#00B7B5]">
                                  {
                                    pdfSearchResult.certificate.programDetail
                                      .academicEventCode
                                  }
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                    Level
                                  </p>
                                  <p className="text-xs text-white/80">
                                    {
                                      pdfSearchResult.certificate.programDetail
                                        .level
                                    }
                                  </p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                    Language
                                  </p>
                                  <p className="text-xs text-white/80">
                                    {
                                      pdfSearchResult.certificate.programDetail
                                        .language
                                    }
                                  </p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                    Grade
                                  </p>
                                  <p className="text-xs text-white/80">
                                    {
                                      pdfSearchResult.certificate.programDetail
                                        .grade
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="rounded-xl p-4 relative overflow-hidden"
                            style={resultGlassStyle}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
                              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
                                Certificates Details
                              </p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Institution
                                </p>
                                <p className="text-sm text-white/90">
                                  {
                                    pdfSearchResult.certificate.issuingInstitution
                                      .name
                                  }
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Modality
                                </p>
                                <p className="text-sm text-white/80">
                                  {
                                    pdfSearchResult.certificate.issuingInstitution
                                      .modality
                                  }
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Issued Date
                                </p>
                                <p className="text-sm text-white/80">
                                  {pdfSearchResult.certificate.dates.issueDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-1">
                                  Study Period
                                </p>
                                <p className="text-xs text-white/70">
                                  {
                                    pdfSearchResult.certificate.dates
                                      .studyPeriodStart
                                  }{' '}
                                  -{' '}
                                  {
                                    pdfSearchResult.certificate.dates
                                      .studyPeriodEnd
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-xl p-4 relative overflow-hidden"
                          style={resultGlassStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
                              Credentials
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">
                                Instructors
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {pdfSearchResult.certificate.credentials.instructors.map(
                                  (instructor, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 rounded text-xs text-white/80"
                                      style={{
                                        background: 'rgba(0, 183, 181, 0.15)',
                                        border: '1px solid rgba(0, 183, 181, 0.3)',
                                      }}
                                    >
                                      {instructor}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">
                                Signatories
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {pdfSearchResult.certificate.credentials.signatories.map(
                                  (signatory, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 rounded text-xs text-white/80"
                                      style={{
                                        background: 'rgba(0, 183, 181, 0.15)',
                                        border: '1px solid rgba(0, 183, 181, 0.3)',
                                      }}
                                    >
                                      {signatory}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={resultItemVariants}
                          className="rounded-xl p-4 relative overflow-hidden"
                          style={resultGlassStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-[#00B7B5]" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
                              # Blockchain Digital Evidence
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div
                              className="flex items-center justify-between p-3 rounded-lg relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold relative z-10">
                                Smart Contract Verified
                              </p>
                              <span
                                className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold relative z-10 ${pdfSearchResult.certificate.blockchainEvidence
                                    .smartContractVerified
                                    ? 'bg-[#00B7B5]/20 text-[#00B7B5]'
                                    : 'bg-red-500/20 text-red-400'
                                  }`}
                              >
                                {pdfSearchResult.certificate.blockchainEvidence
                                  .smartContractVerified ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                  <AlertCircle className="w-3 h-3" />
                                )}
                                {pdfSearchResult.certificate.blockchainEvidence
                                  .smartContractVerified
                                  ? 'Verified'
                                  : 'Not Verified'}
                              </span>
                            </div>

                            {[
                              {
                                label: 'TX A: IDENTITY RECORD',
                                tx: pdfSearchResult.certificate.blockchainEvidence
                                  .txA,
                              },
                              {
                                label: 'TX B: IDENTITY RECORD',
                                tx: pdfSearchResult.certificate.blockchainEvidence
                                  .txB,
                              },
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg p-3 relative overflow-hidden"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                                  backdropFilter: 'blur(10px)',
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 relative z-10">
                                  {item.label}
                                </p>
                                <div className="flex items-center gap-2 mb-2 flex-wrap relative z-10">
                                  <span className="font-mono text-xs text-white/70 break-all flex-1">
                                    {item.tx.hash}
                                  </span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.tx.hash);
                                      setCopiedHash(true);
                                      setTimeout(() => setCopiedHash(false), 2000);
                                    }}
                                    className="p-1 hover:bg-white/10 rounded transition-colors duration-200 flex-shrink-0"
                                  >
                                    <Copy
                                      className={`w-4 h-4 ${copiedHash
                                          ? 'text-[#00B7B5]'
                                          : 'text-[#F4F4F4]/40'
                                        }`}
                                    />
                                  </button>
                                </div>
                                <a
                                  href={item.tx.scanLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs text-[#00B7B5] hover:text-[#018790] transition-colors duration-200 relative z-10"
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
                          className="flex flex-col sm:flex-row gap-3"
                        >
                          <a
                            href={pdfSearchResult.certificate.auditReportPdf || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={Boolean(pdfSearchResult.certificate.auditReportPdf)}
                            className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2 relative overflow-hidden"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              boxShadow:
                                '0 12px 24px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                              opacity: pdfSearchResult.certificate.auditReportPdf ? 1 : 0.5,
                              pointerEvents: pdfSearchResult.certificate.auditReportPdf ? 'auto' : 'none',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                            <Download className="w-4 h-4" />
                            Audit Report
                          </a>
                          <a
                            href={pdfSearchResult.certificate.certificatePdf || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={Boolean(pdfSearchResult.certificate.certificatePdf)}
                            className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md flex items-center justify-center gap-2 relative overflow-hidden"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(0, 183, 181, 0.3), rgba(255, 255, 255, 0.1))',
                              border: '1px solid rgba(255, 255, 255, 0.35)',
                              boxShadow: '0 15px 30px -5px rgba(0, 183, 181, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                              opacity: pdfSearchResult.certificate.certificatePdf ? 1 : 0.5,
                              pointerEvents: pdfSearchResult.certificate.certificatePdf ? 'auto' : 'none',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                            <Download className="w-4 h-4" />
                            PDF Download
                          </a>
                        </motion.div>
                      </>
                    ) : (
                      <motion.div
                        variants={resultItemVariants}
                        className="rounded-2xl p-6 text-center relative overflow-hidden"
                        style={{
                          ...resultGlassStyle,
                          border: '1px solid rgba(255, 59, 48, 0.45)',
                          boxShadow:
                            '0 12px 30px rgba(255, 59, 48, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent pointer-events-none" />
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white font-outfit mb-2">
                          Certificate Not Found
                        </h3>
                        <p className="text-white/70 mb-6 font-poppins">
                          {pdfSearchResult.message}
                        </p>
                        <button
                          onClick={() => removeUploadedFile()}
                          className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md relative overflow-hidden"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(0, 183, 181, 0.4), rgba(255, 255, 255, 0.15))',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 10px 25px -5px rgba(0, 183, 181, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                          {t('validate.pdf.tryAgain')}
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'qr' && (
            <motion.div
              key="qr"
              initial={{ y: 25 }}
              animate={{ y: 0 }}
              exit={{ y: 25 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
              style={{ transformOrigin: 'center bottom' }}
            >
              {!showQrResult ? (
                <div className="rounded-3xl p-4 sm:p-6 relative overflow-hidden" style={liquidGlassStyle}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-[320px_1fr] gap-6 sm:gap-8 items-center">
                      <div className="flex justify-center sm:justify-start">
                        <div
                          className="p-6 rounded-2xl flex flex-col items-center gap-4 w-full max-w-[320px] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] relative overflow-hidden"
                          style={glassCardStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
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
                        className="rounded-2xl p-4 sm:p-6 relative overflow-hidden"
                        style={resultGlassStyle}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,183,181,0.05)] pointer-events-none" />
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
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit mb-2">
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
                          <div
                            className="p-3 rounded-lg relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <button
                              onClick={() => { navigator.clipboard.writeText(searchResult.certificate.id); setCopiedId(true); setTimeout(() => setCopiedId(false), 2000); }}
                              className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 z-10"
                            >
                              <Copy className={`w-4 h-4 ${copiedId ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                            </button>
                            <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1 relative z-10">Unique Credential ID</p>
                            <p className="text-lg font-mono text-[#00B7B5] break-all pr-8 relative z-10">{searchResult.certificate.id}</p>
                          </div>
                          <div
                            className="p-3 rounded-lg relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <button
                              onClick={() => copyToClipboard(searchResult.certificate.hash)}
                              className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 z-10"
                            >
                              <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-[#F4F4F4]/40 hover:text-[#F4F4F4]/70'}`} />
                            </button>
                            <p className="text-xs text-[#F4F4F4]/60 uppercase tracking-widest font-semibold mb-1 relative z-10">Certificate Hash</p>
                            <p className="text-lg font-mono text-[#00B7B5] break-all pr-8 relative z-10">{searchResult.certificate.hash}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={resultItemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="rounded-xl p-4 relative overflow-hidden" style={resultGlassStyle}>
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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

                        <div className="rounded-xl p-4 relative overflow-hidden" style={resultGlassStyle}>
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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

                        <div className="rounded-xl p-4 relative overflow-hidden" style={resultGlassStyle}>
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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
                        className="rounded-xl p-4 relative overflow-hidden"
                        style={resultGlassStyle}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-[#00B7B5] rounded-full" />
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
                        className="rounded-xl p-4 relative overflow-hidden"
                        style={resultGlassStyle}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4">
                          <ShieldCheck className="w-5 h-5 text-[#00B7B5]" />
                          <p className="text-xs font-bold text-white/60 uppercase tracking-widest"># Blockchain Digital Evidence</p>
                        </div>
                        <div className="space-y-3">
                          <div
                            className="flex items-center justify-between p-3 rounded-lg relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.15) 0%, rgba(0, 183, 181, 0.05) 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <p className="text-xs text-white/60 uppercase tracking-wider font-semibold relative z-10">Smart Contract Verified</p>
                            <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold relative z-10 ${searchResult.certificate.blockchainEvidence.smartContractVerified ? 'bg-[#00B7B5]/20 text-[#00B7B5]' : 'bg-red-500/20 text-red-400'}`}>
                              {searchResult.certificate.blockchainEvidence.smartContractVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                              {searchResult.certificate.blockchainEvidence.smartContractVerified ? 'Verified' : 'Not Verified'}
                            </span>
                          </div>

                          {[{ label: 'TX A: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txA }, { label: 'TX B: IDENTITY RECORD', tx: searchResult.certificate.blockchainEvidence.txB }].map((item, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg p-3 relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 relative z-10">{item.label}</p>
                              <div className="flex items-center gap-2 mb-2 flex-wrap relative z-10">
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
                                className="inline-flex items-center gap-2 text-xs text-[#00B7B5] hover:text-[#018790] transition-colors duration-200 relative z-10"
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
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <a
                          href={searchResult.certificate.auditReportPdf || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={Boolean(searchResult.certificate.auditReportPdf)}
                          className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2 relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                            opacity: searchResult.certificate.auditReportPdf ? 1 : 0.5,
                            pointerEvents: searchResult.certificate.auditReportPdf ? 'auto' : 'none',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                          <Download className="w-4 h-4" />
                          Audit Report
                        </a>
                        <a
                          href={searchResult.certificate.certificatePdf || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={Boolean(searchResult.certificate.certificatePdf)}
                          className="flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md flex items-center justify-center gap-2 relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.3), rgba(255, 255, 255, 0.1))',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            boxShadow: '0 15px 30px -5px rgba(0, 183, 181, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                            opacity: searchResult.certificate.certificatePdf ? 1 : 0.5,
                            pointerEvents: searchResult.certificate.certificatePdf ? 'auto' : 'none',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                          <Download className="w-4 h-4" />
                          PDF Download
                        </a>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      variants={resultItemVariants}
                      className="rounded-2xl p-6 text-center relative overflow-hidden"
                      style={{
                        ...resultGlassStyle,
                        border: '1px solid rgba(255, 59, 48, 0.45)',
                        boxShadow: '0 12px 30px rgba(255, 59, 48, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent pointer-events-none" />
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white font-outfit mb-2">Certificate Not Found</h3>
                      <p className="text-white/70 mb-6 font-poppins">{searchResult.message}</p>
                      <button
                        onClick={resetSearch}
                        className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.4), rgba(255, 255, 255, 0.15))',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          boxShadow: '0 10px 25px -5px rgba(0, 183, 181, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
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