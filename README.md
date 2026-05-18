# Certify - The Future of Certificate Verification

![Certify Hero](./public/images/home.png)

Certify adalah platform verifikasi kredensial terdesentralisasi yang mengintegrasikan jaringan blockchain Polygon untuk memastikan keaslian, integritas, dan transparansi dokumen digital secara instan. Dengan mengamankan cryptographic signature (hash SHA-256) dokumen secara on-chain, Certify menawarkan proteksi mutlak terhadap pemalsuan sertifikat serta meniadakan kebutuhan akan verifikasi manual yang lambat dan rentan kesalahan.

---

## 🔄 Alur Kerja Sistem (System Workflow)

Platform ini mengadopsi mekanisme verifikasi end-to-end yang aman dan terdistribusi. Berikut adalah alur kerja operasional dari penerbitan hingga validasi sertifikat:

```
[1. Registrasi] ──> Input Data Kredensial & Terbitkan hash ke Blockchain Polygon
       │
[2. Notifikasi] ──> Sistem mengirimkan Certificate ID & Transaction Hash via Email
       │
[3. Penyematan] ──> Penerbit menempelkan ID & Hash ke Sertifikat, lalu diekspor sebagai PDF
       │
[4. Pengunggahan] ──> Verifikator mengunggah PDF sertifikat & input kredensial ke Form Validasi
       │
[5. Validasi]   ──> PDF.js mengekstrak metadata untuk dicocokkan dengan data On-Chain
```

### Penjelasan Detil Alur Kerja:

1. **Registrasi & Input Data**:
   Institusi penerbit mendaftarkan kredensial baru melalui dashboard dengan menginput rincian data sertifikat (seperti nama penerima, kompetensi, instansi penerbit, dan tanggal kelulusan). Sistem secara otomatis menghasilkan *Certificate ID* unik dan mencatatkan bukti digital (*cryptographic signature* berupa SHA-256 hash) ke dalam smart contract di jaringan Polygon.
   
2. **Pengiriman Kredensial via Email**:
   Setelah pencatatan transaksi on-chain selesai, sistem secara otomatis mengirimkan rincian kredensial utama (terdiri atas **Certificate ID** dan **Transaction Hash**) ke alamat email terdaftar institusi atau penerima sebagai notifikasi resmi dan salinan arsip digital awal.

3. **Penyematan Kredensial ke File PDF**:
   Penerbit mengintegrasikan detail **Certificate ID** dan **Transaction Hash** ke dalam desain fisik/visual sertifikat (dapat berupa teks terformat atau disandikan dalam kode QR unik). Sertifikat kemudian diekspor ke dalam format dokumen **PDF** standar.

4. **Pengunggahan & Form Validasi**:
   Untuk membuktikan keaslian dokumen, verifikator atau pemegang dokumen mengunggah file PDF sertifikat tersebut ke dalam form upload yang disediakan di platform Certify pada fitur validasi, kemudian memasukkan kredensial (ID/hash) yang tertera.

5. **Validasi Kriptografis Sisi Klien (Client-side Cross-Validation)**:
   Menggunakan pustaka `PDF.js`, platform Certify melakukan ekstraksi metadata dari file PDF langsung di browser (tanpa perlu mengunggah file ke server eksternal, menjaga privasi 100%). Sistem mencocokkan data terdistribusi di blockchain Polygon berdasarkan Certificate ID / Hash yang dimasukkan. Jika data on-chain cocok dengan signature file PDF, sertifikat dinyatakan **Sah, Asli, dan Bebas Manipulasi**.

---

## 🔒 Infrastruktur Blockchain Polygon

Untuk menjamin keandalan berskala enterprise, Certify memanfaatkan jaringan **Polygon (L2 Ethereum)** sebagai basis pencatatan bukti keberadaan (*Proof of Existence*):
* **Biaya Transaksi Efisien**: Polygon memangkas biaya gas secara signifikan dibandingkan mainnet Ethereum, memungkinkan penerbitan kredensial massal oleh institusi akademis atau korporasi dengan efisiensi biaya optimal.
* **Finalitas Transaksi Instan**: Waktu konfirmasi blok rata-rata kurang dari 2 detik memastikan verifikasi real-time tanpa latensi tinggi.
* **Keamanan Maksimal**: Mengandalkan sistem keamanan terdesentralisasi Ethereum L1 sambil mempertahankan skalabilitas tinggi L2.

---

## 🛠️ Fitur Unggulan

