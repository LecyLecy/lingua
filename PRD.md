# Lingua Product Requirements Document

## 1. Product definition

Lingua is a local, real-time speech recognition and optional translation application for people following multilingual lectures, presentations, meetings, and discussions. It captures microphone audio on the user's device, shows changing captions while a person is still speaking, and translates only caption segments that have become stable.

The product solves a listening-comprehension problem, not a general-purpose transcription or translation problem. A user should be able to follow spoken content without uploading microphone audio to a hosted speech-recognition service or waiting for a recording to end.

## 2. Users and use cases

### Primary users

- Students and listeners who follow bilingual or multilingual academic sessions.
- Presenters, meeting participants, and accessibility users who need readable live captions.

### Primary use case

1. A user selects a preferred output language and starts a microphone session.
2. Lingua displays partial or revised captions while speech continues.
3. The user can see the detected source language or override an uncertain result.
4. Once a caption segment is stable, Lingua translates it if its source and output languages differ.
5. The user stops the session and reviews final captions, translations, and measured session timing.

## 3. Language policy

Lingua begins with an ASR language catalogue of up to **99 candidate languages** supported by the selected pretrained multilingual ASR model. This is a model-coverage ceiling, not a promise that all 99 languages are accurate, equally fast, or available in every build.

Each language has one of four statuses:

| Status | Meaning |
| --- | --- |
| Candidate | Model exposes a language label; no product claim yet. |
| Evaluation | Being measured for accuracy, latency, data legality, and user need. |
| Supported | Passed defined release gates for an intended use case. |
| Restricted | Hidden or labelled experimental because a gate failed or evidence is missing. |

Indonesian remains the required fine-tuning and research language for the Deep Learning contribution. English and Indonesian are initial evaluation priorities. Other languages may be enabled only after the same evidence process. Translation coverage is independent from ASR coverage; a language is not translation-supported merely because ASR can identify it.

## 4. Product goals

1. Provide local partial or updated captions during live speech.
2. Keep captions responsive when translation is slow, unavailable, or disabled.
3. Make language confidence and uncertainty visible and allow manual override.
4. Support a disciplined path from up to 99 model candidates to a smaller evidence-backed supported catalogue.
5. Produce reproducible technical and user evidence for course assessment.

## 5. Product requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| PRD-01 | Capture microphone input continuously without recording completion as a prerequisite for captions. | Must |
| PRD-02 | Run ASR locally. Hosted ASR APIs are prohibited. | Must |
| PRD-03 | Display partial or revised caption text before a speaker finishes. | Must |
| PRD-04 | Process audio in short overlapping chunks with bounded backpressure. | Must |
| PRD-05 | Show detected source language, uncertainty, and a user override. | Must |
| PRD-06 | Translate stable segments only; translation must never block caption updates. | Must |
| PRD-07 | Expose language support status and avoid presenting candidates as guaranteed support. | Must |
| PRD-08 | Keep raw microphone audio out of persistent storage by default. | Must |
| PRD-09 | Show final transcript, translations, and real measured session timing after stop. | Should |
| PRD-10 | Allow a user to copy or export final text without exporting raw audio. | Should |

## 6. Functional behavior

### Live captions

- User can start, pause, resume, and stop a microphone session.
- UI distinguishes listening, processing, partial, stable, translating, error, and stopped states.
- Newer caption hypotheses can replace older partial text for the same audio interval.
- Stable captions are retained as final transcript segments; duplicates caused by chunk overlap are suppressed.

### Language handling

- Automatic language evidence comes from local ASR output.
- Manual language override takes precedence until user clears it or ends the session.
- Mixed-language and code-switched speech may be marked uncertain; Lingua must not silently invent certainty.
- Language selector shows only statuses that are truthful for the installed model and evaluation state.

### Translation

- Translation starts only after a segment stabilizes.
- If source and output languages match, Lingua shows transcript only.
- If translation model or language pair is unavailable, transcript remains visible and UI explains translation is unavailable.
- Translation updates attach to the source segment and cannot alter source transcript text.

## 7. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Privacy | ASR runs locally; raw microphone audio is not saved by default. |
| Responsiveness | Caption freshness wins over processing stale audio when device cannot keep up. Actual latency must be measured, not assumed. |
| Reliability | Device loss, model-load failure, overflow, and unsupported language state produce understandable recovery actions. |
| Accessibility | Captions remain readable, keyboard-accessible, and visibly distinguish partial from stable text. |
| Evidence | Every accuracy or latency claim identifies model, hardware, data, settings, command, and output. |
| Reproducibility | Data split, model settings, decoding configuration, and evaluation scripts are versioned. |

## 8. Evaluation and release gates

A language moves from Candidate or Evaluation to Supported only when its intended scenario has:

1. a real user need;
2. legal, documented evaluation data;
3. a language-appropriate accuracy measure, including WER where valid and CER or another documented supplement where word segmentation makes WER unreliable;
4. measured latency or real-time factor on named hardware;
5. representative error analysis; and
6. a working local runtime and, where translation is offered, a verified local translation path.

The Indonesian ASR fine-tuning study compares a pretrained baseline with at least two relevant experimental conditions using separate train, validation, and held-out test data. The project also needs real target-user testing with consent-aware, anonymized feedback. No metric, user result, or supported-language claim may be fabricated.

## 9. Explicit non-goals for first release

- Universal or equal-quality support for every spoken language.
- Hosted speech recognition, cloud audio upload, or background recording by default.
- Speaker identification, diarization, speaker authentication, or meeting analytics.
- Perfect transcription in noise, overlap, code-switching, accents, technical terminology, or named entities.
- Fine-tuning a model for every catalogue language.
- Translation of partial captions or translation that delays live caption updates.

## 10. Risks and edge cases already accounted for

| Risk or edge case | Product response |
| --- | --- |
| Device slower than real time | Bounded queue, freshness-first overload policy, visible degraded state, recorded measurement. |
| Chunk overlap creates repeated or missing words | Revision-aware stabilizer and overlap de-duplication; test with boundary phrases. |
| Code switching or language uncertainty | Show uncertainty and manual override; never promote a guess to a guarantee. |
| Thai, Chinese, Japanese, or other scripts without straightforward word boundaries | Define evaluation tokenization per language; retain required WER where valid and record supplemental metrics. |
| Two people speak at once | Preserve best-effort single-stream captioning and report limitation; no diarization scope. |
| Translation unsupported or slow | Keep transcript live; mark translation unavailable or pending. |
| Microphone disconnects or permission fails | Stop safely, preserve finalized text, and offer device or permission recovery. |
| Sensitive spoken content | Default to in-memory audio only; export text only after user action. |
| Candidate language has weak data or poor results | Keep it Evaluation or Restricted; do not advertise it as Supported. |

## 11. Scope controls

Adding a language, changing target users, enabling remote processing, changing the core Indonesian fine-tuning study, or adding persistent audio storage is a product-scope change. Update this file first, then update `ARCHITECTURE.md`, `ARCHITECTURE-ESSETIALS.md`, `README.md`, and relevant evaluation or data documentation in the same change.
