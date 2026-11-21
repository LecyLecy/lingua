# Kriteria gabungan final project Lingua

Dokumen ini menjadi panduan kerja untuk proyek Lingua. Ia menggabungkan tugas final **COMP6826001 Deep Learning** (DL) dan **COMP6822001 Speech Recognition** (SR), BINUS University, tahun akademik 2026/2027 semester ganjil. Sumber utama tetap dokumen dosen:

- `20260907155332_FINAL_PROJECT_COMP6826001_Deep_Learning.docx`, bagian 1–26.
- `20260907160650_FINAL_PROJECT_COMP6822001_Speech_Recognition.docx`, bagian 1–21.9.

Nomor bagian di bawah merujuk ke dokumen tersebut. `Wajib` berarti dinyatakan sebagai kewajiban dalam tugas; `contoh/anjuran` bukan syarat tambahan. Bagian **Penerapan Lingua** adalah keputusan atau usulan proyek, bukan kutipan aturan dosen. Jika arahan dosen berubah, ikuti arahan terbaru dan catat perubahannya. Pemeriksaan kondisi proyek di akhir bukan bukti bahwa tugas telah selesai.

## 1. Tujuan, hasil, dan pengumpulan

### Wajib

- Selesaikan masalah nyata untuk target pengguna yang jelas. Jelaskan siapa yang memiliki masalah, masalahnya, mengapa deep learning sesuai, bagaimana sistem membantu, serta skenario pemakaiannya. [DL 3–4; SR 4–5]
- Rancang, bangun, latih, uji, dan analisis sistem secara menyeluruh: persiapan data, model, eksperimen, evaluasi, analisis, aplikasi yang berjalan, dan evaluasi penggunaan nyata. Akurasi saja tidak cukup. [DL 1, 9, 15–17; SR 1, 12]
- Masing-masing tugas menyebut dua deliverable utama: **aplikasi yang berjalan** dan **technical report**. Aplikasi SR harus real-time dan menjalankan model ASR secara lokal. [DL 23; SR 17]
- Kumpulkan melalui **Exam Apps sesuai jadwal ujian**. Sumber tidak memberikan tanggal spesifik. Dokumen menyebut sanksi kecurangan berupa drop out; patuhi kebijakan akademik dan arahan dosen. Jangan menganggap satu kali pengumpulan otomatis berlaku untuk kedua mata kuliah; pastikan ketentuan dosen. [halaman awal kedua sumber]

### Penerapan Lingua

Lingua ditujukan bagi mahasiswa yang kesulitan memahami pembicara bahasa Indonesia atau Inggris. Rencana aplikasi menampilkan transkrip asli dan terjemahan. Identifikasi calon pengguna yang benar-benar dapat ditemui dan uji skenario penggunaannya; deskripsi kelompok saja belum membuktikan kebutuhan nyata. Komponen terjemahan merupakan tujuan proyek, bukan pengganti syarat ASR lokal.

## 2. Learning outcomes

| Mata kuliah | Hasil belajar |
| --- | --- |
| DL LO-1 | Menjalankan alur eksperimen terstruktur: persiapan data, training, evaluasi. |
| DL LO-2 | Membangun model deep learning dengan tools/framework modern. |
| DL LO-3 | Menganalisis perilaku dan performa model pada berbagai kondisi training. |
| DL LO-4 | Mengevaluasi kecocokan dan keterbatasan pendekatan untuk masalah nyata. |
| SR LO-1 | Menjelaskan dasar speech recognition. |
| SR LO-2 | Menjalankan alur eksperimen speech recognition yang tepat. |
| SR LO-3 | Menganalisis kelebihan dan kekurangan sistem teknologi suara. |
| SR LO-4 | Membangun sistem speech recognition untuk masalah nyata. |

## 3. Data dan persiapan

### Wajib

