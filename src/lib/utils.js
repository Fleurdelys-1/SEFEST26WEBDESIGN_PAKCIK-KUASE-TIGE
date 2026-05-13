import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import certificateData from '../data/certificate.json';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function searchCertificate(searchTerm) {
  if (!searchTerm.trim()) return null;

  const term = searchTerm.trim().toLowerCase();

  const certificate = certificateData.certificates.find(cert =>
    cert.id.toLowerCase() === term ||
    cert.hash.toLowerCase() === term
  );

  if (!certificate) {
    return {
      found: false,
      message: 'Certificate not found. Please check the ID or hash and try again.'
    };
  }

  return {
    found: true,
    certificate,
    isActive: certificate.status === 'ACTIVE',
    isRevoked: certificate.status === 'REVOKED'
  };
}
