# App

Antarmuka lokal untuk memilih bahasa dan mencoba mikrofon. Model ASR dan penerjemah belum terhubung; subtitle belum tersedia. Audio tidak dikirim atau disimpan pada versi ini.

## Jalankan

Di terminal dari root proyek:

```powershell
.\.venv\Scripts\python.exe -m pip install -r app/requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.server:app --host 127.0.0.1 --port 8000
```

Buka `http://127.0.0.1:8000`, pilih bahasa, lalu tekan **Mulai mendengarkan** dan izinkan mikrofon. Tekan **Berhenti mendengarkan** untuk mematikan mikrofon. Hentikan server dengan Ctrl+C. Jika belum punya `.venv`, buat dengan `python -m venv .venv`.

Model akan dihubungkan melalui komponen terpisah pada tahap berikutnya. Training dan evaluasi tetap berada di notebook.

## Siapkan model untuk integrasi nanti

Versi antarmuka saat ini bisa dijalankan tanpa model. Untuk menyiapkan Model B di laptop, jalankan dari root proyek:

```powershell
.\.venv\Scripts\python.exe -m pip install "huggingface_hub>=0.26,<1"
.\.venv\Scripts\hf.exe download openai/whisper-base --local-dir models/whisper-base --include *.json *.txt *.safetensors *.tiktoken
```

Unduh checkpoint terbaik Model B [best.pt dari Google Drive](https://drive.google.com/file/d/1MPEk6z0K4u7cMTLcHzh6DrvxYIQAaXty/view) menggunakan akun yang memiliki akses. Letakkan file tersebut di:

```text
checkpoints/model_b/whisper_base_lora_v1/best.pt
```

`models/whisper-base/` berisi model dasar dan `best.pt` berisi adapter LoRA beserta informasi checkpoint. Kedua folder diabaikan Git, jadi tiap anggota tim perlu menyiapkannya sendiri. Dataset tidak diperlukan untuk memakai aplikasi. Aplikasi belum memuat model ini; integrasi dan pengujian lokal dilakukan pada tahap berikutnya.
