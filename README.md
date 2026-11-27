# Lingua

Proyek Deep Learning dan Speech Recognition untuk membantu mahasiswa memahami pembicara bahasa Indonesia dan Inggris. Model A dan Model B sudah diuji; aplikasi masih dalam pengembangan.

Tujuan aplikasi: menampilkan transkrip saat pembicara masih berbicara dan menyediakan subtitle terjemahan. Pengenalan suara dijalankan secara lokal. Ukur akurasi, kecepatan, dan tanggapan pengguna nyata; jangan membuat hasil pengujian.

## Mulai

1. Unduh Google FLEURS Indonesia dan Inggris: lihat [panduan data](data/README.md).
2. Periksa data dan kembangkan model di [notebooks/](notebooks/).
3. Jalankan antarmuka awal melalui [panduan app](app/README.md). Model dan terjemahan belum terhubung.

Data tidak disimpan di Git; setiap anggota perlu mengunduhnya sendiri.

Kriteria tugas dan hal yang belum terpenuhi ada di [kriteria final project](docs/KRITERIA_FINAL_PROJECT.md).

## Status eksperimen

Model A dilatih 35 epoch; checkpoint terbaik pada dev adalah epoch 25. Model B dilatih 6 epoch; checkpoint terbaik pada dev adalah epoch 3. Test sudah pernah dijalankan, sehingga hasilnya bersifat eksploratif. Lihat [rincian model](docs/MODEL.md).

## Notebook lokal

Notebook di `notebooks/` memakai data dari `data/`, menyimpan checkpoint di `checkpoints/`, dan menyimpan hasil di `results/`. Untuk memakai checkpoint Colab, salin `best.pt` Model A ke `checkpoints/model_a/` dan checkpoint Model B ke `checkpoints/model_b/whisper_base_lora_v1/`. Notebook 03 dan 04 menyediakan sel instalasi dependensi. Training penuh ditujukan untuk Colab T4; GPU lokal 4 GB mungkin tidak cukup untuk batch yang sama.

Untuk menyiapkan Whisper Base dan checkpoint Model B di laptop, ikuti [panduan model lokal](app/README.md#siapkan-model-untuk-integrasi-nanti). Aplikasi saat ini belum menggunakan model tersebut.
