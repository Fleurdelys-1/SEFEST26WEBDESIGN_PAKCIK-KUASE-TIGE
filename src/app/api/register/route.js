import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function generateCertId() {
  return "CERT-" + Array.from({ length: 12 }, () => 
    Math.floor(Math.random() * 16).toString(16).toUpperCase()
  ).join('');
}

function generateCertHash() {
  return Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      number,
      digitalContact,
      region,
      certificateName,
      eventCode,
      issuingInstitution,
      language,
      level,
      certificateIssue,
      modality,
      studyPeriod,
      instructors,
      signer
    } = body;

    const certId = generateCertId();
    const certHash = generateCertHash();

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().split('T')[0];
      } catch (e) {
        return '';
      }
    };

    const newCertificate = {
      id: certId,
      status: "ACTIVE",
      statusReason: "Off-chain record validated in local registry. Blockchain evidence (on-chain proof) will be generated and signed upon PDF upload. / Catatan off-chain tervalidasi di registry lokal. Bukti blockchain (on-chain proof) akan dibuat dan ditandatangani saat PDF diunggah.",
      hash: certHash,
      userInformation: {
        fullName: name || '',
        idNumber: number || '',
        email: digitalContact || '',
        country: (region || '').toUpperCase()
      },
      programDetail: {
        courseName: certificateName || '',
        academicEventCode: eventCode || '',
        level: level || '',
        language: language || '',
        grade: "Approved"
      },
      issuingInstitution: {
        name: issuingInstitution || '',
        modality: modality || ''
      },
      dates: {
        issueDate: formatDate(certificateIssue),
        studyPeriodStart: studyPeriod && studyPeriod.from ? formatDate(studyPeriod.from) : '',
        studyPeriodEnd: studyPeriod && studyPeriod.to ? formatDate(studyPeriod.to) : ''
      },
      credentials: {
        instructors: instructors ? instructors.split(',').map(s => s.trim()) : [],
        signatories: signer ? [signer.trim()] : []
      },
      blockchainEvidence: {
        smartContractVerified: false,
        txA: {
          hash: "Pending blockchain synchronization",
          type: "IDENTITY_RECORD",
          scanLink: "#"
        },
        txB: {
          hash: "Pending blockchain synchronization",
          type: "INTEGRITY_RECORD",
          scanLink: "#"
        }
      },
      validationStatus: {
        fileIntegrityValidated: false,
        signatureVerified: false
      },
      auditReportPdf: null,
      certificatePdf: null
    };

    const filePath = path.join(process.cwd(), 'src', 'data', 'certificate.json');
    let certificatesData = { certificates: [] };
    
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        certificatesData = JSON.parse(fileContent);
      } catch (e) {
        console.error("Failed to parse existing certificate.json:", e);
      }
    }

    certificatesData.certificates.push(newCertificate);

    fs.writeFileSync(filePath, JSON.stringify(certificatesData, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: "Certificate registered successfully",
      id: certId,
      hash: certHash,
      certificate: newCertificate
    });
  } catch (error) {
    console.error("API POST register error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
