# Lingua project context

## Product statement

Lingua is a local real-time multilingual speech-recognition and optional stable-segment translation application for people following lectures, presentations, meetings, and discussions. It captures microphone audio continuously, displays partial or revised captions during speech, exposes local ASR language evidence, and translates only finalized segments.

`PRD.md` is the detailed product source of truth. The selected pretrained multilingual ASR model may offer up to 99 candidate language labels. This is a discovery and evaluation catalogue, not a blanket product-support claim. Indonesian is the required fine-tuning and research language; English and Indonesian are initial evaluation priorities.

## Shared course purpose

| Course | Main contribution | Evidence expected |
| --- | --- | --- |
| Deep Learning | Fine-tune Indonesian ASR and compare fairly with pretrained baseline. | Legal data, separate splits, training setup, at least two relevant experimental conditions beyond baseline, evaluation, analysis, working system. |
| Speech Recognition | Local real-time microphone ASR application for real user problem. | Partial captions during speech, no hosted ASR API, WER plus responsiveness evidence, error analysis, and real target-user testing. |

## Course-aligned flow

1. User chooses an output language and starts a local microphone session.
2. Continuous audio enters short overlapping chunks and a bounded background queue.
3. Local ASR produces partial or updated captions before the session ends.
4. UI exposes source-language evidence, uncertainty, and manual override.
5. Stabilizer finalizes text after enough evidence or pause.
6. Local translation handles finalized text only when source and output differ.
7. User stops session and reviews final text and measured timing.

## Language enablement rule

A candidate language becomes Supported only after documented user need, legal evaluation data, per-language accuracy and latency measurements, local runtime verification, representative error analysis, and translation-pair validation if translation is advertised. Use WER where word segmentation is appropriate; document language-specific tokenization and a supplemental metric such as CER where it is not.

## Non-negotiable boundaries

- ASR is local. Hosted speech-recognition services are prohibited.
- Partial or updated captions must appear while person is speaking.
- Translation is local and cannot block caption updates.
- Raw microphone audio is not saved by default.
- Do not promise universal/equal-quality language or translation coverage.
- Do not fabricate data, WER, latency, user tests, findings, or citations.

## Required final evidence

- Working local application with microphone input, live captions, local ASR, language state, manual override, and final summary.
- Reproducible code, dependency setup, model/runtime settings, and experiment scripts.
- Dataset license/preparation notes, Indonesian baseline and fine-tuning records, separate splits, and held-out evaluation.
- WER plus real-time performance evidence, qualitative errors, and limitations.
- Consent-aware target-user sessions with anonymized feedback linked to technical findings.
- Required report, demo, repository, AI usage log, and AI declaration.
