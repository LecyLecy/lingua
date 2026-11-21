# Model

Bandingkan Model A (CNN + BiGRU + CTC dari awal) dan Model B (Whisper Base multilingual dengan LoRA fine-tuning). Keduanya sudah dilatih dan dievaluasi; Whisper asli juga sudah diuji sebagai pembanding.

Urutan notebook di [notebooks/](../notebooks): verifikasi data, Model A, Model B, lalu test akhir. Versi Colab notebook test akhir sedang diuji. Gunakan dev saat memilih konfigurasi; test sudah pernah dibuka dalam eksperimen sebelumnya.

Gunakan konfigurasi pilot berikut; uji satu langkah optimizer pada GPU sebelum training penuh. Bandingkan WER per bahasa, kecepatan dan memori di dev; aturan pemilihan satu model dan batas penerimaan masih perlu ditetapkan.

## Konfigurasi pilot

| Pengaturan | Model A: dari awal | Model B: LoRA fine-tuning |
| --- | --- | --- |
| Arsitektur | 2 CNN, 2 BiGRU (256 unit per arah), linear CTC | Whisper Base multilingual bawaan |
| Optimizer dan learning rate | AdamW, 0,001 | AdamW, 0,0001 |
| Batch awal | 32 sampel pada run Colab | 1 sampel, akumulasi 8 langkah (efektif 8) |
| Batas percobaan | 35 epoch | 6 epoch |

Target training: Google Colab Pro dengan NVIDIA T4 (16 GB VRAM), jika tersedia. GPU laptop RTX 3050 Ti (4 GB) dapat digunakan untuk pengujian lokal. Run Colab A memakai CNN 80 → 64 → 128, dua BiGRU dan 1.854.199 parameter. Adapter LoRA B memakai rank 8, alpha 16, dropout 0,05, pada `q_proj` dan `v_proj`. Uji latensi dan memori aplikasi pada perangkat deployment secara terpisah.

## Hasil awal Model A

Run Colab memakai 5.181 sampel train, 744 dev, AdamW dengan learning rate 0,001 dan batch 32. Hasil berikut berasal dari 20 epoch pertama, ketika checkpoint terbaik menurut rata-rata WER dev adalah epoch 20. Percobaan dilanjutkan sampai epoch 35; checkpoint terbaik menjadi epoch 25.

| Data | Bahasa | WER | CER |
| --- | --- | ---: | ---: |
| Dev | Indonesia | 89,1% | 34,0% |
| Dev | Inggris | 95,4% | 54,3% |
| Test eksploratif | Indonesia | 89,3% | 33,3% |
| Test eksploratif | Inggris | 94,8% | 53,3% |

Rata-rata WER kedua bahasa 92,3% pada dev dan 92,1% pada test. Hasil ini belum layak untuk subtitle. Test sudah dibuka saat eksperimen awal, sehingga bukan lagi test yang belum pernah dilihat untuk pemilihan berikutnya. Gunakan dev untuk membandingkan konfigurasi dan laporkan keterbatasan test.

## Hasil awal Model B

Training berlangsung 6 epoch; checkpoint epoch 3 dipilih berdasarkan rata-rata WER dev kedua bahasa (22,5%).

| Data | Bahasa | WER | CER |
| --- | --- | ---: | ---: |
| Dev | Indonesia | 32,7% | 9,8% |
| Dev | Inggris | 12,2% | 5,3% |
| Test eksploratif | Indonesia | 32,1% | 9,4% |
| Test eksploratif | Inggris | 14,6% | 6,0% |

Notebook test akhir membandingkan ulang checkpoint yang dipilih berdasarkan dev pada 1.334 sampel test:

| Model | Bahasa | WER | CER |
| --- | --- | ---: | ---: |
| Whisper asli | Indonesia | 41,9% | 14,3% |
| Whisper asli | Inggris | 11,4% | 5,6% |
| Model A, epoch 25 | Indonesia | 88,3% | 33,6% |
| Model A, epoch 25 | Inggris | 94,3% | 51,6% |
| Model B, epoch 3 | Indonesia | 32,1% | 9,4% |
| Model B, epoch 3 | Inggris | 14,6% | 6,0% |

Hasil test bersifat eksploratif karena data test sudah pernah dibuka. Penerjemahan, latensi mikrofon dan uji pengguna belum dievaluasi. Checkpoint Model A ada di `MyDrive/Lingua_training_76fce63f/checkpoints/model_a/`.
