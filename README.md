# Certify — Platform Verifikasi Kredensial Berbasis Blockchain Polygon

Certify adalah platform verifikasi sertifikat digital terdesentralisasi yang memanfaatkan infrastruktur blockchain **Polygon** untuk menjamin keaslian dan integritas dokumen secara instan, aman, dan efisien secara biaya. Dengan mengamankan hash sidik jari (*cryptographic signature*) dokumen secara langsung ke on-chain ledger, Certify mencegah segala bentuk pemalsuan kredensial dan memangkas waktu proses verifikasi dari berhari-hari menjadi sekian detik.

---

## 🔒 Mengapa Blockchain Polygon?

Untuk menjamin skalabilitas dan efisiensi dalam verifikasi sertifikat digital, Certify mengintegrasikan jaringan blockchain **Polygon (MATIC)** sebagai fondasi penulisan bukti transaksi (*Proof of Existence*):
- **Efisiensi Biaya Gas**: Polygon memungkinkan pencatatan sidik jari (*hash*) sertifikat dengan biaya transaksi yang sangat minim dibandingkan mainnet Ethereum, membuatnya ideal untuk volume publikasi massal oleh institusi akademis atau korporasi.
- **Waktu Finalitas Instan**: Validasi transaksi on-chain terjadi dalam hitungan detik, memastikan respons verifikasi real-time tanpa penundaan.
- **Keamanan Terdesentralisasi**: Sebagai layer-2 Ethereum, Polygon mewarisi standar keamanan tinggi namun dengan skalabilitas yang jauh lebih superior.

---

## 🛠️ Alur Kerja & Mekanisme Verifikasi

Certify bekerja dengan pendekatan *zero-trust* di mana dokumen asli tidak pernah dikirimkan atau disimpan ke dalam server eksternal demi menjaga kerahasiaan data pengguna:
```
1. Dokumen PDF / Kredensial ──> Dihitung Hash Kriptografisnya (SHA-256) di Sisi Klien (Browser)
2. ID / Hash Dicocokkan ──> Query On-Chain Terhadap Smart Contract di Jaringan Polygon
3. Hasil Verifikasi ──> Menampilkan Audit Trail Lengkap (Issuer, Recipient, & Bukti Transaksi)
```

---

## 🚀 Fitur Utama

- **Validasi Multi-Saluran (Multi-Channel Verification)**:
  - **Pencarian Manual**: Verifikasi instan menggunakan *Certificate ID* atau *Transaction Hash* Polygon.
  - **Pemindai QR Code**: Menggunakan kamera perangkat untuk memindai kode QR unik pada sertifikat cetak/digital.
  - **Validasi PDF Sisi Klien**: Deteksi keaslian file PDF langsung di browser melalui ekstraksi metadata tanpa mengunggah dokumen ke server.
- **Transparansi Jejak Audit (Audit Trail)**: Menampilkan detail transaksi blockchain secara langsung (TX A untuk validasi identitas institusi penerbit dan TX B untuk integritas konten dokumen asli).
- **Lokalisasi Multibahasa Terintegrasi**: Mendukung pergantian bahasa dinamis (English, Indonesia, Mandarin, French, German, Korean, Japanese).
- **Antarmuka Premium (Liquid Glass)**: Didesain menggunakan estetika *glassmorphism* modern dengan transisi mikro bertenaga Framer Motion.

---

## 💻 Stack Teknologi & Arsitektur

- **Frontend & Routing**: [Next.js](https://nextjs.org/) (React) untuk performa rendering optimal.
- **Manajemen State**: React Context API (`LanguageContext.js`) untuk kontrol lokalisasi dan state UI dinamis.
- **Bahasa & Pemrosesan PDF**: [PDF.js](https://mozilla.github.io/pdf.js/) untuk memproses dokumen langsung di peramban secara aman.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dikombinasikan dengan [Framer Motion](https://www.framer.com/motion/) untuk animasi transisi halus.
- **Kriptografi & Blockchain**: Verifikasi hash sidik jari yang dijangkar (*anchored*) pada jaringan **Polygon**.

---

## 📁 Struktur Folder Proyek

* [`src/app/`](file:///c:/_lomba/certify/src/app) — Halaman utama dan routing Next.js.
* [`src/components/home/`](file:///c:/_lomba/certify/src/components/home) — Komponen Landing Page & Hero Section.
* [`src/components/about/`](file:///c:/_lomba/certify/src/components/about) — Komponen Alur Kerja & Statistik Pencapaian.
* [`src/components/validation/`](file:///c:/_lomba/certify/src/components/validation) — Modul inti validasi (QR Scanner, PDF Parser, Manual Search).
* [`src/context/`](file:///c:/_lomba/certify/src/context) — Global State Management & Language Context.
* [`src/data/`](file:///c:/_lomba/certify/src/data) — Direktori penyimpanan data statis pendukung seperti contoh metadata sertifikat (`certificate.json`).
* [`src/data/language/`](file:///c:/_lomba/certify/src/data/language) — Berkas lokalisasi bahasa terjemahan ([en.json](file:///c:/_lomba/certify/src/data/language/en.json), [id.json](file:///c:/_lomba/certify/src/data/language/id.json), [zh.json](file:///c:/_lomba/certify/src/data/language/zh.json), dsb.).
* [`src/lib/utils.js`](file:///c:/_lomba/certify/src/lib/utils.js) — Utilitas pemrosesan data sertifikat & format timestamp.

---

## ⚙️ Panduan Instalasi & Pengembangan Lokal

### Prasyarat Sistem
- **Node.js** versi `18.x` atau versi terbaru (`20.x LTS` sangat direkomendasikan).
- **Package Manager**: `npm` atau `yarn`.

### Langkah-Langkah Pemasangan
1. **Clone Repositori**:
   ```bash
   git clone https://github.com/Fleurdelys-1/SEFEST26WEBDESIGN_PAKCIK-KUASE-TIGE.git
   cd SEFEST26WEBDESIGN_PAKCIK-KUASE-TIGE
   ```
2. **Instalasi Dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan Server Lokal**:
   ```bash
   npm run dev
   ```
   Aplikasi akan dapat diakses secara lokal pada tautan: `http://localhost:3000`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run start
   ```
---
