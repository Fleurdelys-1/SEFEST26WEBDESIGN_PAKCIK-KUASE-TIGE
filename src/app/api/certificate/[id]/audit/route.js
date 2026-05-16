import { NextResponse } from 'next/server';
import certificateData from '@/data/certificate.json';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    
    const certificate = certificateData.certificates.find(
      cert => cert.id === id
    );

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    
    if (certificate.auditReportPdf) {
      return NextResponse.redirect(new URL(certificate.auditReportPdf, request.url));
    }

    return NextResponse.json(
      { error: 'Audit report not available' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching audit report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit report' },
      { status: 500 }
    );
  }
}
