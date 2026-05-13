"use client";

import { useState } from "react";
import { ChevronLeft, Mail } from "lucide-react";
import Link from "next/link";

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
  certificateIssue: "2026-04-12",
  modality: "Online (Synchronous)",
  studyPeriod: "2026-03-26 - 2026-04-12",
  instructors: "Afif Digidaw",
  signer: "Fabil JS Suki",
};

const languageOptions = ["English", "Indonesian"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const modalityOptions = [
  "Online (Synchronous)",
  "Online (Asynchronous)",
  "Offline",
];

const inputClass =
  "mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border border-white/10 text-[#F4F4F4] placeholder-[#F4F4F4]/30 text-sm focus:outline-none focus:border-[#00b7b5]/60 focus:ring-1 focus:ring-[#00b7b5]/20 transition-all";

const selectClass =
  "mt-1 w-full px-3 py-2 rounded-lg bg-[#0a1a1f]/60 border border-white/10 text-[#F4F4F4] text-sm focus:outline-none focus:border-[#00b7b5]/60 focus:ring-1 focus:ring-[#00b7b5]/20 transition-all appearance-none cursor-pointer";

const labelClass =
  "flex flex-col text-[11px] text-[#F4F4F4]/60 font-medium tracking-wide";

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8 bg-transparent relative">
      {/* Back to Home */}
      <div className="w-full max-w-6xl flex items-start mb-3">
        <Link
          href="/"
          className="flex items-center gap-1 text-[#F4F4F4]/70 text-sm hover:text-[#00b7b5] transition-colors"
        >
          <ChevronLeft size={16} />
          Back To Home
        </Link>
      </div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,20,25,0.92) 0%, rgba(10,30,38,0.88) 60%, rgba(0,80,90,0.18) 100%)",
          boxShadow:
            "0 0 60px 0 rgba(0,183,181,0.08), 0 2px 40px 0 rgba(0,0,0,0.6)",
        }}
      >
        <div className="grid grid-cols-[300px_1fr]">
          {/* ── LEFT PANEL: Glassmorphism ── */}
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
            {/* Glow orb top-left for depth */}
            <div
              className="absolute top-0 left-0 w-56 h-56 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,183,181,0.07) 0%, transparent 70%)",
                transform: "translate(-30%, -30%)",
              }}
            />
            {/* Subtle bottom glow */}
            <div
              className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,100,120,0.08) 0%, transparent 70%)",
                transform: "translate(20%, 20%)",
              }}
            />

            {/* Header */}
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
              <div>
                <div className="text-[15px] font-bold text-[#F4F4F4] leading-tight drop-shadow-sm">
                  Lets Register
                  <br />
                  Your Certificate
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[#00b7b5] font-bold tracking-widest flex items-center gap-2 relative z-10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#00b7b5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              USER INFORMATION
            </div>

            {/* Glass inputs — slightly lighter tint */}
            <label className={`${labelClass} relative z-10`}>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b7b5]/30 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(6px)",
                }}
              />
            </label>

            <label className={`${labelClass} relative z-10`}>
              Number
              <input
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="Phone or ID Number"
                className="mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b7b5]/30 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(6px)",
                }}
              />
            </label>

            <label className={`${labelClass} relative z-10`}>
              Digital Contact
              <input
                name="digitalContact"
                value={form.digitalContact}
                onChange={handleChange}
                placeholder="Email or Social Media"
                className="mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b7b5]/30 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(6px)",
                }}
              />
            </label>

            <label className={`${labelClass} relative z-10`}>
              Region
              <input
                name="region"
                value={form.region}
                onChange={handleChange}
                placeholder="Region"
                className="mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 focus:ring-[#00b7b5]/30 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(6px)",
                }}
              />
            </label>

            {/* Email footer */}
            <div className="mt-auto pt-6 flex items-center gap-2 text-[#F4F4F4]/50 text-xs relative z-10">
              <Mail size={13} className="text-[#00b7b5]" />
              <span>certify@gmail.com</span>
            </div>
          </div>

          {/* ── RIGHT PANEL: Program Detail ── */}
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
                Name Certificated
                <input
                  name="certificateName"
                  value={form.certificateName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Certificate Name"
                />
              </label>

              <label className={labelClass}>
                Event Code
                <input
                  name="eventCode"
                  value={form.eventCode}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Event Code"
                />
              </label>

              <label className={labelClass}>
                Issuing Institution
                <input
                  name="issuingInstitution"
                  value={form.issuingInstitution}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Institution Name"
                />
              </label>

              <label className={labelClass}>
                Language
                <div className="relative">
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className={selectClass}
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
              </label>

              <label className={labelClass}>
                Level
                <div className="relative">
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className={selectClass}
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
              </label>

              <label className={labelClass}>
                Certificated Issue
                <input
                  name="certificateIssue"
                  type="date"
                  value={form.certificateIssue}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Modality
                <div className="relative">
                  <select
                    name="modality"
                    value={form.modality}
                    onChange={handleChange}
                    className={selectClass}
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
              </label>

              <label className={labelClass}>
                Study Period
                <input
                  name="studyPeriod"
                  value={form.studyPeriod}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="YYYY-MM-DD - YYYY-MM-DD"
                />
              </label>

              <label className={labelClass}>
                Instructors
                <input
                  name="instructors"
                  value={form.instructors}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Instructor Name"
                />
              </label>

              <label className={labelClass}>
                Signer / Authorities
                <input
                  name="signer"
                  value={form.signer}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Signer Name"
                />
              </label>
            </div>

            {/* SEND button */}
            <div className="flex items-end mt-auto pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-2.5 rounded-full text-white text-sm font-bold tracking-widest shadow-lg hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(90deg, #004f5e 0%, #00b7b5 100%)",
                  boxShadow: "0 0 20px 0 rgba(0,183,181,0.25)",
                }}
              >
                {loading ? "SENDING..." : success ? "SENT!" : "SEND"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
