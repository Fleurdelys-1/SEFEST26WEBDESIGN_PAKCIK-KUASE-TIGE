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
  region: "",
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

const languageOptions = ["English", "Indonesian"];
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
  "flex flex-col text-[11px] text-[#F4F4F4]/60 font-medium tracking-wide";

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
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "certificateIssue") formatted = formatDateInput(value);
    const updatedForm = { ...form, [name]: formatted };
    setForm(updatedForm);
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
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  const getInputClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border text-[#F4F4F4] placeholder-[#F4F4F4]/30 text-sm focus:outline-none focus:ring-1 transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.5] [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
      touched[field] && errors[field]
        ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
        : "border-white/10 focus:border-[#00b7b5]/60 focus:ring-[#00b7b5]/20"
    }`;

  const getSelectClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border text-[#F4F4F4] text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
      touched[field] && errors[field]
        ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
        : "border-white/10 focus:border-[#00b7b5]/60 focus:ring-[#00b7b5]/20"
    }`;

  const getGlassInputClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 transition-all ${
      touched[field] && errors[field]
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
    const isOpen = openDropdowns[field] || false;

    const toggleDropdown = (e) => {
      e.preventDefault();
      setOpenDropdowns((prev) => ({ ...prev, [field]: !isOpen }));
    };

    const handleSelect = (option) => {
      const newForm = { ...form, [field]: option };
      setForm(newForm);
      setOpenDropdowns((prev) => ({ ...prev, [field]: false }));
      if (touched[field]) {
        const newErrors = validate(newForm);
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    };

    return (
      <div className="relative mt-1">
        <motion.button
          onClick={toggleDropdown}
          className={`w-full px-3 py-2 rounded-lg text-[#F4F4F4] text-sm focus:outline-none focus:ring-1 transition-all flex items-center justify-between text-left ${
            touched[field] && errors[field]
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-gradient-to-b from-[#005461]/90 to-[#003d44]/90 border border-white/30 shadow-lg backdrop-blur-md overflow-hidden z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              {options.map((option) => (
                <motion.button
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
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8 bg-transparent relative">
      <div className="w-full max-w-6xl flex items-start mb-3">
        <Link
          href="/"
          className="flex items-center gap-1 text-[#F4F4F4]/70 text-sm hover:text-[#00b7b5] transition-colors"
        >
          <ChevronLeft size={16} />
          Back To Home
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-6xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,20,25,0.92) 0%, rgba(10,30,38,0.88) 60%, rgba(0,80,90,0.18) 100%)",
          boxShadow:
            "0 0 60px 0 rgba(0,183,181,0.08), 0 2px 40px 0 rgba(0,0,0,0.6)",
        }}
      >
        <div className="grid grid-cols-[300px_1fr]">
          <div
            className="flex flex-col gap-4 p-7 relative"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(0,183,181,0.05) 45%, rgba(0,30,40,0.10) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderRight: "1px solid rgba(255,255,255,0.09)",
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
              <div className="text-[15px] font-bold text-[#F4F4F4] leading-tight drop-shadow-sm">
                Lets Register
                <br />
                Your Certificate
              </div>
            </div>

            <div className="text-[10px] text-[#00b7b5] font-bold tracking-widest flex items-center gap-2 relative z-10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#00b7b5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              USER INFORMATION
            </div>

            {[
              { field: "name", label: "Name", placeholder: "Your Name" },
              {
                field: "number",
                label: "Number",
                placeholder: "Phone or ID Number",
              },
              {
                field: "digitalContact",
                label: "Digital Contact",
                placeholder: "Email or Social Media",
              },
              { field: "region", label: "Region", placeholder: "Region" },
            ].map(({ field, label, placeholder }) => (
              <label key={field} className={`${labelClass} relative z-10`}>
                <LabelText>
                  {label}
                  <RequiredMark />
                </LabelText>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className={getGlassInputClass(field)}
                  style={getGlassInputStyle(field)}
                />
                <ErrorMsg field={field} />
              </label>
            ))}

            <div className="mt-auto pt-6 flex items-center gap-2 text-[#F4F4F4]/50 text-xs relative z-10">
              <Mail size={13} className="text-[#00b7b5]" />
              <span>certify@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-col p-7 gap-4">
            <AnimatePresence mode="wait">
              {success && !loading && (
                <motion.div
                  key="register-success"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#00B7B5]/10 via-[#0a2d33]/20 to-transparent p-6 shadow-[0_30px_90px_rgba(0,183,181,0.12)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/10 to-transparent opacity-80" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
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

              {!success && (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex flex-col gap-[3px]">
                      <div className="w-5 h-[3px] rounded bg-[#00b7b5]" />
                      <div className="w-3 h-[3px] rounded bg-[#00b7b5]/50" />
                    </div>
                    <span className="text-[10px] text-[#00b7b5] font-bold tracking-widest">
                      PROGRAM DETAIL
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <label className={labelClass}>
                      <LabelText>
                        Name Certificated
                        <RequiredMark />
                      </LabelText>
                      <input
                        name="certificateName"
                        value={form.certificateName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("certificateName")}
                        placeholder="Certificate Name"
                      />
                      <ErrorMsg field="certificateName" />
                    </label>

                    <label className={labelClass}>
                      <LabelText>
                        Event Code
                        <RequiredMark />
                      </LabelText>
                      <input
                        name="eventCode"
                        value={form.eventCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("eventCode")}
                        placeholder="Event Code"
                      />
                      <ErrorMsg field="eventCode" />
                    </label>

                    <label className={labelClass}>
                      <LabelText>
                        Issuing Institution
                        <RequiredMark />
                      </LabelText>
                      <input
                        name="issuingInstitution"
                        value={form.issuingInstitution}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("issuingInstitution")}
                        placeholder="Institution Name"
                      />
                      <ErrorMsg field="issuingInstitution" />
                    </label>

                    <label className={labelClass}>
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
                    </label>

                    <label className={labelClass}>
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
                    </label>

                    <div className={labelClass}>
                      <LabelText>
                        Certificated Issue
                        <RequiredMark />
                      </LabelText>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`mt-1 justify-start px-3 h-9 rounded-lg font-normal w-full text-[#F4F4F4] text-sm !text-white !border-white/10 !bg-[rgba(10,26,31,0.6)] focus:!bg-[#005461]/25 focus:!text-white focus-visible:!bg-[#005461]/25 [aria-expanded=true]:!bg-[#005461]/40 [aria-expanded=true]:!text-white transition-all ${
                              touched["certificateIssue"] &&
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
                          className="w-auto p-4"
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
                    </div>

                    <label className={labelClass}>
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
                    </label>

                    <div className={labelClass}>
                      <LabelText>
                        Study Period
                        <RequiredMark />
                      </LabelText>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`mt-1 justify-start px-3 h-9 rounded-lg font-normal w-full text-[#F4F4F4] text-sm !text-white !border-white/10 !bg-[rgba(10,26,31,0.6)] focus:!bg-[#005461]/25 focus:!text-white focus-visible:!bg-[#005461]/25 [aria-expanded=true]:!bg-[#005461]/40 [aria-expanded=true]:!text-white transition-all ${
                              touched["studyPeriod"] && errors["studyPeriod"]
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
                          className="w-auto p-4"
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
                            numberOfMonths={2}
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
                    </div>

                    <label className={labelClass}>
                      <LabelText>
                        Instructors
                        <RequiredMark />
                      </LabelText>
                      <input
                        name="instructors"
                        value={form.instructors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("instructors")}
                        placeholder="Instructor Name"
                      />
                      <ErrorMsg field="instructors" />
                    </label>

                    <label className={labelClass}>
                      <LabelText>
                        Signer / Authorities
                        <RequiredMark />
                      </LabelText>
                      <input
                        name="signer"
                        value={form.signer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("signer")}
                        placeholder="Signer Name"
                      />
                      <ErrorMsg field="signer" />
                    </label>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    {Object.keys(errors).length > 0 &&
                    Object.keys(touched).length > 0 ? (
                      <span className="text-[11px] text-red-400 flex items-center gap-1.5">
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

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md px-8 py-4 text-sm font-semibold text-[#F4F4F4] transition-all duration-200 hover:from-[#005461]/40 hover:to-[#F4F4F4]/30 hover:border-white/40 hover:shadow-xl hover:shadow-[#00B7B5]/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0,84,97,0.30) 0%, rgba(244,244,244,0.15) 100%)",
                        border: "1px solid rgba(255,255,255,0.30)",
                        boxShadow: "0 18px 35px -16px rgba(0,183,181,0.25)",
                        backdropFilter: "blur(18px)",
                      }}
                    >
                      {loading ? "SENDING..." : success ? "✓ SENT!" : "SEND"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </div>
  );
}
