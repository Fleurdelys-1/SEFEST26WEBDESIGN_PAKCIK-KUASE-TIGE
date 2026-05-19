import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'certificate.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ certificates: [] });
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API GET certificates error:", error);
    return NextResponse.json({ error: "Failed to read certificates" }, { status: 500 });
  }
}
