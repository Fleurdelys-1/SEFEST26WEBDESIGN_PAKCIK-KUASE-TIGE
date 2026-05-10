"use client";

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileUp, QrCode, Search, Upload, Lock, CheckCircle2 } from 'lucide-react';

export default function Validation() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('manual');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="validation" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#00B7B5]/10 to-transparent pointer-events-none rounded-t-[100px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-center mb-6 sm:mb-8">
          <span
            className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-white/90 backdrop-blur-md shadow flex items-center gap-2"
            style={{
              background: 'rgba(0, 84, 97, 0.3)',
              border: '1px solid rgba(0, 183, 181, 0.4)',
              boxShadow: '0 0 20px rgba(0, 183, 181, 0.2)',
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            {t('validate.badge')}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#F4F4F4] mb-4 font-outfit drop-shadow-lg">
          {t('validate.title')}
        </h2>

        <p className="text-center text-base sm:text-lg text-[#F4F4F4]/75 max-w-2xl mx-auto mb-12 font-poppins">
          {t('validate.description')}
        </p>

        <div
          className="mb-8 sm:mb-10 p-1 rounded-2xl max-w-3xl mx-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(0, 183, 181, 0.15)',
            boxShadow: '0 0 30px rgba(0, 183, 181, 0.08)',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-1">
            <button
              onClick={() => setActiveTab('manual')}
              className={`group flex-1 relative px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'manual'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-0 rounded-xl transition-all duration-300 ${activeTab === 'manual'
                    ? 'bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                    : 'bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <Search className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.manual')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.manualShort')}</span>
            </button>

            <button
              onClick={() => setActiveTab('pdf')}
              className={`group flex-1 relative px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'pdf'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-0 rounded-xl transition-all duration-300 ${activeTab === 'pdf'
                    ? 'bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                    : 'bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <FileUp className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.pdf')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.pdfShort')}</span>
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`group flex-1 relative px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'qr'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                }`}
            >
              <span
                className={`absolute inset-0 rounded-xl transition-all duration-300 ${activeTab === 'qr'
                    ? 'bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
                    : 'bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
                  }`}
              />
              <QrCode className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">{t('validate.tabs.qr')}</span>
              <span className="sm:hidden relative z-10">{t('validate.tabs.qrShort')}</span>
            </button>
          </div>
        </div>

        <div
          className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(15px)',
            border: '2px dashed rgba(0, 183, 181, 0.3)',
            boxShadow: '0 0 40px rgba(0, 183, 181, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            minHeight: '280px',
          }}
        >
          {activeTab === 'manual' && (
            <div className="space-y-6">
              <div
                className="relative group"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 183, 181, 0.2)',
                  borderRadius: '1rem',
                  boxShadow: '0 0 20px rgba(0, 183, 181, 0.05)',
                  padding: '1rem',
                }}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={t('validate.placeholder')}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base font-poppins"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="group relative px-6 sm:px-8 py-2 rounded-lg font-semibold text-white flex-shrink-0 overflow-hidden transition-all duration-300 disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 84, 97, 0.6) 0%, rgba(1, 135, 144, 0.4) 100%)',
                      border: '1px solid rgba(0, 183, 181, 0.3)',
                      boxShadow: '0 0 15px rgba(0, 183, 181, 0.2)',
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative whitespace-nowrap text-sm">
                      {isSearching ? t('validate.validating') : t('validate.verify')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-6 flex flex-col items-center justify-center">
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(0, 84, 97, 0.3)',
                  border: '1px solid rgba(0, 183, 181, 0.3)',
                }}
              >
                <Upload className="w-10 h-10 text-cyan-400" />
              </div>
              <div className="text-center">
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
          )}

          {activeTab === 'qr' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center mb-4">
                <span
                  className="px-4 py-2 rounded-full text-xs font-bold text-blue-400 flex items-center gap-2"
                  style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <QrCode className="w-3 h-3" />
                  {t('validate.qr.badge')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="flex justify-center sm:justify-start">
                  <div
                    className="p-6 rounded-2xl flex flex-col items-center gap-4"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 183, 181, 0.2)',
                    }}
                  >
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(0, 183, 181, 0.3)',
                      }}
                    >
                      <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect x="10" y="10" width="30" height="30" fill="black" />
                          <rect x="10" y="60" width="30" height="30" fill="black" />
                          <rect x="60" y="10" width="30" height="30" fill="black" />
                          <rect x="25" y="25" width="5" height="5" fill="white" />
                          <rect x="25" y="75" width="5" height="5" fill="white" />
                          <rect x="75" y="25" width="5" height="5" fill="white" />
                          <rect x="40" y="40" width="20" height="20" fill="black" />
                          <rect x="50" y="50" width="10" height="10" fill="white" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                        {t('validate.qr.certificateName')}
                      </p>
                      <p className="text-xs text-cyan-400 font-mono mt-1">
                        {t('validate.qr.certificateId')}
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
          )}
        </div>

        {activeTab === 'manual' && (
          <div
            className="max-w-3xl mx-auto mt-8 p-6 sm:p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(15px)',
              border: '2px dashed rgba(0, 183, 181, 0.3)',
              boxShadow: '0 0 30px rgba(0, 183, 181, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wider">
                RUN A CRYPTOGRAPHIC VALIDATION TEST WITH REAL CERTIFICATE DATA:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="flex-1 px-6 py-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 183, 181, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 183, 181, 0.08)',
                }}
              >
                <span className="text-sm font-bold text-cyan-400">ID:</span>
                <span className="font-mono font-semibold text-white">CERT-B6F9116C1C14</span>
              </div>
              <div
                className="flex-1 px-6 py-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 183, 181, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 183, 181, 0.08)',
                }}
              >
                <span className="text-sm font-bold text-cyan-400">Hash:</span>
                <span className="font-mono font-semibold text-cyan-300">68d13e...aaf</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
