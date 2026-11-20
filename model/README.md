# Model

Bandingkan Model A (CNN + BiGRU + CTC dari awal) dan Model B (Whisper Base multilingual dengan LoRA fine-tuning). Whisper asli menjadi acuan tambahan. Rencana belum dilatih atau dievaluasi.

`01_verifikasi_data.ipynb` memeriksa audio, transkrip dan split FLEURS Indonesia/Inggris. Folder `model_a/` dan `model_b/` berisi kerangka preprocessing, training, evaluasi, dan test. Audio disiapkan mono 16 kHz; A memakai log-Mel dan karakter CTC, B memakai Whisper Processor. Gunakan `dev` untuk pemilihan dan `test` untuk pengujian akhir setelah pilihan dikunci.

Gunakan konfigurasi pilot berikut; uji satu langkah optimizer pada GPU sebelum training penuh. Bandingkan WER per bahasa, kecepatan dan memori di dev; aturan pemilihan satu model dan batas penerimaan masih perlu ditetapkan.

## Konfigurasi pilot

| Pengaturan | Model A: dari awal | Model B: LoRA fine-tuning |
| --- | --- | --- |
| Arsitektur | 2 CNN, 2 BiGRU (256 unit per arah), linear CTC | Whisper Base multilingual bawaan |
| Optimizer dan learning rate | AdamW, 0,001 | AdamW; learning rate LoRA ditentukan saat pilot |
| Batch awal | 2 sampel | 1 sampel, akumulasi 8 langkah (efektif 8) |
| Batas awal | 20 epoch | 3 epoch |

Target training: Google Colab Pro dengan NVIDIA T4 (16 GB VRAM), jika tersedia. GPU laptop RTX 3050 Ti (4 GB) dapat digunakan untuk pengujian lokal. Gunakan LoRA untuk fine-tuning B; tentukan learning rate dan konfigurasi LoRA saat pilot. Kanal CNN A 80 ke 64 ke 128 masih usulan: jenis CNN, bentuk tensor, kernel, stride, dan jumlah parameter perlu dipastikan saat implementasi. Batch dan epoch pada tabel masih titik awal, belum hasil uji. Di T4, coba batch B 2 atau 4 dengan penyesuaian akumulasi; FP16 dapat diuji. Bandingkan Model A dua BiGRU dengan tiga BiGRU setelah baseline. Simpan checkpoint secara berkala; sesi Colab dan ketersediaan GPU memiliki batas. Uji latensi dan memori pada perangkat deployment secara terpisah.
