"use client";

import { useState } from "react";
import { ArrowLeft, ChevronLeft, Mail, CalendarIcon, Check, Copy, X } from "lucide-react";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import languageOptionsData from "../../data/language.json";

const { languageOptions, regionOptions } = languageOptionsData;

const initialForm = {
  name: "",
  number: "",
  digitalContact: "",
  region: "United States (US)",
  certificateName: "",
  eventCode: "",
  issuingInstitution: "",
  language: "English",
  level: "Intermediate",
  certificateIssue: null,
  modality: "Online (Synchronous)",
  studyPeriod: null,
  instructors: "",
  signer: "",
};

const requiredFields = [
  "name",
  "number",
  "digitalContact",
  "region",
  "certificateName",
  "eventCode",
  "issuingInstitution",
  "language",
  "level",
  "certificateIssue",
  "modality",
  "studyPeriod",
  "instructors",
  "signer",
];



const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const modalityOptions = [
  "Online (Synchronous)",
  "Online (Asynchronous)",
  "Offline",
];

const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const labelClass =
  "flex flex-col text-[10px] sm:text-[11px] text-[#F4F4F4]/60 font-medium tracking-wide";

const LabelText = ({ children }) => (
  <span className="flex items-center gap-0.5">{children}</span>
);

const dropdownVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: "easeOut",
      when: "beforeChildren",
      delayChildren: 0.06,
      staggerChildren: 0.04,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
};

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.16, ease: "easeOut" },
  },
};

