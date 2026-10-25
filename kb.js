/* SiagaKita: basis pengetahuan dan pencocok pertanyaan.
   Pencocokan memakai batas kata (bukan potongan huruf), bobot per topik,
   dan menampilkan topik alternatif jika pertanyaannya ambigu. */
(function (root) {
  const T = [
    { id: 'sekarang', title: 'Sedang terjadi gempa', k: ['lagi gempa', 'sedang gempa', 'sekarang gempa', 'gempa sekarang', 'sedang terjadi', 'sedang berguncang', 'lagi berguncang', 'tanah berguncang', 'tanah bergoyang'],
      a: `Merunduk, berlindung di bawah meja, dan berpegangan sekarang. Setelah guncangan berhenti, buka <a href="#/darurat">mode darurat</a>.` },
    { id: 'sesudah', title: 'Setelah gempa berhenti', w: .6, k: ['setelah gempa', 'sesudah gempa', 'usai gempa', 'pasca gempa', 'habis gempa', 'gempa berhenti', 'sesudahnya', 'setelahnya'],
      a: `Periksa dirimu dan orang di sekitar, lalu pakai alas kaki karena mungkin ada pecahan kaca. Jika tercium gas, jangan menyalakan api atau saklar. Keluar lewat jalur aman tanpa lift, lalu kirim pesan teks, bukan telepon lama. Langkah lengkapnya ada di <a href="#/darurat">mode darurat</a>.` },
    { id: 'saat', title: 'Langkah umum saat gempa', w: .5, k: ['saat gempa', 'ketika gempa', 'waktu gempa', 'kalau gempa', 'jika gempa', 'cara menyelamatkan diri', 'cara selamat', 'langkah pertama'],
      a: `Tiga langkah utama: merunduk, berlindung di bawah meja yang kokoh, dan berpegangan sampai guncangan berhenti. Langkahnya berbeda menurut posisimu, jadi pilih posisimu di <a href="#/darurat">mode darurat</a>.` },
    { id: 'rumah', title: 'Di dalam rumah atau gedung', k: ['gempa di rumah', 'saat di rumah', 'ketika di rumah', 'sedang di rumah', 'lagi di rumah', 'berada di rumah', 'di dalam rumah', 'di dalam gedung', 'di dalam ruangan', 'di kantor', 'di ruang kerja'],
      a: `Merunduk, berlindung di bawah meja yang kokoh, dan berpegangan pada kakinya. Jauhi kaca, jendela, lemari, dan lampu gantung. Jangan berlari keluar saat tanah masih berguncang. Jika tidak ada meja, berlindung di sudut ruangan sambil menutup kepala dan leher.` },
    { id: 'tinggi', title: 'Di gedung tinggi atau apartemen', k: ['gedung tinggi', 'lantai', 'apartemen', 'bertingkat', 'hotel', 'rusun', 'menara', 'tangga darurat'],
      a: `Tetap di tempatmu: merunduk, berlindung, berpegangan. Jangan berlari ke tangga dan jangan memakai lift saat berguncang. Setelah berhenti, turun lewat tangga darurat. Alarm dan sprinkler bisa menyala, tetap tenang dan ikuti petugas gedung.` },
    { id: 'sekolah', title: 'Di sekolah atau kampus', k: ['sekolah', 'kelas', 'murid', 'siswa', 'guru', 'kampus', 'kuliah', 'dosen', 'mahasiswa', 'ruang kuliah'],
      a: `Berlindung di bawah meja atau bangku yang kokoh dan lindungi kepala dengan lengan atau tas. Ikuti arahan guru atau dosen. Setelah guncangan berhenti, keluar dengan tertib menuju lapangan terbuka, jangan berebut di tangga, dan jangan memakai lift.` },
    { id: 'keramaian', title: 'Di mal atau tempat ramai', k: ['mall', 'mal', 'pusat perbelanjaan', 'bioskop', 'stadion', 'keramaian', 'kerumunan', 'pasar', 'supermarket', 'restoran', 'masjid', 'gereja', 'tempat ibadah'],
      a: `Jangan berdesakan menuju pintu. Jauhi etalase kaca dan rak tinggi, lindungi kepala, dan berlindung di dekat struktur yang kokoh atau di bawah meja. Setelah guncangan berhenti, ikuti arahan petugas dan keluar dengan tertib tanpa lift.` },
    { id: 'kendaraan', title: 'Di dalam kendaraan', k: ['mobil', 'kendaraan', 'motor', 'menyetir', 'nyetir', 'berkendara', 'bus', 'kereta', 'angkot', 'jalan raya', 'macet', 'jembatan'],
      a: `Menepi pelan-pelan ke tempat terbuka, jauh dari jembatan, terowongan, dan kabel listrik. Nyalakan lampu hazard, tarik rem tangan, dan tetap di dalam kendaraan sampai guncangan berhenti. Di bus atau kereta, berpegangan kuat dan ikuti arahan petugas. Setelah itu hindari jembatan dan jalan yang retak.` },
    { id: 'tsunami', title: 'Di pantai atau tsunami', k: ['tsunami', 'air laut', 'laut surut', 'pantai', 'dekat laut', 'gelombang', 'pesisir', 'nelayan'],
      a: `Jika guncangan terasa kuat atau lama, atau air laut tiba-tiba surut, segera menuju tempat tinggi atau lantai atas gedung beton yang kokoh. Jangan menunggu peringatan resmi. Tsunami bisa datang beberapa kali dan gelombang pertama belum tentu yang terbesar. Jangan kembali sebelum ada pernyataan aman dari BMKG atau BPBD.` },
    { id: 'tidur', title: 'Saat tidur atau malam hari', k: ['tidur', 'tempat tidur', 'kasur', 'malam hari', 'tengah malam', 'kamar tidur'],
      a: `Tetap di tempat tidur, tengkurap, dan lindungi kepala dengan bantal. Jika ada lampu gantung atau benda berat di atas kasur, geser ke lantai di sampingnya dan berlindung di bawah meja. Setelah berhenti, pakai alas kaki sebelum berjalan.` },
    { id: 'luar', title: 'Di luar ruangan', k: ['di luar', 'luar ruangan', 'jalan kaki', 'di jalan', 'lapangan', 'di taman', 'trotoar', 'tiang listrik', 'pohon'],
      a: `Menjauh dari bangunan, tiang listrik, papan reklame, dan pohon besar. Menuju tempat terbuka, merunduk, dan lindungi kepala. Jangan masuk ke gedung dan waspadai kaca atau reruntuhan yang jatuh dari atas.` },
    { id: 'terjebak', title: 'Terjebak reruntuhan', k: ['terjebak', 'reruntuhan', 'tertimbun', 'tertindih', 'tertutup puing', 'puing', 'terkunci', 'tidak bisa keluar'],
      a: `Tetap tenang dan hemat tenaga. Tutup mulut dan hidung dengan kain agar tidak menghirup debu. Jangan menyalakan korek atau lilin karena bisa ada gas. Ketuk pipa atau dinding, atau pakai peluit dan sirine di Alat. Jangan berteriak terus-menerus. Hubungi 112 atau 115 bila ada sinyal.` },
    { id: 'susulan', title: 'Gempa susulan', w: 1.5, k: ['susulan', 'gempa lagi', 'gempa kedua', 'gempa berikutnya'],
      a: `Gempa susulan lazim terjadi dalam jam hingga hari setelah gempa besar dan bisa merobohkan bangunan yang sudah rusak. Jauhi bangunan rusak, dan lakukan merunduk, berlindung, berpegangan setiap kali terasa guncangan.` },
    { id: 'cemas', title: 'Rasa takut dan cemas', k: ['takut', 'cemas', 'panik', 'trauma', 'stres', 'khawatir', 'gemetar'],
      a: `Rasa takut setelah gempa itu wajar. Tarik napas pelan: hirup 4 hitungan, hembuskan 6 hitungan. Fokus pada langkah berikutnya dan bicara dengan orang yang kamu percaya. Jika rasa cemas berlanjut berhari-hari dan mengganggu, bicaralah dengan tenaga kesehatan atau layanan kesehatan jiwa terdekat.` },
    { id: 'anak', title: 'Anak kecil dan bayi', k: ['anak', 'balita', 'bayi', 'bocah', 'anak saya', 'anakku', 'anak takut', 'menenangkan anak'],
      a: `Saat berlindung di bawah meja, peluk anak dan lindungi kepalanya dengan tubuhmu. Setelah guncangan, bawa susu, popok, dan pakaian cadangan. Ketenanganmu menenangkan anak, jadi bicara pelan dan jelaskan apa yang sedang kamu lakukan.` },
    { id: 'lansia', title: 'Lansia, disabilitas, ibu hamil', k: ['lansia', 'kursi roda', 'disabilitas', 'difabel', 'nenek', 'kakek', 'orang tua', 'tongkat', 'hamil'],
      a: `Jika memakai kursi roda, kunci rodanya, lindungi kepala dan leher, dan tetap di tempat sampai guncangan berhenti. Minta bantuan orang terdekat untuk evakuasi sesudahnya dan jangan memakai lift. Ibu hamil berlindung seperti biasa dengan melindungi kepala, lalu periksakan diri ke tenaga kesehatan bila ada keluhan.` },
    { id: 'hewan', title: 'Hewan peliharaan', k: ['hewan', 'kucing', 'anjing', 'peliharaan', 'ternak', 'burung'],
      a: `Siapkan tali atau kandang bawa dan makanan cadangan. Hewan yang panik bisa lari, jadi pastikan terkendali. Jangan kembali ke bangunan rusak hanya untuk menjemput hewan.` },
    { id: 'tas', title: 'Isi tas siaga', k: ['tas siaga', 'tas darurat', 'isi tas', 'siapkan tas', 'menyiapkan tas', 'perlengkapan', 'persiapan', 'bekal', 'logistik', 'disiapkan'],
      a: `Isi tas siaga: air 3 liter per orang per hari untuk 3 hari, makanan tahan lama, senter, peluit, power bank, P3K, obat pribadi, salinan dokumen, dan uang tunai. Daftar yang bisa dicentang ada di halaman <a href="#/siaga">Siaga</a>.` },
    { id: 'rumahsiap', title: 'Mengamankan rumah', k: ['mengamankan rumah', 'kaitkan lemari', 'memperkuat', 'tahan gempa', 'bangun rumah', 'konstruksi', 'renovasi', 'mengamankan lemari'],
      a: `Kaitkan lemari dan rak tinggi ke dinding, simpan barang berat di rak paling bawah, dan pastikan jalur keluar tidak terhalang. Untuk bangunan tahan gempa, konsultasikan dengan insinyur atau tukang berpengalaman dan ikuti standar bangunan tahan gempa (SNI). Cek rumahmu di halaman <a href="#/siaga">Siaga</a>.` },
    { id: 'gas', title: 'Gas, listrik, dan api', k: ['bau gas', 'gas', 'kebocoran', 'listrik', 'korsleting', 'kebakaran', 'api', 'asap', 'kompor', 'tabung'],
      a: `Jika tercium gas, jangan menyalakan api atau saklar. Buka jendela, keluar, dan matikan gas bila aman. Jika ada kabel rusak atau percikan, matikan listrik dari meteran. Jika ada api yang tidak bisa dipadamkan, menjauh dan hubungi 113 atau 112.` },
    { id: 'lift', title: 'Lift dan eskalator', k: ['lift', 'elevator', 'eskalator'],
      a: `Jangan memakai lift saat atau sesudah gempa. Jika sedang di dalam lift, tekan semua tombol lantai, keluar di lantai pertama yang terbuka, lalu pakai tangga.` },
    { id: 'komunikasi', title: 'Telepon, sinyal, dan kabar', k: ['telepon', 'sinyal', 'hp', 'ponsel', 'pesan teks', 'kirim pesan', 'memberi kabar', 'mengabari', 'menghubungi', 'komunikasi', 'baterai', 'whatsapp'],
      a: `Setelah gempa, jaringan telepon sering penuh. Kirim pesan teks singkat, hemat baterai, dan pakai Kirim kabar di <a href="#/darurat">mode darurat</a> untuk membagikan lokasimu.` },
    { id: 'bangunan', title: 'Bangunan retak atau rusak', w: 2, k: ['retak', 'rumah rusak', 'bangunan rusak', 'dinding retak', 'kembali ke rumah', 'masuk rumah', 'boleh masuk', 'aman masuk', 'pulang ke rumah', 'miring', 'pondasi'],
      a: `Jangan masuk ke bangunan yang retak berat, miring, atau berbunyi. Tunggu pemeriksaan petugas BPBD atau teknisi bangunan sebelum kembali. Waspadai gempa susulan saat berada di dekat bangunan rusak.` },
    { id: 'p3k', title: 'Luka dan pertolongan pertama', k: ['luka', 'berdarah', 'pendarahan', 'pertolongan pertama', 'p3k', 'patah', 'pingsan', 'korban', 'cedera', 'terluka'],
      a: `Pastikan tempatnya aman dulu. Tekan luka berdarah dengan kain bersih. Jangan menggerakkan korban yang diduga cedera leher atau punggung kecuali ada bahaya langsung. Hubungi 112 atau 119 untuk bantuan medis.` },
    { id: 'nomor', title: 'Nomor darurat', k: ['nomor darurat', 'kontak darurat', 'telepon darurat', 'nomor telepon', 'basarnas', 'bnpb', 'ambulans', '112', '115', '117', '119', 'minta bantuan', 'hubungi siapa'],
      a: `112 layanan darurat terpadu, 115 Basarnas, 117 BNPB, 119 ambulans dan kesehatan darurat. Tombol panggilnya ada di tab Telepon pada <a href="#/darurat">mode darurat</a>.` },
    { id: 'penyebab', title: 'Penyebab gempa', k: ['penyebab', 'kenapa gempa', 'mengapa gempa', 'apa itu gempa', 'lempeng', 'patahan', 'cincin api', 'sesar', 'kok gempa', 'tektonik'],
      a: `Gempa terjadi saat lapisan batuan di dalam bumi tiba-tiba bergeser dan melepaskan energi, biasanya di patahan atau pertemuan lempeng tektonik. Indonesia berada di pertemuan beberapa lempeng besar dan di Cincin Api Pasifik, sehingga gempa sering terjadi.` },
    { id: 'magnitudo', title: 'Magnitudo dan skala gempa', k: ['magnitudo', 'skala', 'richter', 'kekuatan gempa', 'intensitas', 'kedalaman'],
      a: `Magnitudo mengukur kekuatan gempa di sumbernya. Naik satu angka berarti energi sekitar 32 kali lebih besar. Guncangan yang kamu rasakan bergantung pada magnitudo, jarak, dan kedalaman gempa.` },
    { id: 'prediksi', title: 'Prediksi dan data BMKG', k: ['prediksi', 'memprediksi', 'ramalan', 'peringatan dini', 'kapan gempa', 'bmkg', 'data gempa', 'akurat', 'sumber data'],
      a: `Gempa belum bisa diprediksi. Data BMKG di beranda baru muncul setelah gempa terjadi, bukan peringatan sebelum guncangan. Untuk informasi resmi, gunakan situs dan aplikasi BMKG.` },
    { id: 'longsor', title: 'Longsor dan daerah pegunungan', k: ['longsor', 'gunung', 'tebing', 'bukit', 'lereng', 'erupsi', 'banjir bandang'],
      a: `Gempa bisa memicu longsor dan batu jatuh. Jauhi tebing dan lereng curam, serta waspadai tanah yang retak. Hindari lembah sungai jika sedang hujan karena risiko banjir bandang, dan menuju tempat terbuka yang stabil.` },
    { id: 'fitur', title: 'Cara memakai SiagaKita', k: ['cara pakai', 'cara menggunakan', 'fitur', 'aplikasi ini', 'website ini', 'sirine', 'senter', 'sos', 'kirim kabar', 'mode darurat', 'offline', 'tanpa internet'],
      a: `Mode darurat memberi langkah demi langkah sesuai posisimu. Tab Alat berisi senter, sirine, sinyal SOS, dan Kirim kabar. Setelah halaman dibuka sekali dengan internet, panduannya tetap bisa dipakai tanpa sinyal. Mulai dari <a href="#/darurat">mode darurat</a>.` },
    { id: 'sapaan', title: 'Sapaan', k: ['halo', 'hai', 'hi', 'terima kasih', 'makasih', 'thanks'],
      a: `Halo. Aku bisa menjawab soal apa yang dilakukan saat gempa di berbagai tempat, tas siaga, tsunami, dan pertolongan pertama. Coba tulis pertanyaanmu atau pilih salah satu topik.` }
  ];

  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  T.forEach(t => {
    t.re = t.k.map(k => ({ len: k.length, r: new RegExp('(^| )' + k + (k.length <= 3 ? '' : '[a-z]{0,3}') + '( |$)') }));
  });

  function answer(q) {
    const s = norm(q);
    if (!s) return { best: null, alts: [] };
    const sc = T.map(t => ({ t, s: t.re.reduce((a, x) => a + (x.r.test(s) ? x.len : 0), 0) * (t.w || 1) }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    if (!sc.length || sc[0].s < 3) return { best: null, alts: [] };
    const top = sc[0].s;
    return { best: sc[0].t, alts: sc.slice(1, 3).filter(x => x.s >= Math.max(3, top * .6)).map(x => x.t) };
  }

  const SK = { topics: T, answer, norm, byId: id => T.find(t => t.id === id) };
  if (typeof module !== 'undefined' && module.exports) module.exports = SK; else root.SK = SK;
})(typeof window !== 'undefined' ? window : this);