- Gunakan dataset yang relevan. Jelaskan sumber, karakteristik, jumlah, label/target, distribusi, kualitas, potensi bias, dan keterbatasannya. Dataset publik, institusi, terbuka, atau yang dikumpulkan sendiri dapat digunakan. [DL 5]
- Terapkan dan jelaskan persiapan data yang sesuai, termasuk pembagian train/validation/test. Cleaning, penanganan data hilang, normalisasi, resizing, tokenisasi, dan augmentasi adalah contoh; tidak semua harus dipakai. [DL 5]
- Jelaskan data atau sampel audio yang dipakai dalam eksperimen speech recognition. [SR 15.5]
- Simpan bukti pemisahan data dan pengecualian; hindari kebocoran antar-split. Gunakan dev untuk memilih model/konfigurasi, lalu laporkan test secara jujur. Aturan pemisahan ini adalah praktik proyek untuk menjaga validitas, bukan angka split wajib dari dosen.

### Penerapan Lingua

Sumber saat ini Google FLEURS `id_id` dan `en_us`; audio berpasangan dengan transkrip dan menggunakan split bawaan. Lihat [panduan data](../data/README.md) dan [audit](../results/data_audit.md). Jelaskan bahwa data rekaman bacaan tidak otomatis mewakili kuliah langsung, mikrofon laptop, suara bising, aksen, atau percakapan spontan. Catat data di luar rentang durasi dan tindakan yang benar-benar dilakukan.

## 4. Model deep learning

### Wajib

- Bangun minimal **satu model deep learning** dengan framework modern yang relevan, misalnya PyTorch, TensorFlow, Keras, atau JAX. CNN, RNN/GRU/LSTM, Transformer, pretrained model, dan arsitektur lain adalah contoh yang diperbolehkan. [DL 6]
- Jelaskan arsitektur, input/output, komponen/layer penting, loss, optimizer, learning rate, batch size, jumlah epoch, activation jika relevan, prosedur training, dan alasan pemilihannya. Mahasiswa harus memahami dan dapat menjelaskannya. [DL 7]
- Pretrained model diperbolehkan, tetapi bukan kotak hitam. Jelaskan arsitektur, tujuan pretraining, dataset/domain pretraining jika diketahui, strategi transfer/fine-tuning, komponen yang digunakan, alasan kecocokan, dan batasannya. Hanya memuat model pretrained dan menjalankan inferensi tanpa eksperimen dan evaluasi tidak memenuhi tugas. [DL 8]
- Jelaskan dasar speech recognition, pemrosesan suara, pipeline, model dan arsitektur yang dipilih, algoritma terkait, local inference, serta keterbatasannya. [SR 15.2]

### Penerapan Lingua

Model A adalah CNN + BiGRU + CTC yang dilatih dari awal. Model B adalah Whisper Base multilingual dengan adapter LoRA. Whisper Base asli menjadi pembanding pretrained. Memakai model pretrained sebagai pembanding tidak menghapus kebutuhan konstruksi model dan eksperimen yang terstruktur. Konfigurasi dan hasil ada di [MODEL.md](MODEL.md).

## 5. Aplikasi speech recognition real-time dan lokal

### Wajib

- Buat aplikasi yang benar-benar dapat dijalankan: menerima input, melakukan preprocessing dan inference menggunakan model, lalu menampilkan hasil. Mockup atau antarmuka statis saja tidak cukup. [DL 16; SR 10, 17]
- Tangkap audio mikrofon secara terus-menerus atau streaming; lakukan inference **selama** orang berbicara; tampilkan transkrip parsial dan perbarui ketika audio berikutnya masuk. Tidak boleh mengharuskan pengguna menyelesaikan seluruh rekaman dan mengunggah file sebelum transkripsi dimulai. [SR 3, 10]
- Inference **speech recognition harus lokal**. External Speech Recognition API dilarang, termasuk Google Speech-to-Text, Azure Speech, Amazon Transcribe, OpenAI Speech API, AssemblyAI, dan layanan ASR eksternal lain. Model pretrained/open-source, Hugging Face models, PyTorch, TensorFlow, ONNX, torchaudio, librosa, dan FFmpeg diperbolehkan sebagai contoh. [SR 11]
- Jelaskan serta ukur latency atau responsiveness sistem, termasuk kondisi dan perangkat pengukuran. [SR 3, 13, 15–16]

### Penerapan Lingua

Gunakan satu model ASR terpilih dalam aplikasi, kecuali keputusan proyek berubah. Pemilihan bahasa input/output oleh pengguna adalah rancangan saat ini. Model ASR menghasilkan transkrip; terjemahan perlu komponen dan evaluasi tersendiri. Larangan eksplisit sumber menyasar **API speech recognition eksternal**; sumber tidak menjelaskan aturan layanan terjemahan. Jangan menganggap layanan terjemahan eksternal otomatis dilarang atau disetujui: pastikan ke dosen jika hendak menggunakannya.

