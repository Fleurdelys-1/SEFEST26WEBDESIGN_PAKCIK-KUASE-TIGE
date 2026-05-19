import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import certificateData from '../data/certificate.json';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function searchCertificate(searchTerm) {
  if (!searchTerm.trim()) return null;

  const term = searchTerm.trim().toLowerCase();

  let certs = certificateData.certificates;
  try {
    const res = await fetch('/api/certificates');
    if (res.ok) {
      const dynamicData = await res.json();
      if (dynamicData && dynamicData.certificates) {
        certs = dynamicData.certificates;
      }
    }
  } catch (error) {
    console.warn("Using static certificate fallback:", error);
  }

  const certificate = certs.find(cert =>
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


export function validatePdfFile(file) {
  if (!file) {
    return { valid: false, error: 'noFile' };
  }

  
  if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
    return { valid: false, error: 'fileType' };
  }

  
  const maxSize = 10 * 1024 * 1024;
  if (file.size === 0) {
    return { valid: false, error: 'fileEmpty' };
  }
  if (file.size > maxSize) {
    return { valid: false, error: 'fileSize' };
  }

  return { valid: true };
}


function extractTextFromPdfBuffer(buffer) {
  const view = new Uint8Array(buffer);
  let text = '';
  
  
  let latin1String = '';
  for (let i = 0; i < view.length; i++) {
    latin1String += String.fromCharCode(view[i]);
  }
  
  
  
  const textPattern = /BT[\s\S]*?ET|Tj\|TJ/g;
  const matches = latin1String.match(textPattern) || [];
  
  if (matches.length === 0) {
    
    const asciiPattern = /[\x20-\x7E]+/g;
    const asciiMatches = latin1String.match(asciiPattern) || [];
    text = asciiMatches.join(' ').substring(0, 5000);
  } else {
    text = matches.join(' ').substring(0, 5000);
  }
  
  return text;
}


export async function extractPdfText(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      
      const pdfModule = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const { getDocument, GlobalWorkerOptions } = pdfModule;
      
      GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfModule.version}/legacy/build/pdf.worker.min.mjs`;

      const pdf = await getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      const pageCount = Math.min(pdf.numPages, 10);

      for (let i = 1; i <= pageCount; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str || '').join(' ');
          fullText += pageText + '\n';
        } catch (e) {
          console.warn(`Error extracting page ${i}:`, e);
        }
      }

      if (fullText && fullText.trim()) {
        return fullText;
      }

      throw new Error('No text extracted from PDF pages.');
    } catch (pdfError) {
      
      console.warn('PDF.js failed, using binary extraction:', pdfError);
      const text = extractTextFromPdfBuffer(arrayBuffer);

      if (text && text.trim()) {
        return text;
      }

      throw new Error('Failed to extract text from PDF');
    }
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message || 'Unknown error'}`);
  }
}


export function extractCertificateData(text) {
  if (!text || typeof text !== 'string') {
    return { certId: null, hash: null };
  }

  
  
  const certIdPattern = /CERT-[A-F0-9]{12}/gi;
  const certIdMatch = text.match(certIdPattern);
  const certId = certIdMatch ? certIdMatch[0].toUpperCase() : null;

  
  
  const hashPattern = /[a-f0-9]{64}/gi;
  const hashMatches = text.match(hashPattern);
  
  
  
  let hash = null;
  if (hashMatches && hashMatches.length > 0) {
    hash = hashMatches[0].toLowerCase();
  }

  return {
    certId: certId || null,
    hash: hash || null,
    success: !!(certId || hash),
    missingCertId: !certId,
    missingHash: !hash
  };
}

export function validateExtractedData(data) {
  
  if (!data.certId && !data.hash) {
    return {
      valid: false,
      error: 'noData',
      message: 'Could not extract any certificate information (ID or Hash) from PDF'
    };
  }

  return { valid: true };
}
