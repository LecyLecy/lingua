# Data

Dataset: [Google FLEURS](https://huggingface.co/datasets/google/fleurs), lisensi CC BY 4.0. Gunakan bahasa Indonesia (`id_id`) dan bahasa Inggris Amerika (`en_us`) untuk menguji pengenalan suara masing-masing bahasa. Setiap bahasa memiliki audio dan transkrip `train`, `dev`, dan `test`. Kualitas terjemahan perlu diuji terpisah.

## Unduh

Jalankan dari root proyek. Perlu Python, pip, internet, dan ruang untuk arsip serta hasil ekstraksi.

```bash
python -m pip install -U huggingface_hub
hf download google/fleurs --repo-type dataset --include "data/id_id/*" "data/en_us/*" --local-dir .
tar -xzf data/id_id/audio/train.tar.gz -C data/id_id/audio
tar -xzf data/id_id/audio/dev.tar.gz -C data/id_id/audio
tar -xzf data/id_id/audio/test.tar.gz -C data/id_id/audio
tar -xzf data/en_us/audio/train.tar.gz -C data/en_us/audio
tar -xzf data/en_us/audio/dev.tar.gz -C data/en_us/audio
tar -xzf data/en_us/audio/test.tar.gz -C data/en_us/audio
```

Untuk tiap bahasa, metadata berada di `data/<bahasa>/{train,dev,test}.tsv` dan audio di `data/<bahasa>/audio/{train,dev,test}/`. Di Colab, cache fitur Model A disimpan sementara di `/content/lingua_logmel_v1` dan hilang saat runtime diganti. Isi data selain README diabaikan Git.

## Verifikasi

Sebelum preprocessing, periksa kecocokan audio dan transkrip, file rusak, durasi, jumlah data, dan pemisahan `train`, `dev`, `test` untuk tiap bahasa. Catat masalah dan pengecualian; jangan ubah data asli.

Rasio metadata bawaan train/dev/test: Indonesia **71,3% / 9,7% / 19,0%**; Inggris **71,4% / 10,8% / 17,8%**. Audit lokal sebelumnya membaca seluruh 7.259 pasangan; 18 durasi berada di luar batas tinjauan. Jalankan notebook 01 untuk memeriksa data sendiri, termasuk kemungkinan kebocoran dan kalimat paralel antarbahasa.