## 6. Rancangan dan evaluasi eksperimen

### Deep Learning — wajib [DL 9–15]

1. Tentukan minimal **satu baseline dan dua kondisi eksperimen selain baseline**. Misalnya perubahan learning rate, batch, augmentasi, optimizer, arsitektur, transfer learning, durasi training, atau regularisasi; pilih yang relevan. Dua kondisi tersebut tidak otomatis terbukti hanya karena ada beberapa epoch dalam satu training run.
2. Untuk setiap kondisi jelaskan variabel yang berubah, alasannya, prosedur, hasil, dan dampaknya. Jaga kondisi lain tetap sebanding sejauh memungkinkan; bila beberapa hal berubah sekaligus, akui keterbatasan kesimpulan sebab-akibat.
3. Pilih metrik sesuai tugas dan jelaskan alasannya. Bila ada beberapa pendekatan, bandingkan performa dan biaya secara sistematis serta jelaskan trade-off.
4. **Tampilkan dan analisis training loss, validation loss, training metric, dan validation metric** selama training. Bahas overfitting, underfitting, kestabilan, konvergensi, ketidakseimbangan, sensitivitas hyperparameter, dan gradien bila relevan. Jangan mengaku ada kurva historis jika metriknya tidak dicatat.
5. Analisis contoh kesalahan dan cari polanya. Evaluasi performa, robustness terhadap perubahan kondisi, training/inference time, memori, ukuran model, kebutuhan hardware, scalability, keterbatasan, dan kecocokan praktis.

### Speech Recognition — wajib [SR 12–14]

1. Selain user testing, buat baseline kondisi normal dan **minimal satu kondisi teknis** yang memengaruhi recognition, misalnya kebisingan, pembicara berbeda, kecepatan bicara, mikrofon, aksen, atau kualitas audio. Pilih kondisi relevan; contoh bukan daftar wajib seluruhnya.
2. Ukur **WER**, dengan rumus `(substitusi + penghapusan + penyisipan) / jumlah kata acuan`, dan minimal satu metrik responsiveness yang relevan seperti latency, response time, processing delay, real-time factor, atau throughput. CER juga cocok dilaporkan tetapi tidak menggantikan WER.
3. Tampilkan beberapa pasangan acuan dan hasil, jenis kesalahan, dan pola yang relevan seperti istilah teknis, nama, aksen, kebisingan, bicara cepat, suara tumpang tindih, pelafalan, atau audio buruk.

### Aturan bukti proyek

- Pisahkan metrik per bahasa dan catat normalisasi teks, checkpoint, data/split, versi kode, pengaturan decoding, hardware, dan metode pengukuran agar perbandingan dapat diulang.
- Whisper Base asli dapat digunakan sebagai baseline, Model A sebagai eksperimen arsitektur dan training dari awal, serta Model B sebagai eksperimen fine-tuning LoRA. Ini menyediakan tiga kondisi berbeda sesuai contoh jenis eksperimen dalam tugas. Jelaskan bukti run, perubahan, alasan, dan hasil masing-masing. Karena Model A berbeda dari baseline dalam beberapa hal sekaligus, perbandingan tersebut tidak membuktikan pengaruh satu variabel secara terpisah.
- Test FLEURS sudah pernah dibuka pada eksperimen sebelumnya. Hasilnya harus diberi label **eksploratif**; jika diperlukan evaluasi akhir yang belum pernah dilihat, siapkan data independen yang relevan dan jelaskan pemisahannya. Jangan menyatakan test tersebut masih tersembunyi.
- Jangan menjadikan hasil Colab T4 sebagai bukti latency atau kecocokan aplikasi di perangkat deployment. Ukur sistem aplikasi nyata secara terpisah.

## 7. User testing

### Wajib [SR 5–9, 15–16; DL 17]