* **Validasi Multi-Saluran (Multi-Channel Verification)**:
  * **Pencarian Manual**: Pencarian langsung status kredensial menggunakan *Certificate ID* atau *Transaction Hash*.
  * **Pemindai QR Code Terintegrasi**: Pindai QR Code pada sertifikat fisik/digital melalui kamera perangkat untuk auto-verifikasi instan.
  * **Validasi PDF Sisi Klien**: Autentikasi file PDF langsung di browser melalui pembacaan metadata lokal tanpa kebocoran data ke server.
* **Jejak Audit Transparan (Audit Trail)**: Menyajikan data on-chain lengkap secara detail, meliputi identitas *Issuer*, *Recipient*, timestamp transaksi, serta link explorer PolygonScan.
* **Lokalisasi Multibahasa Terintegrasi**: Sistem pergantian bahasa real-time yang mendukung berbagai bahasa global (Indonesia, Inggris, Mandarin, Prancis, Jerman, Korea, dan Jepang).
* **Desain UI Liquid Glass Premium**: Antarmuka berbasis *glassmorphism* modern, transisi mikro yang mulus bertenaga Framer Motion, dan visualisasi latar belakang interaktif berbasis Three.js/WebGL.

---

## 💻 Stack Teknologi & Arsitektur

* **Framework & Routing**: [Next.js](https://nextjs.org/) (React 19) untuk performa optimal dan SEO-friendly.
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan modul animasi terintegrasi.
* **Animasi & Transisi**: [Framer Motion](https://www.framer.com/motion/) untuk interaksi mikro dan fluiditas antarmuka.
* **Pemrosesan PDF**: [PDF.js](https://mozilla.github.io/pdf.js/) untuk ekstraksi dan verifikasi metadata PDF di sisi klien.
* **Grafis Latar Belakang**: [Three.js](https://threejs.org/) untuk visualisasi grid kriptografis interaktif WebGL.
* **Global State & Lokalisasi**: React Context API (`LanguageContext.js`) untuk manajemen bahasa dinamis.

---

## 📁 Struktur Folder Proyek

* [`src/app/`](file:///c:/_lomba/certify/src/app) — Halaman utama, router dinamis, dan layout global.
* [`src/components/home/`](file:///c:/_lomba/certify/src/components/home) — Landing Page, Hero Section, dan interaksi visual 3D.
* [`src/components/about/`](file:///c:/_lomba/certify/src/components/about) — Ilustrasi alur kerja sistem, statistik, dan panduan fitur.
* [`src/components/validation/`](file:///c:/_lomba/certify/src/components/validation) — Modul utama verifikasi (Form Input Manual, Modul Drop PDF, QR Scanner).
* [`src/context/`](file:///c:/_lomba/certify/src/context) — Manajemen state bahasa global (`LanguageContext.js`).
* [`src/data/`](file:///c:/_lomba/certify/src/data) — Berkas data statis (`certificate.json`).
* [`src/data/language/`](file:///c:/_lomba/certify/src/data/language) — Sumber daya lokalisasi multibahasa (`en.json`, `id.json`, `zh.json`, dll.).
* [`src/lib/utils.js`](file:///c:/_lomba/certify/src/lib/utils.js) — Utilitas kriptografis, formatting waktu, pencarian data, dan helper PDF.

---

## ⚙️ Panduan Instalasi & Pengembangan Lokal

### Prasyarat Sistem
* **Node.js** versi `18.x` atau yang terbaru (`20.x LTS` direkomendasikan).
* **Package Manager**: `npm` atau `yarn`.

### Langkah-Langkah Pemasangan

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/Fleurdelys-1/SEFEST26WEBDESIGN_PAKCIK-KUASE-TIGE.git
   cd SEFEST26WEBDESIGN_PAKCIK-KUASE-TIGE
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Server Lokal**:
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses secara lokal melalui peramban di: `http://localhost:3000`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run start
   ```

---

## 👥 Kontributor Proyek

Proyek ini dirancang dan didevelop secara kolaboratif oleh tim **PAKCIK KUASE TIGE**:

| [<img src="https://github.com/Fleurdelys-1.png" width="100px;"/><br /><sub><b>@Fleurdelys-1</b></sub>](https://github.com/Fleurdelys-1) | [<img src="https://github.com/xfar05.png" width="100px;"/><br /><sub><b>@xfar05</b></sub>](https://github.com/xfar05) | [<img src="https://github.com/P0Ci.png" width="100px;"/><br /><sub><b>@P0Ci</b></sub>](https://github.com/P0Ci) |
| :---: | :---: | :---: |

---
