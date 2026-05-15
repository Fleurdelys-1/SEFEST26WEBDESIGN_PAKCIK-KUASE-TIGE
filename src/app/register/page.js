"use client";

import { useState } from "react";
import { ChevronLeft, Mail, CalendarIcon, Check } from "lucide-react";
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

const fieldLabels = {
  name: "Name",
  number: "Number",
  digitalContact: "Digital Contact",
  region: "Region",
  certificateName: "Name Certificated",
  eventCode: "Event Code",
  issuingInstitution: "Issuing Institution",
  language: "Language",
  level: "Level",
  certificateIssue: "Certificated Issue",
  modality: "Modality",
  studyPeriod: "Study Period",
  instructors: "Instructors",
  signer: "Signer / Authorities",
};

const languageOptions = [
  "English",
  "Indonesian",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese (Mandarin)",
  "Korean",
  "Arabic",
  "Hindi",
  "Vietnamese",
  "Thai",
  "Dutch",
  "Swedish",
  "Polish",
  "Turkish",
  "Greek",
];

const regionOptions = [
  "Afghanistan (AF)",
  "Albania (AL)",
  "Algeria (DZ)",
  "Andorra (AD)",
  "Angola (AO)",
  "Argentina (AR)",
  "Armenia (AM)",
  "Australia (AU)",
  "Austria (AT)",
  "Azerbaijan (AZ)",
  "Bahamas (BS)",
  "Bahrain (BH)",
  "Bangladesh (BD)",
  "Barbados (BB)",
  "Belarus (BY)",
  "Belgium (BE)",
  "Belize (BZ)",
  "Benin (BJ)",
  "Bhutan (BT)",
  "Bolivia (BO)",
  "Bosnia and Herzegovina (BA)",
  "Botswana (BW)",
  "Brazil (BR)",
  "Brunei (BN)",
  "Bulgaria (BG)",
  "Burkina Faso (BF)",
  "Burundi (BI)",
  "Cambodia (KH)",
  "Cameroon (CM)",
  "Canada (CA)",
  "Cape Verde (CV)",
  "Central African Republic (CF)",
  "Chad (TD)",
  "Chile (CL)",
  "China (CN)",
  "Colombia (CO)",
  "Comoros (KM)",
  "Congo (CG)",
  "Costa Rica (CR)",
  "Croatia (HR)",
  "Cuba (CU)",
  "Cyprus (CY)",
  "Czech Republic (CZ)",
  "Denmark (DK)",
  "Djibouti (DJ)",
  "Dominica (DM)",
  "Dominican Republic (DO)",
  "Ecuador (EC)",
  "Egypt (EG)",
  "El Salvador (SV)",
  "Equatorial Guinea (GQ)",
  "Eritrea (ER)",
  "Estonia (EE)",
  "Ethiopia (ET)",
  "Fiji (FJ)",
  "Finland (FI)",
  "France (FR)",
  "Gabon (GA)",
  "Gambia (GM)",
  "Georgia (GE)",
  "Germany (DE)",
  "Ghana (GH)",
  "Greece (GR)",
  "Grenada (GD)",
  "Guatemala (GT)",
  "Guinea (GN)",
  "Guinea-Bissau (GW)",
  "Guyana (GY)",
  "Haiti (HT)",
  "Honduras (HN)",
  "Hong Kong (HK)",
  "Hungary (HU)",
  "Iceland (IS)",
  "India (IN)",
  "Indonesia (ID)",
  "Iran (IR)",
  "Iraq (IQ)",
  "Ireland (IE)",
  "Israel (IL)",
  "Italy (IT)",
  "Jamaica (JM)",
  "Japan (JP)",
  "Jordan (JO)",
  "Kazakhstan (KZ)",
  "Kenya (KE)",
  "Kiribati (KI)",
  "Kuwait (KW)",
  "Kyrgyzstan (KG)",
  "Laos (LA)",
  "Latvia (LV)",
  "Lebanon (LB)",
  "Lesotho (LS)",
  "Liberia (LR)",
  "Libya (LY)",
  "Liechtenstein (LI)",
  "Lithuania (LT)",
  "Luxembourg (LU)",
  "Macao (MO)",
  "Madagascar (MG)",
  "Malawi (MW)",
  "Malaysia (MY)",
  "Maldives (MV)",
  "Mali (ML)",
  "Malta (MT)",
  "Marshall Islands (MH)",
  "Mauritania (MR)",
  "Mauritius (MU)",
  "Mexico (MX)",
  "Micronesia (FM)",
  "Moldova (MD)",
  "Monaco (MC)",
  "Mongolia (MN)",
  "Montenegro (ME)",
  "Morocco (MA)",
  "Mozambique (MZ)",
  "Myanmar (MM)",
  "Namibia (NA)",
  "Nauru (NR)",
  "Nepal (NP)",
  "Netherlands (NL)",
  "New Zealand (NZ)",
  "Nicaragua (NI)",
  "Niger (NE)",
  "Nigeria (NG)",
  "North Korea (KP)",
  "North Macedonia (MK)",
  "Norway (NO)",
  "Oman (OM)",
  "Pakistan (PK)",
  "Palau (PW)",
  "Palestine (PS)",
  "Panama (PA)",
  "Papua New Guinea (PG)",
  "Paraguay (PY)",
  "Peru (PE)",
  "Philippines (PH)",
  "Poland (PL)",
  "Portugal (PT)",
  "Qatar (QA)",
  "Romania (RO)",
  "Russia (RU)",
  "Rwanda (RW)",
  "Saint Kitts and Nevis (KN)",
  "Saint Lucia (LC)",
  "Saint Vincent and the Grenadines (VC)",
  "Samoa (WS)",
  "San Marino (SM)",
  "Sao Tome and Principe (ST)",
  "Saudi Arabia (SA)",
  "Senegal (SN)",
  "Serbia (RS)",
  "Seychelles (SC)",
  "Sierra Leone (SL)",
  "Singapore (SG)",
  "Slovakia (SK)",
  "Slovenia (SI)",
  "Solomon Islands (SB)",
  "Somalia (SO)",
  "South Africa (ZA)",
  "South Korea (KR)",
  "South Sudan (SS)",
  "Spain (ES)",
  "Sri Lanka (LK)",
  "Sudan (SD)",
  "Suriname (SR)",
  "Sweden (SE)",
  "Switzerland (CH)",
  "Syria (SY)",
  "Taiwan (TW)",
  "Tajikistan (TJ)",
  "Tanzania (TZ)",
  "Thailand (TH)",
  "Timor-Leste (TL)",
  "Togo (TG)",
  "Tonga (TO)",
  "Trinidad and Tobago (TT)",
  "Tunisia (TN)",
  "Turkey (TR)",
  "Turkmenistan (TM)",
  "Tuvalu (TV)",
  "Uganda (UG)",
  "Ukraine (UA)",
  "United Arab Emirates (AE)",
  "United Kingdom (GB)",
  "United States (US)",
  "Uruguay (UY)",
  "Uzbekistan (UZ)",
  "Vanuatu (VU)",
  "Vatican City (VA)",
  "Venezuela (VE)",
  "Vietnam (VN)",
  "Yemen (YE)",
  "Zambia (ZM)",
  "Zimbabwe (ZW)",
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
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

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
      if (field === "certificateIssue") {
        if (!data[field]) {
          newErrors[field] = `${fieldLabels[field]} is required`;
        }
      } else if (field === "studyPeriod") {
        if (!data[field] || !data[field].from || !data[field].to) {
          newErrors[field] = `${fieldLabels[field]} is required`;
        }
      } else if (!data[field] || data[field].toString().trim() === "") {
        newErrors[field] = `${fieldLabels[field]} is required`;
      }
    });

    if (data.digitalContact && !newErrors.digitalContact) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.digitalContact)) {
        newErrors.digitalContact = "Valid email is required";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "certificateIssue") formatted = formatDateInput(value);
    // Only allow numbers for the number field
    if (name === "number") {
      formatted = value.replace(/\D/g, "");
    }
    const updatedForm = { ...form, [name]: formatted };
    setForm(updatedForm);
    // Close any open dropdowns when typing in inputs
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

  const handleSubmit = (e) => {
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
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          const msgEl = document.getElementById("success-message");
          if (msgEl) {
            msgEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
      setTimeout(() => {
        setSuccess(false);
        setForm(initialForm);
        setTouched({});
      }, 3000);
    }, 1200);
  };

  const getInputClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border text-[#F4F4F4] placeholder-[#F4F4F4]/30 text-sm focus:outline-none focus:ring-1 transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.5] [&::-webkit-calendar-picker-indicator]:cursor-pointer ${touched[field] && errors[field]
      ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
      : "border-white/10 focus:border-[#00b7b5]/60 focus:ring-[#00b7b5]/20"
    }`;

  const getSelectClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border text-[#F4F4F4] text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${touched[field] && errors[field]
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
        // Ketika membuka dropdown, tutup semua dropdown lain
        setOpenDropdowns({ [field]: true });
      } else {
        // Ketika menutup dropdown
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
          <span>{value}</span>
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
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="m-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-[#F4F4F4] text-xs placeholder-[#F4F4F4]/50 focus:outline-none focus:ring-1 focus:ring-[#00b7b5]/30"
              />

              {/* Options List */}
              <div
                className="max-h-48 overflow-y-auto"
                style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <motion.button
                      type="button"
                      key={option}
                      onClick={() => handleSelect(option)}
                      variants={dropdownItemVariants}
                      className="w-full px-3 py-2 text-left text-xs sm:text-sm text-[#F4F4F4] hover:bg-white/10 transition flex items-center justify-between"
                    >
                      <span>{option}</span>
                      {value === option && (
                        <Check size={14} className="text-[#F4F4F4]" />
                      )}
                    </motion.button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-[#F4F4F4]/50 text-center">
                    No results found
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-8 bg-transparent relative">
      <div className="w-full max-w-6xl flex items-start mb-3">
        <Link
          href="/"
          className="flex items-center gap-1 text-[#F4F4F4]/70 text-sm hover:text-[#00b7b5] transition-colors"
        >
          <ChevronLeft size={16} />
          Back To Home
        </Link>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl rounded-3xl sm:rounded-[40px] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl relative z-10"
      >
        {/* Inner gradient overlay matching privacy */}
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

            <div className="flex items-start gap-3 mb-1 relative z-10">
              <span
                className="inline-flex items-center justify-center p-2 rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="6" fill="#005461" />
                  <path
                    d="M7.5 8.5h9m-9 3h6m-6 3h3"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="text-[13px] sm:text-[15px] font-bold text-[#F4F4F4] leading-tight drop-shadow-sm">
                Lets Register
                <br />
                Your Certificate
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
                USER INFORMATION
              </div>

              {[
                { field: "name", label: "Name", placeholder: "Your Name", isDropdown: false },
                {
                  field: "number",
                  label: "Number",
                  placeholder: "Phone or ID Number",
                  isDropdown: false,
                },
                {
                  field: "digitalContact",
                  label: "Digital Contact",
                  placeholder: "Email or Social Media",
                  isDropdown: false,
                },
                { field: "region", label: "Region", placeholder: "Region", isDropdown: true },
              ].map(({ field, label, placeholder, isDropdown }) => {
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
              {success && !loading && (
                <motion.div
                  key="register-success"
                  id="success-message"
                  initial={{ opacity: 0, height: 0, filter: "blur(8px)", marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, filter: "blur(8px)", marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#00B7B5]/10 via-[#0a2d33]/20 to-transparent px-6 shadow-[0_30px_90px_rgba(0,183,181,0.12)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/10 to-transparent opacity-80" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center py-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7B5]/10 border border-[#00B7B5]/20 shadow-lg shadow-[#00B7B5]/10">
                      <Check className="h-8 w-8 text-[#00B7B5]" />
                    </div>
                    <p className="text-lg font-bold text-[#F4F4F4]">
                      Registration sent successfully!
                    </p>
                    <p className="max-w-[23rem] text-sm text-[#F4F4F4]/70">
                      Thank you for registering. We’ll review your details and
                      contact you soon.
                    </p>
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
                  PROGRAM DETAIL
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
                    Name Certificated
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="certificateName"
                    value={form.certificateName}
                    onChange={handleChange}
                    className={getInputClass("certificateName")}
                    placeholder="Certificate Name"
                  />
                  <ErrorMsg field="certificateName" />
                </motion.label>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    Event Code
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="eventCode"
                    value={form.eventCode}
                    onChange={handleChange}
                    className={getInputClass("eventCode")}
                    placeholder="Event Code"
                  />
                  <ErrorMsg field="eventCode" />
                </motion.label>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    Issuing Institution
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="issuingInstitution"
                    value={form.issuingInstitution}
                    onChange={handleChange}
                    className={getInputClass("issuingInstitution")}
                    placeholder="Institution Name"
                  />
                  <ErrorMsg field="issuingInstitution" />
                </motion.label>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-50`}>
                  <LabelText>
                    Language
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
                    Level
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
                    Certificated Issue
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
                            MM/DD/YY
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
                  {touched["certificateIssue"] &&
                    errors["certificateIssue"] ? (
                    <span className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="5.5"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <path
                          d="M6 3.5v3M6 8v.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      {errors["certificateIssue"]}
                    </span>
                  ) : null}
                </motion.div>

                <motion.div variants={fieldVariants} className={`${labelClass} relative z-20`}>
                  <LabelText>
                    Modality
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
                    Study Period
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
                            MM/DD/YY - MM/DD/YY
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
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="5.5"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <path
                          d="M6 3.5v3M6 8v.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      {errors["studyPeriod"]}
                    </span>
                  ) : null}
                </motion.div>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    Instructors
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="instructors"
                    value={form.instructors}
                    onChange={handleChange}
                    className={getInputClass("instructors")}
                    placeholder="Instructor Name"
                  />
                  <ErrorMsg field="instructors" />
                </motion.label>

                <motion.label variants={fieldVariants} className={labelClass}>
                  <LabelText>
                    Signer / Authorities
                    <RequiredMark />
                  </LabelText>
                  <input
                    name="signer"
                    value={form.signer}
                    onChange={handleChange}
                    className={getInputClass("signer")}
                    placeholder="Signer Name"
                  />
                  <ErrorMsg field="signer" />
                </motion.label>
              </motion.div>

              <motion.div variants={fieldVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto pt-2">
                {Object.keys(errors).length > 0 &&
                  Object.keys(touched).length > 0 ? (
                  <span className="text-[10px] sm:text-[11px] text-red-400 flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <circle
                        cx="6"
                        cy="6"
                        r="5.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M6 3.5v3M6 8v.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {Object.keys(errors).length} field
                    {Object.keys(errors).length > 1 ? "s" : ""} required
                  </span>
                ) : (
                  <span />
                )}

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
                  {loading ? "SENDING..." : success ? "✓ SENT!" : "SEND"}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
}