- Tentukan target pengguna nyata yang sesuai dengan masalah. Setelah aplikasi dapat digunakan, uji dengan **minimal 5 target users**. Jumlah dapat disesuaikan untuk target sangat spesifik dan sulit direkrut **berdasarkan persetujuan dosen**.
- Beri tugas realistis, amati penggunaan, kumpulkan feedback menggunakan kuesioner/wawancara/skala/survei/form, dan analisis hasilnya. Periksa kemudahan, kegunaan, kualitas dan keterpahaman transkrip, responsiveness, masalah interaksi, fitur berguna/hilang, dan kepuasan.
- Catat jumlah dan karakteristik relevan pengguna, skenario, tugas, prosedur, metode, hasil dan feedback. Masukkan review ke laporan; hubungkan dengan hasil teknis untuk menjelaskan kelebihan, kekurangan, dan rekomendasi.
- DL meminta bukti evaluasi praktis dan menyarankan pengguna/stakeholder relevan; alternatif tanpa user testing memerlukan persetujuan dosen. Namun SR secara khusus mewajibkan user testing, sehingga jangan menganggap alternatif DL otomatis membebaskan kewajiban SR.
- Contoh tabel rating di tugas hanyalah ilustrasi; jangan menyalin angkanya sebagai hasil proyek. AI tidak dapat menggantikan pengguna nyata.

## 8. Technical report dan bukti

Kedua tugas memiliki struktur masing-masing. Satu laporan gabungan **mungkin** mencakup seluruh isi di bawah, tetapi izin satu laporan untuk dua mata kuliah dan format pengumpulannya belum dipastikan; tanyakan ke dosen.

| Bagian gabungan | Isi minimum |
| --- | --- |
| Pendahuluan | Latar belakang, masalah nyata, target pengguna/stakeholder, masalah pengguna, problem statement, tujuan, lingkup. |
| Dataset dan persiapan | Sumber, karakteristik, distribusi, kualitas, preprocessing, split, keterbatasan. |
| Dasar DL dan speech recognition | Konsep, pemrosesan/pipeline suara, arsitektur dan komponen model, local inference, algoritma, loss, optimizer, strategi training, alasan pemilihan, keterbatasan. |
| Desain dan implementasi | Arsitektur dan aliran data, audio streaming, preprocessing, model ASR lokal, inference, partial transcription, antarmuka, integrasi model, framework, software, hardware, dan keputusan teknis. |
| Metodologi eksperimen | Research questions, baseline, variabel, minimal dua kondisi tambahan DL, kondisi teknis SR, pengaturan/hyperparameter, data audio, prosedur, metrik dan alasan. |
| Hasil | Training, validation, test, metrik termasuk WER/CER dan latency, kurva training, perbandingan model, biaya komputasi, serta contoh transkrip. |
| Analisis dan diskusi | Perilaku model, overfitting/underfitting, efek eksperimen, pola error, kelebihan/kekurangan, trade-off, robustness, latency, usability, kepuasan, keterbatasan, dan perbaikan. |
| Evaluasi nyata dan user testing | Target dan jumlah pengguna, karakteristik, skenario/tugas, prosedur, metode feedback, hasil pengguna, analisis feedback yang dikaitkan dengan hasil teknis, kegunaan dan pertimbangan deployment. |
| Kesimpulan | Temuan utama, pencapaian tujuan, pendekatan terbaik menurut kriteria yang dijelaskan, hasil eksperimen dan pengguna, kecocokan nyata, batasan, pekerjaan selanjutnya. |
| AI usage | Log penggunaan dan deklarasi AI; lihat bagian 9. |

Sertakan minimal screenshot aplikasi, diagram arsitektur, hasil eksperimen, contoh transkrip, hasil WER/evaluasi, pengukuran latency, hasil dan feedback user testing, serta analisisnya. Setiap klaim utama harus didukung bukti nyata. [DL 18, 23, 25; SR 15–17]

## 9. Penggunaan AI dan integritas

### Wajib [DL 19–22; SR 21–21.9]

- AI boleh membantu brainstorming, literatur, desain, pemrograman, debugging, data analysis, dokumentasi, visualisasi, penulisan/editing, testing, dan kegiatan relevan. Mahasiswa tetap bertanggung jawab atas model, kode, data, desain, eksperimen, hasil, analisis, aplikasi, user testing, dan kesimpulan; mahasiswa harus mampu menjelaskannya saat evaluasi/demo.
- Catat setiap penggunaan AI yang material, tujuan, komponen yang dibantu, ringkasan instruksi, output yang dipakai, verifikasi empiris/teknis, perubahan, dan keputusan mahasiswa. Seluruh isi chat tidak perlu disertakan.
- Sertakan **AI Usage Log** pada technical report. Format minimum SR:

