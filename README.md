# Certify - The Future of Certificate Verification

![Certify Hero](./public/images/home.png)

Certify adalah platform verifikasi kredensial terdesentralisasi yang mengintegrasikan jaringan blockchain Polygon untuk memastikan keaslian, integritas, dan transparansi dokumen digital secara instan. Dengan mengamankan cryptographic signature (hash SHA-256) dokumen secara on-chain, Certify menawarkan proteksi mutlak terhadap pemalsuan sertifikat serta meniadakan kebutuhan akan verifikasi manual yang lambat dan rentan kesalahan.

---

## 🔄 Alur Kerja Sistem (System Workflow)

Platform ini mengadopsi mekanisme verifikasi end-to-end yang aman dan terdistribusi:

```
[1. Registrasi] ──> Input Data Kredensial ──> Generasikan ID & Hash ──> Simpan Lokal (Pending Blockchain)
       │
[2. Notifikasi] ──> Tampilkan langsung ID & Hash di Layar + Kirim Salinan via Email
       │
[3. Penyematan] ──> Penerbit menyematkan ID & Hash ke Sertifikat PDF
       │
[4. Pengunggahan] ──> Unggah PDF sertifikat & input kredensial ke Form Upload
       │
[5. Validasi & Publikasi] ──> PDF.js mengekstrak metadata ──> Validasi kecocokan data ──> Terbitkan ke Blockchain Polygon (On-Chain Proof Aktif!)
       │
[6. Verifikasi] ──> Hasil verifikasi instan on-chain/off-chain dapat dicek di Halaman Validasi
```

### Penjelasan Detil Alur Kerja:

1. **Registrasi & Input Data**:
   Institusi penerbit mendaftarkan kredensial baru dengan memasukkan rincian data sertifikat. Sistem secara otomatis membuat **Certificate ID** unik dan **SHA-256 Hash**, lalu menyimpannya ke database lokal (`certificate.json`). Status blockchain diinisialisasi sebagai pending.
   
2. **Hasil Registrasi & Email**:
   Hasil registrasi berupa **Certificate ID** dan **SHA-256 Hash** langsung ditampilkan secara instan di layar dashboard dengan tombol salin (copy). Informasi ini juga secara otomatis dikirimkan ke alamat email terdaftar sebagai bukti registrasi off-chain.

3. **Penyematan Kredensial**:
   Penerbit mengintegrasikan detail **Certificate ID** atau **Hash** ke dalam sertifikat fisik/digital (desain PDF sertifikat).

4. **Pengunggahan & Validasi Sisi Klien**:
   User mengunggah file PDF sertifikat di Halaman Upload. Sistem menggunakan `PDF.js` untuk mengekstrak metadata dan mencocokkannya dengan ID/Hash yang diinputkan secara lokal langsung di browser demi menjaga kerahasiaan data 100%.

5. **Publikasi Blockchain & On-Chain Proof**:
   Setelah validasi metadata file PDF sukses, server memproses publikasi sertifikat ke blockchain Polygon (ditandai dengan `smartContractVerified: true`), menghasilkan transaction hash (`txA`, `txB`) yang asli, dan menyimpan file PDF tersebut ke folder `/public/file/CERT-[ID].pdf` secara otomatis.

---

## 📁 Struktur Utama Proyek (Key Directory Structure)

Berikut adalah folder-folder utama dalam direktori `src` yang menggerakkan platform Certify:

* 📁 `src/app/` — Router dinamis Next.js (App Router), halaman utama (`register`, `upload`, `validate`), serta file konfigurasi layout global.
* 📁 `src/app/api/` — API Routes serverless untuk menangani pendaftaran sertifikat (`/register`), pembacaan database (`/certificates`), dan penerbitan ke blockchain Polygon (`/publish`).
* 📁 `src/components/` — Komponen UI premium bertenaga glassmorphism dan animasi (dashboard verifikasi, landing page, About page, Three.js WebGL background).
* 📁 `src/context/` — State manager global (`LanguageContext.js`) untuk mengatur transisi bahasa real-time di seluruh halaman.
* 📁 `src/data/` — Basis data lokal instan (`certificate.json`) dan kamus file lokalisasi multibahasa (`/language`).
* 📁 `src/lib/utils.js` — Helper fungsionalitas utama yang memproses parsing/ekstraksi teks PDF (`PDF.js`) dan pencarian data kriptografis.

---

## ⚙️ Panduan Instalasi & Pengembangan Lokal

### Prasyarat Sistem
* **Node.js** versi `Latest LTS` (disarankan menggunakan versi terbaru yang stabil).
  * Download: [Node.js](https://nodejs.org/)
* **Git** untuk cloning repository dan version control.
  * Download: [Git](https://git-scm.com/downloads)
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
