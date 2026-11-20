# Data

Dataset: [Google FLEURS bahasa Indonesia (`id_id`)](https://huggingface.co/datasets/google/fleurs), lisensi CC BY 4.0. Data audio dan transkrip dibagi menjadi `train`, `dev`, dan `test`.

## Unduh

Jalankan dari root proyek di terminal. Perlu Python, pip, koneksi internet, dan ruang penyimpanan untuk arsip serta hasil ekstraksi.

```bash
python -m pip install -U huggingface_hub
hf download google/fleurs --repo-type dataset --include "data/id_id/*" --local-dir .
tar -xzf data/id_id/audio/train.tar.gz -C data/id_id/audio
tar -xzf data/id_id/audio/dev.tar.gz -C data/id_id/audio
tar -xzf data/id_id/audio/test.tar.gz -C data/id_id/audio
```

Hasil: `data/id_id/{train,dev,test}.tsv` dan audio di `data/id_id/audio/{train,dev,test}/`. Hasil preprocessing disimpan di `data/preprocessed/model_a/` atau `model_b/`; buat foldernya jika belum ada. Seluruh isi data selain README diabaikan Git.