| No. | AI tool | Tujuan | Ringkasan prompt/instruksi | Output yang digunakan | Verifikasi mahasiswa |
| --- | --- | --- | --- | --- | --- |
| — | Isi berdasarkan penggunaan nyata | — | — | — | — |

- Akhiri report dengan deklarasi penggunaan AI yang sesuai. Contoh dari tugas SR untuk pengguna AI: “I acknowledge that AI tools were used during the development of this project. I have disclosed the relevant AI tools and their purposes in the AI Usage Log. I remain responsible for the correctness of the application, experimental results, analysis, user testing, and conclusions presented in this report.” Jika tidak menggunakan AI secara substansial, sumber memberikan deklarasi berbeda; kondisi tersebut tidak sesuai dengan penggunaan AI yang tercatat di proyek ini.
- Jangan memalsukan dataset, run training, metrik, benchmark, klaim performa, eksperimen, hasil user testing, feedback, review, transkrip wawancara, atau identitas/respons pengguna. Jangan menyajikan pekerjaan AI sebagai pemikiran sendiri tanpa disclosure. AI boleh membantu merancang pertanyaan atau mengelompokkan feedback nyata, tetapi tidak boleh mengganti responden.
- Verifikasi usulan AI dengan membaca kode/dokumentasi, pengujian teknis, hasil eksperimen, dan penilaian mahasiswa; catat kesalahan serta keputusan perbaikannya. Kedua tugas memasukkan penggunaan dan refleksi AI ke penilaian.

### Ketidakjelasan yang harus ditanyakan

Kedua halaman awal menandai **AI Use Type: Integrated**. Tabel umum menjelaskan mahasiswa tidak boleh memakai aplikasi AI selain yang diwajibkan dan harus menyerahkan declaration form. Namun isi khusus kedua tugas menyatakan AI tools diperbolehkan dan dianjurkan, serta memberi contoh berbagai jenis AI tanpa daftar aplikasi wajib yang jelas. Jangan menyimpulkan daftar alat yang diizinkan atau format form dari asumsi. **Konfirmasi kepada dosen** alat yang boleh digunakan, form deklarasi, dan apakah ada aturan tambahan. Catat penggunaan nyata sementara itu.

## 10. Rubrik penilaian

| Deep Learning [DL 24] | Bobot |
| --- | ---: |
| Data Preparation & Experimental Workflow | 20% |
| Deep Learning Model Construction | 20% |
| Model Behavior & Performance Analysis | 20% |
| Real-World Suitability & Limitations | 15% |
| Working Deep Learning Application | 15% |
| AI Usage, Verification & Reflection | 10% |

| Speech Recognition [SR 18, 21.5] | Bobot |
| --- | ---: |
| Speech Recognition Fundamentals | 15% |
| Experimental Workflow & Technical Evaluation | 20% |
| System Analysis & User Evaluation | 20% |
| Real-Time Speech Recognition Application | 30% |
| Real-World Problem & Target User | 5% |
| AI Usage, Verification & Reflection | 10% |

Masing-masing rubrik berjumlah 100%. Bobot AI SR 10% sudah termasuk total, bukan tambahan. Rentang penilaian pada rubrik: Excellent 90–100, Good 80–89, Satisfactory 70–79, Limited 60–69, Poor di bawah 60. Nilai tertinggi menuntut workflow lengkap dan dapat diulang, pemahaman model dan fundamental, analisis kritis, bukti pengguna nyata, aplikasi real-time yang berfungsi baik, serta penggunaan AI yang transparan dan diverifikasi. Rubrik tidak menjamin nilai tertentu hanya karena checklist terisi.

### Makna tingkat penilaian

