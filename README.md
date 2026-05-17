# Certify — Decentralized & Tamper-Proof Certificate Verification Platform

![Certify Home Screenshot](public/images/home.png)

**Certify** adalah platform verifikasi sertifikat digital berbasis blockchain kelas enterprise yang dirancang untuk menghadirkan keamanan mutlak, transparansi tanpa batas, dan validasi instan. Dengan mengintegrasikan keunggulan kriptografi modern dan sistem terdesentralisasi, Certify memecahkan masalah klasik manipulasi kredensial serta meminimalkan proses audit administratif bagi institusi akademis, korporasi global, dan lembaga sertifikasi profesional.

---

## 🌟 Nilai Unggul & Solusi

Dalam era transformasi digital, pemalsuan sertifikat, kredensial, dan dokumen lisensi masih menjadi celah keamanan kritis yang berisiko merusak reputasi institusi. Certify mengeliminasi risiko tersebut melalui arsitektur zero-trust:

1. **Keamanan Kriptografi (Tamper-Proof)**: Setiap sertifikat digital dijangkar (*anchored*) secara kriptografis menggunakan algoritma hashing satu arah yang aman. Begitu informasi tercatat di ledger blockchain, data tersebut menjadi kekal dan mustahil dimanipulasi oleh pihak manapun.
2. **Penyimpanan Terdesentralisasi & Independen**: Verifikasi kredensial tidak bergantung pada satu basis data pusat tunggal (*single point of failure*), melainkan diverifikasi secara langsung terhadap record on-chain yang terdistribusi dan tepercaya.
3. **Privasi Tingkat Tinggi (Zero-Knowledge Validation)**: Dokumen asli yang diunggah diproses sepenuhnya di browser pengguna. Metadata sertifikat divalidasi tanpa perlu mengirimkan isi dokumen sensitif ke server eksternal.

---

## 🚀 Fitur Utama

### 1. **Sistem Validasi Multi-Saluran (Multi-Channel Verification)**
* **Manual Verification**: Validasi status sertifikat seketika dengan memasukkan Certificate ID atau Transaction Hash unik.
* **Auto-QR Scanner**: Cukup pindai kode QR yang tertera pada sertifikat cetak maupun digital menggunakan kamera perangkat seluler untuk proses otentikasi tanpa hambatan.
* **Client-Side PDF Validator**: Unggah file PDF sertifikat secara langsung. Aplikasi secara otomatis melakukan ekstraksi teks serta metadata secara cerdas di sisi klien untuk mencocokkan tanda tangan kriptografinya.

### 2. **Jejak Audit Blockchain yang Transparan (Audit Trail)**
* Setiap hasil penelusuran menyajikan detail otentikasi komprehensif, meliputi status validitas (Valid/Invalid), tanggal penerbitan, tanggal kedaluwarsa, identitas institusi penerbit (*Issuer*), nama penerima, serta bukti transaksi blockchain (*Proof of Existence*).

### 3. **UI/UX Premium dengan Liquid-Glass Aesthetic**
* Desain antarmuka modern yang memukau mengadopsi gaya *glassmorphism* futuristik dengan transisi mikro super halus bertenaga **Framer Motion**, serta responsivitas tinggi di berbagai resolusi layar (Mobile, Tablet, dan Desktop).

### 4. **Dukungan Internasionalisasi Dinamis**
* Sistem terjemahan multibahasa terintegrasi penuh yang mendukung bahasa Inggris, Indonesia, dan Mandarin untuk memfasilitasi kebutuhan verifikasi lintas batas negara di tingkat global.

---

## 🛠️ Stack Teknologi

Certify dibangun di atas ekosistem pengembangan web modern dengan fokus pada performa unggul, aksesibilitas, dan standar keamanan tinggi:

