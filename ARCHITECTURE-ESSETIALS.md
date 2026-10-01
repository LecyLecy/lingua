# Lingua Architecture Essentials

Quick reference. Full design: `ARCHITECTURE.md`. Product requirements: `PRD.md`.

## Product boundary

- Local real-time captions for multilingual listening contexts.
- Up to 99 ASR model candidates, not 99 guaranteed supported languages.
- Benchmark at least three local pretrained ASR candidates before choosing deployment model.
- Fine-tune only the selected pretrained candidate for Indonesian, then compare it with its original baseline.
- Translation is optional, local, stable-segment only, and never blocks captions.

## Non-negotiables

- No hosted ASR API or runtime audio upload.
- Show partial or revised captions while speech continues.
- Keep raw audio out of persistent storage by default.
- Never invent WER, latency, user feedback, supported-language status, or experiment results.
- Candidate, Evaluation, Supported, and Restricted are distinct language states.

## Initial stack

- Python 3.11+
- PySide6 desktop UI
- `sounddevice` and NumPy capture path
- Local Whisper-compatible pretrained ASR candidates through `faster-whisper`
- PyTorch/Transformers for Indonesian training experiments
- Local NLLB-class translation runtime for stable text
- SQLite for final text and session metadata

## Runtime flow

```text
Microphone
  -> bounded audio queue
  -> local ASR
  -> partial caption
  -> revision/stabilizer
  -> UI + persisted final text
  -> optional local translation worker
```

Caption freshness takes precedence over stale queued audio. UI must show degraded state if work is dropped.

## Core data models

- `LanguageProfile`: ASR/translation status and evidence.
- `AudioFrame`: transient capture metadata; no persisted samples.
- `CaptionHypothesis`: revisable ASR text.
- `CaptionSegment`: stable/final transcript plus optional translation.
- `SessionRecord`: lifecycle and timing, no raw audio.

## Biggest risks

- Largest or lowest-WER model may fail live latency or memory gate.
- Device cannot sustain real time.
- Chunk boundaries repeat or lose words.
- Code switching and low-confidence language detection.
- Script-specific evaluation invalidates plain WER comparison.
- Translation is unavailable or too slow.
- Candidate language lacks legal data or representative use case.

## Do not build yet

- Microservices, cloud infrastructure, message brokers.
- Universal support claim or 99 language-specific fine-tunes.
- Diarization, speaker identity, analytics, or default recording.
- Translation of unstable caption text.

## Model-selection rule

1. Benchmark at least three local pretrained candidates on identical held-out data, hardware, chunk settings, and measurement method.
2. Reject any candidate that is not local, cannot provide partial captions, lacks required language labels, violates licence, or builds a growing live backlog.
3. Rank remaining candidates by Indonesian WER, p95 caption latency, real-time factor, and peak memory, in that order.
4. Fine-tune only winner for Indonesian. Deploy best eligible measured variant, not assumed best model size.

## Update map

- Product/user/scope/language change: `PRD.md`, then this file, `ARCHITECTURE.md`, `README.md`, and `docs/PROJECT_CONTEXT.md`.
- Runtime/data model/stack change: `ARCHITECTURE.md`, then this file and relevant config/code.
- Experiment/data/evidence change: data card, `configs/asr_benchmark.example.json`, scripts, report artifact, and AI usage log if AI materially helped.
