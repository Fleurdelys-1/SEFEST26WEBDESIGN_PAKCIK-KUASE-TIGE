"use client";

import { useState } from "react";
import { ChevronLeft, Mail, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
                <div className="relative">
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getSelectClass("language")}
                  >
                    {languageOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a1a1f]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronLeft
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[#F4F4F4]/40 pointer-events-none mt-0.5"
                  />
                </div>
                <ErrorMsg field="language" />
              </label>

              <label className={labelClass}>
                <LabelText>
                  Level
                  <RequiredMark />
                </LabelText>
                <div className="relative">
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getSelectClass("level")}
                  >
                    {levelOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a1a1f]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronLeft
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[#F4F4F4]/40 pointer-events-none mt-0.5"
                  />
                </div>
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
                      className={`justify-start px-3 py-2 rounded-lg font-normal w-full text-[#F4F4F4] text-sm ${
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
                        <span className="text-[#F4F4F4]/30">MM/DD/YY</span>
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
                            certificateIssue: newErrors["certificateIssue"],
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
                <div className="relative">
                  <select
                    name="modality"
                    value={form.modality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getSelectClass("modality")}
                  >
                    {modalityOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a1a1f]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronLeft
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[#F4F4F4]/40 pointer-events-none mt-0.5"
                  />
                </div>
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
                      className={`justify-start px-3 py-2 rounded-lg font-normal w-full text-[#F4F4F4] text-sm ${
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
                            {format(form.studyPeriod.from, "MMM dd, yyyy")} -{" "}
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
                        setForm((prev) => ({ ...prev, studyPeriod: date }));
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
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
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
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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
                className="px-10 py-2.5 rounded-full text-white text-sm font-bold tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(90deg, #004f5e 0%, #00b7b5 100%)",
                  boxShadow: "0 0 20px 0 rgba(0,183,181,0.25)",
                }}
              >
                {loading ? "SENDING..." : success ? "✓ SENT!" : "SEND"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
