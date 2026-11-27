'use strict';

const source = document.querySelector('#source-language');
const target = document.querySelector('#target-language');
const swap = document.querySelector('#swap');
const record = document.querySelector('#record');
const recordLabel = document.querySelector('#record-label');
const sessionLabel = document.querySelector('#session-label');
const badge = document.querySelector('.session-badge');
const notice = document.querySelector('#notice');
const timer = document.querySelector('#timer');
const bars = [...document.querySelectorAll('#sound-bars i')];
let stream = null;
let context = null;
let animation = null;
let clock = null;
let starting = false;
let requestId = 0;

const languageName = { id: 'INDONESIA', en: 'INGGRIS' };
const defaultNotice = 'Model belum terhubung. Kamu bisa mencoba mikrofon, tetapi subtitle belum tersedia.';

function setNotice(message, isError = false) {
  notice.classList.toggle('error', isError);
  notice.querySelector('span:last-child').textContent = message;
}

function updateLanguages(changed) {
  if (source.value === target.value) {
    if (changed === source) target.value = source.value === 'id' ? 'en' : 'id';
    else source.value = target.value === 'id' ? 'en' : 'id';
  }
  document.querySelector('#source-icon').textContent = source.value.toUpperCase();
  document.querySelector('#target-icon').textContent = target.value.toUpperCase();
  document.querySelector('#source-caption-label').textContent = `SUBTITLE ASLI · ${languageName[source.value]}`;
  document.querySelector('#target-caption-label').textContent = `TERJEMAHAN · ${languageName[target.value]}`;
}

source.addEventListener('change', () => updateLanguages(source));
target.addEventListener('change', () => updateLanguages(target));
swap.addEventListener('click', () => {
  [source.value, target.value] = [target.value, source.value];
  updateLanguages(source);
});

function stopSession(message = defaultNotice, isError = false) {
  requestId += 1;
  starting = false;
  if (animation !== null) cancelAnimationFrame(animation);
  if (clock !== null) clearInterval(clock);
  animation = null;
  clock = null;
  if (stream) stream.getTracks().forEach(track => { track.onended = null; track.stop(); });
  stream = null;
  if (context) context.close().catch(() => {});
  context = null;
  bars.forEach(bar => { bar.style.height = '3px'; });
  record.disabled = false;
  source.disabled = target.disabled = swap.disabled = false;
  record.classList.remove('stop');
  recordLabel.textContent = 'Mulai mendengarkan';
  sessionLabel.textContent = 'Siap dimulai';
  badge.classList.remove('active');
  document.querySelector('#sound-label').textContent = 'Mikrofon belum aktif';
  document.querySelector('#action-title').textContent = 'Siap mendengarkan?';
  document.querySelector('#action-description').textContent = 'Pastikan mikrofonmu sudah terhubung.';
  setNotice(message, isError);
}

function errorMessage(error) {
  if (error.name === 'NotAllowedError' || error.name === 'SecurityError') return 'Izin mikrofon ditolak. Izinkan mikrofon di pengaturan browser, lalu coba lagi.';
  if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') return 'Mikrofon tidak ditemukan. Hubungkan mikrofon lalu coba lagi.';
  if (error.name === 'NotReadableError') return 'Mikrofon tidak dapat digunakan. Periksa perangkat atau tutup aplikasi lain yang memakainya.';
  return 'Mikrofon tidak dapat dimulai. Periksa pengaturan perangkat dan coba lagi.';
}

async function startSession() {
  if (starting || stream) return;
  if (!navigator.mediaDevices?.getUserMedia || !(window.AudioContext || window.webkitAudioContext)) {
    setNotice('Browser tidak mendukung akses mikrofon. Buka aplikasi melalui localhost di browser yang mendukungnya.', true);
    return;
  }
  starting = true;
  const thisRequest = ++requestId;
  record.disabled = true;
  recordLabel.textContent = 'Menunggu izin mikrofon...';
  setNotice('Izinkan akses mikrofon di browser untuk melanjutkan.');
  try {
    const newStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    if (thisRequest !== requestId) { newStream.getTracks().forEach(track => track.stop()); return; }
    stream = newStream;
    context = new (window.AudioContext || window.webkitAudioContext)();
    if (context.state === 'suspended') await context.resume();
    if (thisRequest !== requestId) return;
    const input = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    input.connect(analyser);
    const samples = new Uint8Array(analyser.fftSize);
    const paint = () => {
      analyser.getByteTimeDomainData(samples);
      let total = 0;
      for (const value of samples) total += ((value - 128) / 128) ** 2;
      const level = Math.min(1, Math.sqrt(total / samples.length) * 8);
      bars.forEach((bar, index) => { bar.style.height = `${Math.round(3 + level * (6 + (3 - Math.abs(3 - index)) * 3))}px`; });
      animation = requestAnimationFrame(paint);
    };
    paint();
    stream.getAudioTracks().forEach(track => { track.onended = () => stopSession('Mikrofon terputus. Hubungkan kembali dan mulai lagi.', true); });
    const started = Date.now();
    timer.textContent = '00:00';
    clock = setInterval(() => {
      const seconds = Math.floor((Date.now() - started) / 1000);
      timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    }, 1000);
    source.disabled = target.disabled = swap.disabled = true;
    badge.classList.add('active');
    sessionLabel.textContent = 'Mikrofon aktif';
    record.classList.add('stop');
    recordLabel.textContent = 'Berhenti mendengarkan';
    document.querySelector('#sound-label').textContent = 'Mikrofon aktif';
    document.querySelector('#action-title').textContent = 'Mikrofon sedang aktif';
    document.querySelector('#action-description').textContent = 'Tekan berhenti untuk mematikan mikrofon.';
    setNotice('Mikrofon aktif. Model belum terhubung, sehingga subtitle belum tersedia.');
  } catch (error) {
    if (thisRequest === requestId) stopSession(errorMessage(error), true);
  } finally {
    if (thisRequest === requestId) { starting = false; record.disabled = false; }
  }
}

record.addEventListener('click', () => { if (stream) stopSession(); else startSession(); });
window.addEventListener('pagehide', () => stopSession());
updateLanguages(source);