* **Framework Utama**: [Next.js](https://nextjs.org/) (React) untuk Server-Side Rendering (SSR), performa optimal, serta keunggulan penjelajahan SEO.
* **Desain & Animasi**: [Tailwind CSS](https://tailwindcss.com/) untuk sistem desain modern yang konsisten, berpadu dengan [Framer Motion](https://www.framer.com/motion/) untuk interaksi UI yang dinamis dan hidup.
* **Pemrosesan Dokumen**: [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`) untuk mengurai data PDF langsung di dalam browser secara aman tanpa server backend.
* **Manajemen Ikon**: [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/) untuk aset visual yang tajam dan responsif.

---

## 📁 Struktur Proyek & Komponen Utama

Arsitektur aplikasi terstruktur secara modular untuk menjamin kemudahan pemeliharaan (*maintainability*) dan skalabilitas jangka panjang:

* [`src/app/page.js`](file:///c:/_lomba/certify/src/app/page.js) — Landing page utama yang mengintegrasikan seluruh modul alur kerja aplikasi secara dinamis.
* [`src/components/validation`](file:///c:/_lomba/certify/src/components/validation) — Inti modul mesin validasi, mencakup logika pencarian manual, parser dokumen PDF, pemindai QR, dan tampilan sertifikat terverifikasi.
* [`src/components/home`](file:///c:/_lomba/certify/src/components/home) — Section Hero interaktif yang mengenalkan proposisi nilai platform.
* [`src/components/about`](file:///c:/_lomba/certify/src/components/about) — Modul visualisasi statistik pencapaian, alur kerja blockchain, dan kredibilitas data.
* [`src/data/`](file:///c:/_lomba/certify/src/data) — Direktori penyimpanan data statis pendukung, contoh metadata sertifikat, serta berkas lokalisasi bahasa ([en.json](file:///c:/_lomba/certify/src/data/en.json), [id.json](file:///c:/_lomba/certify/src/data/id.json), [zh.json](file:///c:/_lomba/certify/src/data/zh.json)).
* [`src/context/`](file:///c:/_lomba/certify/src/context) — Pengelola state global aplikasi (Global State Management) untuk menangani navigasi gulir dinamis dan lokalisasi bahasa aktif.

---

## 💻 Panduan Instalasi & Pengembangan Lokal

Ikuti langkah-langkah di bawah ini untuk memasang dan menjalankan salinan platform Certify pada lingkungan lokal Anda untuk keperluan pengembangan atau tinjauan kode.

### Prasyarat Sistem
* **Node.js** versi `18.x` atau yang terbaru (Direkomendasikan menggunakan versi `20.x LTS`).
* **Package Manager**: `npm` (bawaan dari instalasi Node.js) atau alternatif seperti `yarn` / `pnpm`.
* Browser modern dengan dukungan HTML5, CSS3, dan JavaScript modern (ES6+).

### Langkah Memulai Pengembangan

1. **Salin Repositori**
   ```bash
   git clone <repository-url>
   cd certify
   ```

2. **Pasang Dependensi Dependen**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan Lokal**
   ```bash
   npm run dev
   ```
   Aplikasi akan mulai berjalan di portal `http://localhost:3000`. Buka tautan tersebut di peramban web Anda.

4. **Kompilasi Siap Produksi**
   Guna mengemas aplikasi menjadi berkas teroptimasi tinggi untuk lingkungan produksi:
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Kebijakan Privasi & Perlindungan Data

Certify menerapkan konsep privasi data tingkat tinggi secara inheren:
* **Pemrosesan Tanpa Server**: Dokumen PDF atau data sertifikat yang Anda validasikan diproses sepenuhnya menggunakan komputasi lokal pada peramban web Anda (*client-side*). File asli tidak pernah diunggah, disimpan, ataupun disimpan di server database kami.
* **Metode Hashing Satu Arah**: Hanya tanda tangan hash kriptografi (SHA-256) berukuran tetap dari sertifikat Anda yang dicocokkan dengan catatan otentik di blockchain, sehingga dokumen asli Anda tidak akan dapat direkonstruksi oleh pihak luar.

---

## 📄 Lisensi

Platform Certify dilisensikan di bawah ketentuan **MIT License** - silakan baca berkas [LICENSE](LICENSE) untuk informasi hak cipta dan izin lebih lanjut.
