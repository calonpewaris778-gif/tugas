# SiagaKita - Panduan Kesiapsiagaan & Informasi Gempa Bumi

## 1. Judul & Deskripsi
* **Nama Produk Digital:** SiagaKita
* **Latar Belakang Masalah:** Saat terjadi bencana alam seperti gempa bumi, jaringan internet sering kali terputus atau tidak stabil. Masyarakat membutuhkan aplikasi web yang tetap bisa memberikan instruksi/panduan darurat secara *offline* tanpa bergantung pada sinyal internet, sekaligus menyajikan pembaruan data gempa dari sumber resmi
* **Target Pengguna:** Masyarakat umum, siswa, sekolah, serta instansi terkait (seperti BPBD) yang membutuhkan alat kesiapsiagaan dan informasi gempa bumi yang mudah diakses.

## 2. Teknologi yang Digunakan
* **Bahasa Pemrograman:** HTML, CSS, JavaScript (termasuk Web API: Sensor Gerak/Accelerometer & Notification API.
* **Modul / Pustaka (Library / Framework):** Web APIs, Service Worker / Progressive Web App (PWA) (untuk fungsionalitas offline)
* **Platform Publikasi:** GitHub Pages (Hosted at: `https://calonpewaris778-gif.github.io/tugas/`)

## 3. Pemanfaatan AI (AI Usage Disclosure)
* **Alat AI yang Digunakan:**  Gemini
* **Contoh Perintah (Prompt) Utama:** 
  > "hei gmini,saya mau membuat website untuk tugas terakhir ku tentang tik dan Posisikan dirimu sebagai ahli web. Buatkan struktur web PWA kesiapsiagaan gempa bernama SiagaKita yang bisa diakses secara offline, mengintegrasikan API data gempa BMKG."
* **Penyesuaian / Perbaikan Mandiri:** 
  * navigasi bawah (Beranda, Darurat, Tanya, Siaga, Belajar).
  * Memperbaiki logika pemanggilan data API BMKG untuk pembaruan data gempa.
  * Menyesuaikan teks peringatan batas akurasi sensor guncangan eksperimental

## 4. Panduan Penggunaan
* **Tautan Situs Web Aktif:** (https://calonpewaris778-gif.github.io/tugas/)
* **Petunjuk Akses & Penggunaan:**
  1. **Akses Online/Offline:** Buka tautan di atas melalui browser. Setelah terbuka, web dapat disimpan ke layar utama ponsel ("Add to Home Screen") agar dapat digunakan tanpa jaringan internet.
  2. **Mode Darurat:** Klik tombol **"Sedang gempa? Buka mode darurat"** untuk melihat panduan penyelamatan diri secara langsung.
  3. **Deteksi Guncangan:** Aktifkan fitur "Deteksi guncangan otomatis" dengan meletakkan ponsel di permukaan datar.
  4. **Notifikasi & Data Gempa:** Aktifkan pemberitahuan untuk menerima informasi pembaruan gempa terbaru (M4,5+) dari data  BMKG.

## 5. Identitas Pengembang
* **Nama Lengkap Peserta:** Ulil Albab dan Khazia Almaira Ayudia
* **Kelas:** XI
* **Jurusan:** IPA
* **Asal Sekolah:** SMAN 1 Jombang