export default function RegisterPage() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [registeredData, setRegisteredData] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopy = async (text, type) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'id') {
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
      } else if (type === 'hash') {
        setCopiedHash(true);
        setTimeout(() => setCopiedHash(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    setRegisteredData(null);
    setForm(initialForm);
    setTouched({});
  };

  const getLevelLabel = (lvl) => {
    const levels = {
      en: { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" },
      id: { Beginner: "Pemula", Intermediate: "Menengah", Advanced: "Mahir" },
      zh: { Beginner: "初级", Intermediate: "中级", Advanced: "高级" },
      ko: { Beginner: "초급", Intermediate: "중급", Advanced: "고급" },
      ja: { Beginner: "初級", Intermediate: "中級", Advanced: "上級" },
      fr: { Beginner: "Débutant", Intermediate: "Intermédiaire", Advanced: "Avancé" },
      de: { Beginner: "Anfänger", Intermediate: "Mittelstufe", Advanced: "Fortgeschritten" },
    };
    return levels[language]?.[lvl] || lvl;
  };

  const getModalityLabel = (mod) => {
    const modalities = {
      en: {
        "Online (Synchronous)": "Online (Synchronous)",
        "Online (Asynchronous)": "Online (Asynchronous)",
        "Offline": "Offline"
      },
      id: {
        "Online (Synchronous)": "Online (Sinkron)",
        "Online (Asynchronous)": "Online (Asinkron)",
        "Offline": "Offline"
      },
      zh: {
        "Online (Synchronous)": "线上（同步）",
        "Online (Asynchronous)": "线上（异步）",
        "Offline": "线下"
      },
      ko: {
        "Online (Synchronous)": "온라인 (동기)",
        "Online (Asynchronous)": "온라인 (비동기)",
        "Offline": "오프라인"
      },
      ja: {
        "Online (Synchronous)": "オンライン（同期）",
        "Online (Asynchronous)": "オンライン（非同期）",
        "Offline": "オフライン"
      },
      fr: {
        "Online (Synchronous)": "En ligne (synchrone)",
        "Online (Asynchronous)": "En ligne (asynchrone)",
        "Offline": "Hors ligne"
      },
      de: {
        "Online (Synchronous)": "Online (synchron)",
        "Online (Asynchronous)": "Online (asynchron)",
        "Offline": "Offline"
      }
    };
    return modalities[language]?.[mod] || mod;
  };

  const getLanguageLabel = (lang) => {
    const languages = {
      en: { English: "English", Indonesian: "Indonesian", Spanish: "Spanish", French: "French", German: "German", Italian: "Italian", Portuguese: "Portuguese", Russian: "Russian", Japanese: "Japanese", "Chinese (Mandarin)": "Chinese (Mandarin)", Korean: "Korean" },
      id: { English: "Inggris", Indonesian: "Indonesia", Spanish: "Spanyol", French: "Prancis", German: "Jerman", Italian: "Italia", Portuguese: "Portugis", Russian: "Rusia", Japanese: "Jepang", "Chinese (Mandarin)": "Mandarin", Korean: "Korea" },
      zh: { English: "英语", Indonesian: "印尼语", Spanish: "西班牙语", French: "法语", German: "德语", Italian: "意大利语", Portuguese: "葡萄牙语", Russian: "俄语", Japanese: "日语", "Chinese (Mandarin)": "中文（普通话）", Korean: "韩语" },
      ko: { English: "영어", Indonesian: "인도네시아어", Spanish: "스페인어", French: "불어", German: "독어", Italian: "이탈리아어", Portuguese: "포르투갈어", Russian: "러시아어", Japanese: "일본어", "Chinese (Mandarin)": "중국어 (만다린)", Korean: "한국어" },
      ja: { English: "英語", Indonesian: "インドネシア語", Spanish: "スペイン語", French: "フランス語", German: "ドイツ語", Italian: "イタリア語", Portuguese: "ポルトガル語", Russian: "ロシア語", Japanese: "日本語", "Chinese (Mandarin)": "中国語（北京語）", Korean: "韓国語" },
      fr: { English: "Anglais", Indonesian: "Indonésien", Spanish: "Espagnol", French: "Français", German: "Allemand", Italian: "Italien", Portuguese: "Portugais", Russian: "Russe", Japanese: "Japonais", "Chinese (Mandarin)": "Chinois (Mandarin)", Korean: "Coréen" },
      de: { English: "Englisch", Indonesian: "Indonesisch", Spanish: "Spanisch", French: "Französisch", German: "Deutsch", Italian: "Italienisch", Portuguese: "Portugiesisch", Russian: "Russisch", Japanese: "Japanisch", "Chinese (Mandarin)": "Chinesisch (Mandarin)", Korean: "Koreanisch" },
    };
    return languages[language]?.[lang] || lang;
  };

  const formContainerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.3,
      },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
  };

  const fieldContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const validate = (data) => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      const fieldLabel = t("register.fields." + field);
      if (field === "certificateIssue") {
        if (!data[field]) {
          newErrors[field] = `${fieldLabel} ${t("register.errors.required")}`;
        }
      } else if (field === "studyPeriod") {
        if (!data[field] || !data[field].from || !data[field].to) {
          newErrors[field] = `${fieldLabel} ${t("register.errors.required")}`;
        }
      } else if (!data[field] || data[field].toString().trim() === "") {
        newErrors[field] = `${fieldLabel} ${t("register.errors.required")}`;
      }
    });

    if (data.digitalContact && !newErrors.digitalContact) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.digitalContact)) {
        newErrors.digitalContact = t("register.errors.validEmail");
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "certificateIssue") formatted = formatDateInput(value);

    if (name === "number") {
      formatted = value.replace(/\D/g, "");
    }
    const updatedForm = { ...form, [name]: formatted };
    setForm(updatedForm);

    setOpenDropdowns({});
    if (touched[name]) {
      const newErrors = validate(updatedForm);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = requiredFields.reduce(
      (acc, f) => ({ ...acc, [f]: true }),
      {},
    );
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        setRegisteredData({
          id: data.id,
          hash: data.hash
        });
        setSuccess(true);
        if (window.innerWidth < 1024) {
          setTimeout(() => {
            const msgEl = document.getElementById("success-message");
            if (msgEl) {
              msgEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100);
        }
      } else {
        alert("Registration failed: " + data.error);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  const getInputClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border text-[#F4F4F4] placeholder-[#F4F4F4]/30 text-sm focus:outline-none focus:ring-1 transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.5] [&::-webkit-calendar-picker-indicator]:cursor-pointer ${touched[field] && errors[field]
      ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
      : "border-white/10 focus:border-[#00b7b5]/60 focus:ring-[#00b7b5]/20"
    }`;

  const getGlassInputClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 transition-all ${touched[field] && errors[field]
      ? "border border-red-500/60 focus:ring-red-500/20"
      : "focus:ring-[#00b7b5]/30"
    }`;

  const getGlassInputStyle = (field) => ({
    background:
      touched[field] && errors[field]
        ? "rgba(239,68,68,0.07)"
        : "rgba(255,255,255,0.06)",
    border:
      touched[field] && errors[field]
        ? "1px solid rgba(239,68,68,0.45)"
        : "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(6px)",
  });

  const ErrorMsg = ({ field }) =>
    touched[field] && errors[field] ? (
      <span className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
          <path
            d="M6 3.5v3M6 8v.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        {errors[field]}
      </span>
    ) : null;

  const RequiredMark = () => (
    <span className="text-[#00b7b5] leading-none">*</span>
  );

  const CustomDropdown = ({ field, options, value }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const isOpen = openDropdowns[field] || false;

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDropdown = (e) => {
      e.preventDefault();
      if (!isOpen) {
        setOpenDropdowns({ [field]: true });
      } else {
        setOpenDropdowns((prev) => ({ ...prev, [field]: false }));
      }
      setSearchTerm("");
    };

    const handleSelect = (option) => {
      const newForm = { ...form, [field]: option };
      setForm(newForm);
      setOpenDropdowns((prev) => ({ ...prev, [field]: false }));
      setSearchTerm("");
      if (touched[field]) {
        const newErrors = validate(newForm);
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    };

    const displayValue = field === "language"
      ? getLanguageLabel(value)
      : field === "level"
        ? getLevelLabel(value)
        : field === "modality"
          ? getModalityLabel(value)
          : value;

    return (
      <div className="relative mt-1">
        <motion.button
          type="button"
          onClick={toggleDropdown}
          className={`w-full px-3 py-2 rounded-lg text-[#F4F4F4] text-sm focus:outline-none focus:ring-1 transition-all flex items-center justify-between text-left ${touched[field] && errors[field]
            ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
            : "border-white/10 focus:border-[#00b7b5]/60 focus:ring-[#00b7b5]/20"
            }`}
          style={{
            background:
              touched[field] && errors[field]
                ? "rgba(239,68,68,0.07)"
                : "rgba(10,26,31,0.6)",
            border:
              touched[field] && errors[field]
                ? "1px solid rgba(239,68,68,0.45)"
                : "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <span>{displayValue}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={14} className="text-[#F4F4F4]/40 -rotate-90" />
          </motion.div>
        </motion.button>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-gradient-to-b from-[#005461]/90 to-[#003d44]/90 border border-white/30 shadow-lg backdrop-blur-md overflow-hidden z-50 flex flex-col"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              <input
                type="text"
                placeholder={t("register.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="m-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-[#F4F4F4] text-xs placeholder-[#F4F4F4]/50 focus:outline-none focus:ring-1 focus:ring-[#00b7b5]/30"
              />

              <div
                className="max-h-48 overflow-y-auto"
                style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const optionLabel = field === "language"
                      ? getLanguageLabel(option)
                      : field === "level"
                        ? getLevelLabel(option)
                        : field === "modality"
                          ? getModalityLabel(option)
                          : option;

                    return (
                      <motion.button
                        type="button"
                        key={option}
                        onClick={() => handleSelect(option)}
                        variants={dropdownItemVariants}
                        className="w-full px-3 py-2 text-left text-xs sm:text-sm text-[#F4F4F4] hover:bg-white/10 transition flex items-center justify-between"
                      >
                        <span>{optionLabel}</span>
                        {value === option && (
                          <Check size={14} className="text-[#F4F4F4]" />
                        )}
                      </motion.button>
                    );
                  })
                ) : (
                  <div className="px-3 py-2 text-xs text-[#F4F4F4]/50 text-center">
                    {t("register.noResults")}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-28 pb-8 bg-transparent relative overflow-x-hidden w-full">
      <motion.div
        className="w-full max-w-6xl mb-8 relative z-10"
        initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 group font-poppins"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t("register.backToHome")}
        </Link>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl rounded-3xl sm:rounded-[40px] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80 pointer-events-none rounded-3xl sm:rounded-[40px]" />

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 relative z-10">
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 lg:p-7 relative z-[100] rounded-t-3xl sm:rounded-t-[40px] lg:rounded-t-none lg:rounded-l-[40px] border-b lg:border-b-0 lg:border-r"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(0,183,181,0.05) 45%, rgba(0,30,40,0.10) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderColor: "rgba(255,255,255,0.09)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(0,183,181,0.06)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-56 h-56 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,183,181,0.07) 0%, transparent 70%)",
                transform: "translate(-30%, -30%)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,100,120,0.08) 0%, transparent 70%)",
                transform: "translate(20%, 20%)",
              }}
            />

            <div className="flex items-center sm:items-start gap-3 mb-1 relative z-10 w-full">
              <span
                className="inline-flex items-center justify-center p-2 rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7">
                  <rect width="24" height="24" rx="6" fill="#005461" />
                  <path
                    d="M7.5 8.5h9m-9 3h6m-6 3h3"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="flex-1 w-full text-[clamp(16px,5vw,24px)] sm:text-[18px] font-bold text-[#F4F4F4] leading-tight drop-shadow-sm">
                {t("register.title").split(" ").map((word, idx, arr) => {
                  if (idx === arr.length - 2) {
                    return <span key={idx}>{word}<br className="hidden sm:block" /></span>;
                  }
                  return word + " ";
                })}
              </div>
            </div>

            <motion.div
              variants={fieldContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 sm:gap-4 relative z-50"
            >
              <div className="text-[9px] sm:text-[10px] text-[#00b7b5] font-bold tracking-widest flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#00b7b5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                {t("register.userInfo")}
              </div>

              {[
                { field: "name", isDropdown: false },
                { field: "number", isDropdown: false },
                { field: "digitalContact", isDropdown: false },
                { field: "region", isDropdown: true },
              ].map(({ field, isDropdown }) => {
                const label = t("register.fields." + field);
                const placeholder = t("register.placeholders." + field);

                if (isDropdown && field === "region") {
                  return (
                    <motion.div key={field} variants={fieldVariants} className={`${labelClass} relative z-50`}>
                      <LabelText>
                        {label}
                        <RequiredMark />
                      </LabelText>
                      <CustomDropdown
                        field={field}
                        options={regionOptions}
                        value={form[field]}
                      />
                      <ErrorMsg field={field} />
                    </motion.div>
                  );
                }
                return (
                  <motion.label key={field} variants={fieldVariants} className={`${labelClass} relative z-10`}>
                    <LabelText>
                      {label}
                      <RequiredMark />
                    </LabelText>
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={getGlassInputClass(field)}
                      style={getGlassInputStyle(field)}
                    />
                    <ErrorMsg field={field} />
                  </motion.label>
                );
              })}
            </motion.div>

            <div className="mt-auto pt-4 sm:pt-6 flex items-center gap-2 text-[#F4F4F4]/50 text-[10px] sm:text-xs relative z-0">
              <Mail size={12} className="text-[#00b7b5] flex-shrink-0" />
              <span className="truncate">hello@certify.io</span>
            </div>
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col p-4 sm:p-6 lg:p-7 gap-4 relative z-10 rounded-b-3xl sm:rounded-b-[40px] lg:rounded-b-none lg:rounded-r-[40px]"
          >
            <AnimatePresence>
              {success && !loading && registeredData && (
                <motion.div
                  key="register-success"
                  id="success-message"
                  initial={{ opacity: 0, height: 0, filter: "blur(8px)", marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, filter: "blur(8px)", marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-3xl border border-[#00B7B5]/40 bg-gradient-to-br from-[#00B7B5]/15 via-[#005461]/20 to-transparent p-6 shadow-[0_30px_90px_rgba(0,183,181,0.2)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/10 to-transparent opacity-80" />

                  <button
                    onClick={handleCloseSuccess}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-200 z-20"
                  >
                    <X className="w-5 h-5 text-white/50 hover:text-white" />
                  </button>

                  <div className="relative z-10 flex flex-col gap-5">
                    <div className="flex flex-col items-center justify-center text-center gap-3">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7B5]/20 border border-[#00B7B5]/40 shadow-lg shadow-[#00B7B5]/25 animate-pulse">
                        <Check className="h-8 w-8 text-[#00B7B5]" />
                      </div>
                      <p className="text-xl font-bold text-[#F4F4F4] font-outfit">
                        {t("register.successTitle")}
                      </p>
                      <p className="text-sm text-[#F4F4F4]/80 leading-relaxed font-poppins">
                        {t("register.successSubtitle")}
                      </p>
                    </div>

                    <div className="space-y-3 mt-2">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold font-poppins">
                            {t("register.successCard.certId")}
                          </span>
                          <button
                            onClick={() => handleCopy(registeredData.id, 'id')}
                            className="p-1 hover:bg-white/10 rounded transition-all"
                          >
                            <Copy className={`w-4 h-4 ${copiedId ? 'text-[#00B7B5]' : 'text-white/40 hover:text-white'}`} />
                          </button>
                        </div>
                        <p className="text-base font-mono font-bold text-[#00B7B5] mt-1 break-all select-all">
                          {registeredData.id}
                        </p>
                        {copiedId && (
                          <span className="absolute bottom-1 right-3 text-[9px] text-[#00B7B5] font-poppins animate-fade-in">
                            {t("register.successCard.copied")}
                          </span>
                        )}
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold font-poppins">
                            {t("register.successCard.certHash")}
                          </span>
                          <button
                            onClick={() => handleCopy(registeredData.hash, 'hash')}
                            className="p-1 hover:bg-white/10 rounded transition-all"
                          >
                            <Copy className={`w-4 h-4 ${copiedHash ? 'text-[#00B7B5]' : 'text-white/40 hover:text-white'}`} />
                          </button>
                        </div>
                        <p className="text-sm font-mono text-[#00B7B5] mt-1 break-all select-all">
                          {registeredData.hash}
                        </p>
                        {copiedHash && (
                          <span className="absolute bottom-1 right-3 text-[9px] text-[#00B7B5] font-poppins animate-fade-in">
                            {t("register.successCard.copied")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <Link
                        href="/upload"
                        className="flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.45) 0%, rgba(0, 84, 97, 0.3) 100%)',
                          border: '1px solid rgba(0, 183, 181, 0.4)',
                          boxShadow: '0 12px 24px -5px rgba(0, 183, 181, 0.25)',
                        }}
                      >
                        {t("register.successCard.uploadPdf")}
                      </Link>
                      <button
                        onClick={handleCloseSuccess}
                        className="flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white/80 hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {t("register.successCard.closeReset")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              key="register-form"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex flex-col gap-[3px]">
                  <div className="w-5 h-[3px] rounded bg-[#00b7b5]" />
                  <div className="w-3 h-[3px] rounded bg-[#00b7b5]/50" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#00b7b5] font-bold tracking-widest">
                  {t("register.programDetail")}
                </span>
              </div>

              <motion.div
                variants={fieldContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4"
              >
                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    {t("register.fields.certificateName")}
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="certificateName"
                    value={form.certificateName}
                    onChange={handleChange}
                    className={getInputClass("certificateName")}
                    placeholder={t("register.placeholders.certificateName")}
                  />
                  <ErrorMsg field="certificateName" />
                </motion.label>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    {t("register.fields.eventCode")}
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="eventCode"
                    value={form.eventCode}
                    onChange={handleChange}
                    className={getInputClass("eventCode")}
                    placeholder={t("register.placeholders.eventCode")}
                  />
                  <ErrorMsg field="eventCode" />
                </motion.label>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    {t("register.fields.issuingInstitution")}
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="issuingInstitution"
                    value={form.issuingInstitution}
                    onChange={handleChange}
                    className={getInputClass("issuingInstitution")}
                    placeholder={t("register.placeholders.issuingInstitution")}
                  />
                  <ErrorMsg field="issuingInstitution" />
                </motion.label>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-50`}>
                  <LabelText>
                    {t("register.fields.language")}
                    <RequiredMark />
                  </LabelText>
                  <CustomDropdown
                    field="language"
                    options={languageOptions}
                    value={form.language}
                  />
                  <ErrorMsg field="language" />
                </motion.div>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-40`}>
                  <LabelText>
                    {t("register.fields.level")}
                    <RequiredMark />
                  </LabelText>
                  <CustomDropdown
                    field="level"
                    options={levelOptions}
                    value={form.level}
                  />
                  <ErrorMsg field="level" />
                </motion.div>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-30`}>
                  <LabelText>
                    {t("register.fields.certificateIssue")}
                    <RequiredMark />
                  </LabelText>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`mt-1 justify-start px-3 h-9 rounded-lg font-normal w-full text-[#F4F4F4] text-sm !text-white !border-white/10 !bg-[rgba(10,26,31,0.6)] focus:!bg-[#005461]/25 focus:!text-white focus-visible:!bg-[#005461]/25 [aria-expanded=true]:!bg-[#005461]/40 [aria-expanded=true]:!text-white transition-all ${touched["certificateIssue"] &&
                          errors["certificateIssue"]
                          ? "border-red-500/60 focus:border-red-500/80"
                          : "border-white/10"
                          }`}
                        style={{
                          background:
                            touched["certificateIssue"] &&
                              errors["certificateIssue"]
                              ? "rgba(239,68,68,0.07)"
                              : "rgba(10,26,31,0.6)",
                          border:
                            touched["certificateIssue"] &&
                              errors["certificateIssue"]
                              ? "1px solid rgba(239,68,68,0.45)"
                              : "1px solid rgba(255,255,255,0.10)",
                        }}
                      >
                        <CalendarIcon size={16} className="mr-2" />
                        {form.certificateIssue ? (
                          format(form.certificateIssue, "MMM dd, yyyy")
                        ) : (
                          <span className="text-[#F4F4F4]/30">
                            {t("register.placeholders.certificateIssue")}
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-4 max-w-[calc(100vw-2rem)] overflow-x-auto"
                      align="start"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(5,20,25,0.95) 0%, rgba(10,30,38,0.92) 100%)",
                        border: "1px solid rgba(0,183,181,0.2)",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,183,181,0.1)",
                      }}
                    >
                      <Calendar
                        mode="single"
                        selected={form.certificateIssue}
                        onSelect={(date) => {
                          setForm((prev) => ({
                            ...prev,
                            certificateIssue: date,
                          }));
                          if (touched["certificateIssue"]) {
                            const newErrors = validate({
                              ...form,
                              certificateIssue: date,
                            });
                            setErrors((prev) => ({
                              ...prev,
                              certificateIssue:
                                newErrors["certificateIssue"],
                            }));
                          }
                        }}
                        initialFocus
                        className="rounded-lg border-0 bg-transparent"
                      />
                    </PopoverContent>
                  </Popover>
                  {touched["certificateIssue"] && errors["certificateIssue"] ? (
                    <span className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {errors["certificateIssue"]}
                    </span>
                  ) : null}
                </motion.div>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-20`}>
                  <LabelText>
                    {t("register.fields.modality")}
                    <RequiredMark />
                  </LabelText>
                  <CustomDropdown
                    field="modality"
                    options={modalityOptions}
                    value={form.modality}
                  />
                  <ErrorMsg field="modality" />
                </motion.div>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-10`}>
                  <LabelText>
                    {t("register.fields.studyPeriod")}
                    <RequiredMark />
                  </LabelText>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`mt-1 justify-start px-3 h-9 rounded-lg font-normal w-full text-[#F4F4F4] text-sm !text-white !border-white/10 !bg-[rgba(10,26,31,0.6)] focus:!bg-[#005461]/25 focus:!text-white focus-visible:!bg-[#005461]/25 [aria-expanded=true]:!bg-[#005461]/40 [aria-expanded=true]:!text-white transition-all ${touched["studyPeriod"] && errors["studyPeriod"]
                          ? "border-red-500/60 focus:border-red-500/80"
                          : "border-white/10"
                          }`}
                        style={{
                          background:
                            touched["studyPeriod"] && errors["studyPeriod"]
                              ? "rgba(239,68,68,0.07)"
                              : "rgba(10,26,31,0.6)",
                          border:
                            touched["studyPeriod"] && errors["studyPeriod"]
                              ? "1px solid rgba(239,68,68,0.45)"
                              : "1px solid rgba(255,255,255,0.10)",
                        }}
                      >
                        <CalendarIcon size={16} className="mr-2" />
                        {form.studyPeriod?.from ? (
                          form.studyPeriod.to ? (
                            <>
                              {format(
                                form.studyPeriod.from,
                                "MMM dd, yyyy",
                              )}{" "}
                              -{" "}
                              {format(form.studyPeriod.to, "MMM dd, yyyy")}
                            </>
                          ) : (
                            format(form.studyPeriod.from, "MMM dd, yyyy")
                          )
                        ) : (
                          <span className="text-[#F4F4F4]/30">
                            {t("register.placeholders.studyPeriod")}
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-4 max-w-[calc(100vw-2rem)] overflow-x-auto"
                      align="start"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(5,20,25,0.95) 0%, rgba(10,30,38,0.92) 100%)",
                        border: "1px solid rgba(0,183,181,0.2)",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,183,181,0.1)",
                      }}
                    >
                      <Calendar
                        mode="range"
                        defaultMonth={form.studyPeriod?.from}
                        selected={form.studyPeriod}
                        onSelect={(date) => {
                          setForm((prev) => ({
                            ...prev,
                            studyPeriod: date,
                          }));
                          if (touched["studyPeriod"]) {
                            const newErrors = validate({
                              ...form,
                              studyPeriod: date,
                            });
                            setErrors((prev) => ({
                              ...prev,
                              studyPeriod: newErrors["studyPeriod"],
                            }));
                          }
                        }}
                        numberOfMonths={typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2}
                        className="rounded-lg border-0 bg-transparent"
                      />
                    </PopoverContent>
                  </Popover>
                  {touched["studyPeriod"] && errors["studyPeriod"] ? (
                    <span className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {errors["studyPeriod"]}
                    </span>
                  ) : null}
                </motion.div>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    {t("register.fields.instructors")}
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="instructors"
                    value={form.instructors}
                    onChange={handleChange}
                    className={getInputClass("instructors")}
                    placeholder={t("register.placeholders.instructors")}
                  />
                  <ErrorMsg field="instructors" />
                </motion.label>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    {t("register.fields.signer")}
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="signer"
                    value={form.signer}
                    onChange={handleChange}
                    className={getInputClass("signer")}
                    placeholder={t("register.placeholders.signer")}
                  />
                  <ErrorMsg field="signer" />
                </motion.label>
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto pt-2">
                <div className="flex flex-col gap-1.5">
                  {Object.keys(errors).filter((k) => errors[k]).length > 0 &&
                    Object.keys(touched).length > 0 ? (
                    <span className="text-[10px] sm:text-[11px] text-red-400 flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {Object.keys(errors).filter((k) => errors[k]).length} {t("register.errors.required")}
                    </span>
                  ) : (
                    <span />
                  )}

                  <Link
                    href="/upload"
                    className="group inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#00b7b5]/70 hover:text-[#00b7b5] transition-colors duration-200"
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    >
                      <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="underline underline-offset-2 decoration-[#00b7b5]/40 group-hover:decoration-[#00b7b5]">
                      {t("register.alreadyHavePdf")}
                    </span>
                  </Link>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-[#F4F4F4] transition-all duration-200 hover:from-[#005461]/40 hover:to-[#F4F4F4]/30 hover:border-white/40 hover:shadow-xl hover:shadow-[#00B7B5]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,84,97,0.30) 0%, rgba(244,244,244,0.15) 100%)",
                    border: "1px solid rgba(255,255,255,0.30)",
                    boxShadow: "0 18px 35px -16px rgba(0,183,181,0.25)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  {loading ? t("register.sending") : success ? t("register.sent") : t("register.send")}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
}
