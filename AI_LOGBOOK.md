# Logbook Pemanfaatan Kecerdasan Artifisial
**Nama Proyek:** SiagaKita (Aplikasi Peringatan dan Panduan Gempa Offline)
**Tema:** Solusi Digital untuk Kehidupan Sehari-hari Berbantuan Kecerdasan Artifisial
**Platform:** Produk Berbasis Website (HTML, CSS, JavaScript)

## Tahap 1: Eksplorasi Ide & Perancangan Solusi
| Deskripsi Interaksi AI | Validasi & Modifikasi Mandiri |
| :--- | :--- |
| **Konteks:** Berkonsultasi mencari ide proyek website fungsional tanpa *backend* yang melibatkan konsep "Kecerdasan Artifisial".<br><br>**Saran AI:** AI memberikan beberapa opsi ide seperti Asisten Nutrisi, Kalkulator Karbon, dan *Earthquake Smart Alert* (Dashboard Peringatan Dini Gempa dengan logika perhitungan jarak radius aman). | Kami memvalidasi ide mitigasi gempa sebagai masalah yang paling relevan. **Modifikasi:** Kami tidak hanya mengambil ide kalkulator radius aman, tetapi memperluas rancangan kasarnya menjadi aplikasi utuh berkonsep *Progressive Web App* (PWA) bernama "SiagaKita". Kami memutuskan menambahkan fitur panduan *offline*, simulasi alat SOS (sirine/senter), dan modul kesiapsiagaan di luar saran awal AI. |

## Tahap 2: Penyusunan Kerangka Kode (Scaffolding)
| Deskripsi Interaksi AI | Validasi & Modifikasi Mandiri |
| :--- | :--- |
| **Konteks:** Meminta bantuan untuk membuat struktur dasar file HTML, CSS, dan logika JavaScript awal untuk mendeteksi lokasi dan sensor.<br><br>**Saran AI:** AI memberikan *scaffolding* berupa file `index.html`, `style.css`, logika *expert system* sederhana, dan skrip *geolocation* untuk fungsi Haversine (menghitung jarak pengguna dari pusat gempa). | Kami meninjau struktur yang diberikan dan melakukan perombakan besar secara mandiri. **Modifikasi:** Kami memecah struktur JavaScript menjadi beberapa modul khusus (`script.js` untuk interaksi UI/API, dan `kb.js` sebagai *Knowledge Base* sistem pakar fitur tanya-jawab). Kami juga menambahkan `manifest.json` dan merancang navigasi tab mandiri (`hashchange`) yang tidak ada dalam kerangka awal AI. |

## Tahap 3: Pemecahan Masalah & Penanganan Galat (Debugging)
| Deskripsi Interaksi AI | Validasi & Modifikasi Mandiri |
| :--- | :--- |
| **Konteks:** Meminta AI untuk meninjau secara statis (*code review*) keseluruhan kode akhir yang telah kami susun guna mencari *bug* atau potensi *error*.<br><br>**Saran AI:** AI menyoroti tiga potensi masalah: 1) Keterbatasan API `torch` (senter) di iOS Safari. 2) Masalah CORS saat memanggil API BMKG secara *live deploy*. 3) Jebakan versi *cache* pada *Service Worker* (`sw.js`). | Kami memvalidasi bahwa limitasi iOS adalah kebijakan keamanan Apple, bukan murni *error* kode. **Modifikasi:** Kami tidak memaksa *bypass* di iOS, melainkan memastikan *fallback* layar putih (kedip layar) pada SOS tetap berjalan. Terkait *fetch* API BMKG, kami memastikan penulisan blok `try-catch` agar jika koneksi atau CORS gagal, aplikasi langsung menampilkan data `qdata` (cache lama) tanpa merusak tampilan UI (*graceful degradation*). |

## Tahap 4: Refleksi & Penjelasan Kode
| Deskripsi Interaksi AI | Validasi & Modifikasi Mandiri |
| :--- | :--- |
| **Konteks:** Memastikan pemahaman mengenai penerapan elemen "Kecerdasan Artifisial" pada logika JavaScript murni agar dapat dipertanggungjawabkan saat penilaian.<br><br>**Saran AI:** AI menegaskan bahwa penerapan AI pada proyek ini berjenis *Rule-Based Expert System* yang terletak di fitur pencocokan *regex* (`kb.js`) serta penggunaan algoritma perhitungan spasial (Haversine) dan magnitudo gerak (`DeviceMotionEvent`). | Kami menelaah ulang fungsi `Math.hypot` pada logika deteksi guncangan (`script.js`) dan pembobotan *array* (`kb.js`). **Validasi Mandiri:** Kami sekarang memahami bahwa AI tidak selalu berarti *Machine Learning* yang berat; sistem pakar berbasis kondisi kondisional (*if-else/regex*) yang memproses masukan sensor dan teks secara cerdas di sisi pengguna (*client-side*) sudah memenuhi standar solusi cerdas yang ringan, responsif, dan hemat daya baterai (krusial saat bencana). |
