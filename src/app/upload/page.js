"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, FileText, Upload, X, CheckCircle2, ShieldCheck, Hash } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function UploadPage() {
  const { t } = useLanguage();
  const [idCertificate, setIdCertificate] = useState("");
  const [hashSha256, setHashSha256] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const fileInputRef = useRef(null);

  /* ── Variants ── */
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 24 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.55, ease: "easeOut", delay: 0.2 },
    },
  };

  const fieldContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.45 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
  };

  /* ── Validation ── */
  const validate = (id, hash, f) => {
    const errs = {};
    if (!id.trim()) errs.idCertificate = t("upload.errors.idCertificate");
    if (!hash.trim()) errs.hashSha256 = t("upload.errors.hashSha256");
    if (!f) errs.file = t("upload.errors.pdfRequired");
    return errs;
  };

  /* ── Handlers ── */
  const handleFileChange = (selected) => {
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      setErrors((p) => ({ ...p, file: t("upload.errors.pdfType") }));
      return;
    }
    if (selected.size > 20 * 1024 * 1024) {
      setErrors((p) => ({ ...p, file: t("upload.errors.pdfSize") }));
      return;
    }
    setFile(selected);
    setErrors((p) => ({ ...p, file: undefined }));
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      handleFileChange(dropped);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ idCertificate: true, hashSha256: true, file: true });
    const errs = validate(idCertificate, hashSha256, file);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIdCertificate("");
        setHashSha256("");
        setFile(null);
        setTouched({});
        setErrors({});
      }, 3200);
    }, 1400);
  };

  /* ── Input class helpers ── */
  const inputClass = (field) =>
    `mt-1 w-full px-3 py-2 rounded-lg text-[#F4F4F4] placeholder-[#F4F4F4]/25 text-sm focus:outline-none focus:ring-1 transition-all ${
      touched[field] && errors[field]
        ? "border border-red-500/60 focus:ring-red-500/20"
        : "focus:ring-[#00b7b5]/30"
    }`;

  const inputStyle = (field) => ({
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

  /* ── Small sub-components ── */
  const ErrorMsg = ({ field }) =>
    touched[field] && errors[field] ? (
      <span className="text-[10px] text-red-400 mt-0.5 flex items-center gap-1">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
          <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {errors[field]}
      </span>
    ) : null;

  const labelClass = "flex flex-col text-[10px] sm:text-[11px] text-[#F4F4F4]/60 font-medium tracking-wide";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-10 lg:pb-36 bg-transparent relative">
      {/* Back link */}
      <div className="w-full max-w-3xl flex items-start mb-3">
        <Link
          href="/"
          className="flex items-center gap-1 text-[#F4F4F4]/70 text-sm hover:text-[#00b7b5] transition-colors"
        >
          <ChevronLeft size={16} />
          {t("upload.backToHome")}
        </Link>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-[clamp(22px,5vw,36px)] font-bold text-[#F4F4F4] mb-6 text-center drop-shadow-sm tracking-tight"
      >
        {t("upload.title").split(" ").map((word, idx, arr) => {
          if (idx === arr.length - 1) {
            return (
              <span
                key={word}
                style={{
                  background: "linear-gradient(90deg, #00b7b5 0%, #4dd8d6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </span>
            );
          }
          return word + " ";
        })}
      </motion.h1>

      {/* Card */}
      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl rounded-3xl sm:rounded-[40px] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl relative z-10 overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80 pointer-events-none rounded-3xl sm:rounded-[40px]" />

        {/* Top glow accents */}
        <div
          className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,183,181,0.06) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,100,120,0.07) 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />

        <div className="relative z-10 p-5 sm:p-8 flex flex-col gap-6">
          {/* Success banner */}
          <AnimatePresence>
            {success && !loading && (
              <motion.div
                key="upload-success"
                initial={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#00B7B5]/10 via-[#0a2d33]/20 to-transparent px-6 py-5 shadow-[0_20px_60px_rgba(0,183,181,0.12)] backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/10 to-transparent opacity-80" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7B5]/10 border border-[#00B7B5]/20 shadow-lg shadow-[#00B7B5]/10">
                    <CheckCircle2 className="h-7 w-7 text-[#00B7B5]" />
                  </div>
                  <p className="text-base font-bold text-[#F4F4F4]">{t("upload.successTitle")}</p>
                  <p className="text-sm text-[#F4F4F4]/70">
                    {t("upload.successSubtitle")}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section label */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-[3px]">
              <div className="w-5 h-[3px] rounded bg-[#00b7b5]" />
              <div className="w-3 h-[3px] rounded bg-[#00b7b5]/50" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#00b7b5] font-bold tracking-widest">
              {t("upload.badge")}
            </span>
          </div>

          {/* Fields row */}
          <motion.div
            variants={fieldContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4"
          >
            {/* ID Certificate */}
            <motion.label variants={fieldVariants} className={labelClass}>
              <span className="flex items-center gap-1 mb-0.5">
                <Hash size={10} className="text-[#00b7b5]" />
                {t("upload.fields.idCertificate")}
                <span className="text-[#00b7b5] leading-none">*</span>
              </span>
              <input
                type="text"
                value={idCertificate}
                onChange={(e) => {
                  setIdCertificate(e.target.value);
                  if (touched.idCertificate) {
                    const errs = validate(e.target.value, hashSha256, file);
                    setErrors((p) => ({ ...p, idCertificate: errs.idCertificate }));
                  }
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, idCertificate: true }));
                  const errs = validate(idCertificate, hashSha256, file);
                  setErrors((p) => ({ ...p, idCertificate: errs.idCertificate }));
                }}
                placeholder={t("upload.placeholders.idCertificate")}
                className={inputClass("idCertificate")}
                style={inputStyle("idCertificate")}
              />
              <ErrorMsg field="idCertificate" />
            </motion.label>

            {/* HASH SHA 256 */}
            <motion.label variants={fieldVariants} className={labelClass}>
              <span className="flex items-center gap-1 mb-0.5">
                <ShieldCheck size={10} className="text-[#00b7b5]" />
                {t("upload.fields.hashSha256")}
                <span className="text-[#00b7b5] leading-none">*</span>
              </span>
              <input
                type="text"
                value={hashSha256}
                onChange={(e) => {
                  setHashSha256(e.target.value);
                  if (touched.hashSha256) {
                    const errs = validate(idCertificate, e.target.value, file);
                    setErrors((p) => ({ ...p, hashSha256: errs.hashSha256 }));
                  }
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, hashSha256: true }));
                  const errs = validate(idCertificate, hashSha256, file);
                  setErrors((p) => ({ ...p, hashSha256: errs.hashSha256 }));
                }}
                placeholder={t("upload.placeholders.hashSha256")}
                className={inputClass("hashSha256")}
                style={inputStyle("hashSha256")}
              />
              <ErrorMsg field="hashSha256" />
            </motion.label>
          </motion.div>

          {/* Drop zone */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
              dragOver
                ? "border-[#00b7b5]/70 bg-[#00b7b5]/05"
                : touched.file && errors.file
                ? "border-red-500/50"
                : file
                ? "border-[#00b7b5]/40"
                : "border-white/15 hover:border-[#00b7b5]/40"
            }`}
            style={{
              background: dragOver
                ? "rgba(0,183,181,0.05)"
                : file
                ? "rgba(0,183,181,0.04)"
                : "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />

            <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center select-none">
              {/* Icon */}
              <motion.div
                animate={dragOver ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: file
                      ? "rgba(0,183,181,0.12)"
                      : "rgba(255,255,255,0.06)",
                    border: file
                      ? "1px solid rgba(0,183,181,0.3)"
                      : "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {file ? (
                    <FileText size={28} className="text-[#00b7b5]" />
                  ) : (
                    <Upload size={28} className="text-[#F4F4F4]/40 group-hover:text-[#00b7b5]/70 transition-colors duration-300" />
                  )}
                </div>

                {/* Remove file button */}
                {file && (
                  <motion.button
                    type="button"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setErrors((p) => ({ ...p, file: touched.file ? t("upload.errors.pdfRequired") : undefined }));
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/80 border border-red-400/50 flex items-center justify-center hover:bg-red-500 transition-colors"
                  >
                    <X size={10} className="text-white" />
                  </motion.button>
                )}
              </motion.div>

              {/* Text */}
              {file ? (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold text-[#F4F4F4]">{file.name}</p>
                  <p className="text-[11px] text-[#F4F4F4]/50">
                    {(file.size / 1024 / 1024).toFixed(2)} MB — Click to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold text-[#F4F4F4]">{t("upload.dragDrop.title")}</p>
                  <p className="text-[11px] text-[#00b7b5]/80">{t("upload.dragDrop.subtitle")}</p>
                  <p className="text-[10px] text-[#F4F4F4]/30 mt-0.5 tracking-wide">
                    {t("upload.dragDrop.meta")}
                  </p>
                </div>
              )}
            </div>

            {/* Subtle inner glow when active */}
            {(dragOver || file) && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,183,181,0.06)",
                }}
              />
            )}
          </motion.div>

          {touched.file && errors.file && (
            <span className="text-[10px] text-red-400 -mt-3 flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {errors.file}
            </span>
          )}

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            {/* Error count */}
            <div className="flex flex-col gap-1">
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
                href="/register"
                className="group inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#00b7b5]/70 hover:text-[#00b7b5] transition-colors duration-200"
              >
                <ChevronLeft size={11} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span className="underline underline-offset-2 decoration-[#00b7b5]/40 group-hover:decoration-[#00b7b5]">
                  {t("upload.backToRegister")}
                </span>
              </Link>
            </div>

            {/* Submit button — identical style to register page */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-3xl border border-white/30 shadow-lg backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-[#F4F4F4] transition-all duration-200 hover:border-white/40 hover:shadow-xl hover:shadow-[#00B7B5]/25 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, rgba(0,84,97,0.30) 0%, rgba(244,244,244,0.15) 100%)",
                border: "1px solid rgba(255,255,255,0.30)",
                boxShadow: "0 18px 35px -16px rgba(0,183,181,0.25)",
                backdropFilter: "blur(18px)",
              }}
            >
              {loading ? t("upload.verifying") : success ? t("upload.verified") : t("upload.send")}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
