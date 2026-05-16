import { NextResponse } from 'next/server';
import * as pdfjsLib from 'pdfjs-dist';


const pdfWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(
  new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url),
  { type: 'module' }
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'fileType' },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: 'fileEmpty' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'fileSize' },
        { status: 400 }
      );
    }

    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    const pageCount = Math.min(pdf.numPages, 10);

    for (let i = 1; i <= pageCount; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str || '').join(' ');
        fullText += pageText + '\n';
      } catch (pageError) {
        console.warn(`Error extracting page ${i}:`, pageError);
        continue;
      }
    }

    if (!fullText || !fullText.trim()) {
      return NextResponse.json(
        { error: 'noData', message: 'No text content found in PDF' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      text: fullText,
      pageCount: pdf.numPages
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      { error: 'corrupted', message: 'Failed to extract text from PDF' },
      { status: 400 }
    );
  }
}
