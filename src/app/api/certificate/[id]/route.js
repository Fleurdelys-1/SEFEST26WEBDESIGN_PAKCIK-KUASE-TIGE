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

    
    if (certificate.certificatePdf) {
      return NextResponse.redirect(new URL(certificate.certificatePdf, request.url));
    }

    return NextResponse.json(
      { error: 'Certificate PDF not available' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  }
}
