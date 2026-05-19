"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ChevronLeft, FileText, Upload, X, CheckCircle2, ShieldCheck, Hash, Info } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { extractPdfText } from "../../lib/utils";

export default function UploadPage() {
  const { t, language } = useLanguage();
  const [idCertificate, setIdCertificate] = useState("");
  const [hashSha256, setHashSha256] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const fileInputRef = useRef(null);

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

  const validate = (id, hash, f) => {
    const errs = {};
    if (!id.trim()) errs.idCertificate = t("upload.errors.idCertificate");
    if (!hash.trim()) errs.hashSha256 = t("upload.errors.hashSha256");
    if (!f) errs.file = t("upload.errors.pdfRequired");
    return errs;
  };

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
    []
  );

  const handleCloseSuccess = () => {
    setSuccess(false);
    setIdCertificate("");
    setHashSha256("");
    setFile(null);
    setTouched({});
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ idCertificate: true, hashSha256: true, file: true });
    const errs = validate(idCertificate, hashSha256, file);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/certificates');
      if (!res.ok) {
        throw new Error("Failed to fetch certificates from server.");
      }
      const data = await res.json();
      const certificates = data.certificates || [];

      const cert = certificates.find(c => c.id.toLowerCase() === idCertificate.trim().toLowerCase());
      
      if (!cert) {
        setErrors({ idCertificate: t("upload.errors.notRegistered") });
        setLoading(false);
        return;
      }

      if (cert.blockchainEvidence && cert.blockchainEvidence.smartContractVerified) {
        setErrors({ idCertificate: t("upload.errors.alreadyPublished") });
        setLoading(false);
        return;
      }

      if (cert.hash.toLowerCase() !== hashSha256.trim().toLowerCase()) {
        setErrors({ hashSha256: t("upload.errors.hashMismatch") });
        setLoading(false);
        return;
      }

      let pdfText = "";
      try {
        pdfText = await extractPdfText(file);
      } catch (pdfErr) {
        console.error("PDF text extraction error:", pdfErr);
        setErrors({ file: t("upload.errors.pdfExtractFailed") });
        setLoading(false);
        return;
      }

      const textLower = pdfText.toLowerCase();
      const cleanId = idCertificate.trim().toLowerCase();
      const cleanHash = hashSha256.trim().toLowerCase();

      const hasId = textLower.includes(cleanId);
      const hasHash = textLower.includes(cleanHash);

      if (!hasId && !hasHash) {
        setErrors({ file: t("upload.errors.pdfNotMatch") });
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('id', cert.id);
      formData.append('file', file);

      const publishRes = await fetch('/api/publish', {
        method: 'POST',
        body: formData,
      });

      const publishData = await publishRes.json();
      if (!publishData.success) {
        throw new Error(publishData.error || "Failed to publish on-chain.");
      }

      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(language === 'id' ? "Terjadi kesalahan saat memproses unggahan: " + err.message : "An error occurred while processing the upload: " + err.message);
    }
  };

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
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-28 pb-10 lg:pb-36 bg-transparent relative">
      <motion.div
        className="w-full max-w-3xl mb-8 relative z-10"
        initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 group font-poppins"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t("upload.backToHome")}
        </Link>
      </motion.div>

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

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl rounded-3xl sm:rounded-[40px] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl relative z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f262d]/80 via-[#081218]/20 to-[#10252c]/70 opacity-80 pointer-events-none rounded-3xl sm:rounded-[40px]" />

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
          <AnimatePresence>
            {success && !loading && (
              <motion.div
                key="upload-success"
                initial={{ opacity: 0, height: 0, filter: "blur(8px)", marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", filter: "blur(0px)", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, filter: "blur(8px)", marginBottom: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl border border-[#00B7B5]/40 bg-gradient-to-br from-[#00B7B5]/15 via-[#005461]/20 to-transparent p-6 shadow-[0_30px_90px_rgba(0,183,181,0.2)] backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B7B5]/10 to-transparent opacity-80" />
                
                <button
                  type="button"
                  onClick={handleCloseSuccess}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-200 z-20"
                >
                  <X className="w-5 h-5 text-white/50 hover:text-white" />
                </button>

                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7B5]/20 border border-[#00B7B5]/40 shadow-lg shadow-[#00B7B5]/25 animate-pulse">
                      <CheckCircle2 className="h-8 w-8 text-[#00B7B5]" />
                    </div>
                    <p className="text-xl font-bold text-[#F4F4F4] font-outfit">
                      {t("upload.successTitle") || "Validation & On-Chain Publishing Successful!"}
                    </p>
                    <p className="text-sm text-[#F4F4F4]/80 leading-relaxed font-poppins max-w-md mx-auto">
                      {t("upload.successSubtitle") || "Certificate verified successfully and permanently published on Polygon blockchain! You can now verify its authenticity on the validation page."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-2 max-w-md mx-auto w-full">
                    <Link
                      href="/validate"
                      className="flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 183, 181, 0.45) 0%, rgba(0, 84, 97, 0.3) 100%)',
                        border: '1px solid rgba(0, 183, 181, 0.4)',
                        boxShadow: '0 12px 24px -5px rgba(0, 183, 181, 0.25)',
                      }}
                    >
                      {t("upload.verifyOnValidate") || "Verify on Validate Page"}
                    </Link>
                    <button
                      type="button"
                      onClick={handleCloseSuccess}
                      className="flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white/80 hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md text-center flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {t("upload.resetForm") || "Reset Form"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-[3px]">
              <div className="w-5 h-[3px] rounded bg-[#00b7b5]" />
              <div className="w-3 h-[3px] rounded bg-[#00b7b5]/50" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#00b7b5] font-bold tracking-widest">
              {t("upload.badge")}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#00b7b5]/20 bg-[#00b7b5]/5 px-4 py-3.5 shadow-inner backdrop-blur-md">
            <div className="relative z-10 flex items-start gap-3">
              <Info className="w-4.5 h-4.5 text-[#00b7b5] mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-[13px] text-[#F4F4F4]/80 leading-relaxed font-medium">
                {t("upload.infoHint")}
              </p>
            </div>
          </div>

          <motion.div
            variants={fieldContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4"
          >
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
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
