# Model

Bandingkan Model A (CNN + BiGRU + CTC dari awal) dan Model B (Whisper Base multilingual dengan fine-tuning). Whisper asli menjadi acuan tambahan. Rencana belum dilatih atau dievaluasi.

`01_verifikasi_data.ipynb` memeriksa audio, transkrip dan split FLEURS Indonesia/Inggris. Folder `model_a/` dan `model_b/` berisi kerangka preprocessing, training, evaluasi, dan test. Audio disiapkan mono 16 kHz; A memakai log-Mel dan karakter CTC, B memakai Whisper Processor. Gunakan `dev` untuk pemilihan dan `test` untuk pengujian akhir setelah pilihan dikunci.

Sebelum training penuh, tentukan perangkat, pengaturan awal dan teknik fine-tuning lewat pilot. Bandingkan WER per bahasa, kecepatan dan memori di dev; aturan pemilihan satu model dan batas penerimaan masih perlu ditetapkan.