| Aspek | Excellent | Good | Satisfactory | Limited | Poor |
| --- | --- | --- | --- | --- | --- |
| DL: data dan alur eksperimen | Lengkap, sistematis, beralasan, dapat diulang dari data sampai evaluasi | Terstruktur dengan sedikit kekurangan | Berfungsi, justifikasi terbatas | Alur lemah atau belum lengkap | Tidak ada eksperimen yang bermakna |
| DL: konstruksi model | Implementasi tepat, sesuai, dan dipahami kuat | Tepat dengan kekurangan kecil | Berfungsi, pemahaman terbatas | Sebagian berfungsi atau alasan lemah | Tidak mampu membangun model yang berjalan |
| DL: perilaku dan performa | Analisis mendalam training, efek eksperimen, error, trade-off | Analisis kuat dengan celah kecil | Analisis dasar | Umumnya deskriptif | Sedikit/tidak ada analisis bermakna |
| DL: kecocokan nyata | Evaluasi kritis kecocokan, robustness, biaya, batasan, deployment | Evaluasi baik dengan celah kecil | Analisis dasar | Pertimbangan praktis terbatas | Tidak ada evaluasi nyata yang bermakna |
| DL: aplikasi | Berfungsi penuh dan menunjukkan penggunaan praktis model | Berfungsi dengan keterbatasan kecil | Berfungsi tetapi terbatas | Sebagian berfungsi | Tidak berfungsi |
| DL: AI dan refleksi | Transparan, dievaluasi kritis, diverifikasi mandiri, bertanggung jawab | Terdokumentasi dan diverifikasi dengan baik | Dokumentasi dasar, refleksi terbatas | Kontribusi tidak jelas atau verifikasi lemah | Penggunaan disembunyikan/tidak dapat diverifikasi atau dijelaskan |
| SR: fundamental | Konsep akurat dan terhubung mendalam dengan sistem | Akurat dengan sedikit celah | Dasar dengan kedalaman terbatas | Tidak lengkap atau ada beberapa kesalahan konsep | Tidak dapat menjelaskan konsep inti |
| SR: eksperimen | Ketat, sistematis, dapat diulang, metrik sesuai | Sistematis dengan keterbatasan kecil | Rancangan berfungsi tetapi terbatas | Tidak lengkap atau justifikasi lemah | Tidak ada eksperimen bermakna |
| SR: analisis dan pengguna | Gabungkan hasil teknis dan feedback dalam analisis mendalam | Analisis kuat dengan celah kecil | Analisis dasar | Umumnya deskriptif | Sedikit/tidak ada analisis bermakna |
| SR: aplikasi real-time | ASR lokal berfungsi penuh, responsif, dan andal | Berfungsi dengan keterbatasan kecil | Berfungsi tetapi robustness/responsiveness terbatas | Sebagian real-time atau tidak stabil | Tidak ada aplikasi real-time yang berfungsi |
| SR: masalah dan pengguna | Masalah jelas, target teridentifikasi, bukti relevansi kuat | Masalah/target jelas, validasi cukup | Masalah relevan, validasi pengguna terbatas | Hubungan sistem dan pengguna lemah | Masalah atau pengguna tidak jelas |
| SR: transparansi AI | Efektif, transparan, terdokumentasi, diverifikasi sistematis | Terdokumentasi dan umumnya terverifikasi | Terdokumentasi, verifikasi terbatas | Dokumentasi/kontribusi tidak jelas | Disembunyikan, tidak terdokumentasi, atau tidak dapat dijelaskan |
| SR: penggunaan kritis AI | Mahasiswa menguji saran, mengenali kesalahan, membuat keputusan berdasar bukti | Mengevaluasi dengan celah kecil | Lebih banyak menerima saran dengan evaluasi terbatas | Sedikit bukti evaluasi kritis | Tidak dapat menjelaskan atau mengevaluasi hasil AI |

Tabel ini merangkum deskripsi rubrik sumber; gunakan dokumen dosen untuk teks penilaian asli.

## 11. Audit awal Lingua — 21 November 2026

Status di bawah berdasarkan file proyek yang diperiksa dan hasil Colab yang tercatat di [MODEL.md](MODEL.md); bukan audit akhir atau jaminan lulus. `Belum terbukti` berarti bukti belum ditemukan dalam pemeriksaan ini, bukan bukti pasti bahwa pekerjaan tidak pernah dilakukan.

| Kriteria | Status dan bukti/pekerjaan berikutnya |
| --- | --- |
| Masalah dan target | **Sebagian:** README menyebut mahasiswa dan dua bahasa; perlu identifikasi calon pengguna nyata, validasi masalah, dan skenario yang terukur. |
| Data dan persiapan | **Sebagian:** FLEURS dua bahasa, split, dan audit 7.259 pasangan tercatat di `data/README.md` dan `results/data_audit.md`. Lengkapi penjelasan distribusi, bias, keterbatasan, durasi, dan bukti kesesuaian dengan kondisi penggunaan. |
| Model dan baseline | **Sebagian:** notebook Model A/B tersedia, konfigurasi dan hasil awal tercatat. Lengkapi uraian model, pretraining, alasan desain dan bukti eksperimen. |
| Baseline + dua kondisi DL | **Tiga kondisi tersedia:** Whisper Base asli sebagai baseline, Model A dari awal, dan Model B dengan LoRA. Hasil perbandingan tercatat di `docs/MODEL.md`. Lengkapi penjelasan rancangan, perubahan, alasan, trade-off, dan analisis; Model A mengubah beberapa faktor sekaligus, sehingga efek masing-masing tidak dapat dipisahkan dari perbandingan ini. |
| Loss dan metrik train/dev tiap epoch | **Belum lengkap/terverifikasi:** notebook memuat training loss dan evaluasi dev; belum ditemukan bukti lengkap validation loss dan metrik train untuk setiap epoch pada semua run. Metrik historis yang tidak tersimpan tidak boleh dibuat-buat. |
| Test dan pemilihan | **Sebagian:** perbandingan test tercatat, tetapi test sudah terekspos; hasil eksploratif, bukan test tersembunyi. Pastikan pemilihan berdasarkan dev, dan gunakan data independen untuk klaim evaluasi akhir jika diperlukan. |
| Aplikasi lokal real-time | **Belum terbukti:** `app/README.md` menyebut tempat pengembangan; belum ditemukan aplikasi mikrofon berjalan, transkrip parsial, atau integrasi ASR lokal. |
| Kondisi SR dan latency | **Belum terbukti:** WER/CER tersedia pada rekaman FLEURS, tetapi belum ada bukti pengujian kondisi aplikasi normal vs kondisi lain dan latency real-time pada perangkat aplikasi. |
| Analisis kesalahan dan biaya | **Sebagian:** hasil dan contoh transkrip tersedia di notebook/Colab. Perlu analisis pola, robustness, training/inference time, memori, ukuran model, hardware, scalability, dan trade-off yang terdokumentasi. |
| User testing | **Belum terbukti:** belum ditemukan bukti minimal lima target users nyata, tugas, observasi, feedback, analisis, atau persetujuan dosen untuk pengecualian. |
| Technical report dan evidence | **Belum terbukti:** belum ditemukan technical report lengkap, screenshot aplikasi, diagram final, hasil user testing, dan analisis gabungan. |
| AI log dan deklarasi | **Belum terbukti:** penggunaan AI diketahui dari proses kerja, tetapi log material, verifikasi mahasiswa, deklarasi, dan form yang diperlukan belum ditemukan. Klarifikasi juga daftar tool yang diizinkan. |
| Pengumpulan | **Belum terbukti:** jadwal, format tiap mata kuliah, aturan laporan gabungan, dan bukti submit Exam Apps belum diperiksa. |

### Prioritas berikutnya

1. Konfirmasi aturan AI, format/penyerahan kedua mata kuliah, serta identifikasi minimal lima calon pengguna yang sesuai.
2. Dokumentasikan Whisper asli, Model A, dan Model B sebagai tiga kondisi eksperimen DL; jelaskan batas perbandingannya. Lengkapi pencatatan loss dan metrik train/dev untuk run baru. Rancang baseline dan satu kondisi SR yang relevan.
3. Bangun aplikasi mikrofon dengan ASR lokal dan transkrip parsial, lalu ukur latency dan lakukan pengujian kondisi nyata.
4. Lakukan user testing nyata, analisis kesalahan dan trade-off, susun technical report, AI log, declaration, dan seluruh bukti.

Jangan mengubah atau mengklaim hasil yang sudah terjadi hanya agar checklist terlihat lengkap. Semua perubahan proyek berikutnya harus mempertahankan bukti, konsistensi evaluasi, dan batasan ASR lokal.
