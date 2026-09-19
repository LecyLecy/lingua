# Lingua project context

## Product statement

Lingua is a local real-time Indonesian-English speech recognition and translation application. It helps a user who reads English more comfortably than Indonesian follow bilingual Indonesian-English lectures, presentations, and discussions.

The application captures microphone audio continuously, displays changing captions while the speaker is still talking, identifies the likely source language, and translates only stable caption segments into the selected output language. If input and output languages match, Lingua shows the transcript and skips translation.

The product title is deliberately only **Lingua**. The target user is defined in the project description and test plan rather than forced into the title.

## Shared course purpose

Lingua is one project shared by the Deep Learning and Speech Recognition courses.

| Course | Main contribution | Evidence expected |
| --- | --- | --- |
| Deep Learning | Fine-tune Indonesian ASR and compare it fairly with a pretrained baseline. | Legal dataset description, data split, training setup, evaluation, analysis, working application. |
| Speech Recognition | Local real-time microphone ASR application that solves a real user problem. | Partial captions during speech, no external ASR API, WER, latency or RTF, errors, and at least five real target-user tests. |

## Required product flow

1. User selects an output language: Indonesian or English.
2. User starts a local microphone session.
3. Audio is captured in short, overlapping chunks and passed to a bounded background queue.
4. Local ASR produces partial or updated captions before the session ends.
5. UI shows source-language evidence or an uncertainty state.
6. User may override uncertain Indonesian or English detection.
7. Caption stabilizer finalizes a segment after enough evidence or a short pause.
8. Local translation processes the finalized segment only when source and output differ.
9. User stops the session and sees the final transcript, translation, and latency summary.

## Technical direction

- **ASR baseline:** a locally downloaded open-source multilingual Whisper model or compatible local runtime.
- **ASR fine-tuning:** Indonesian ASR, trained and evaluated with legal, documented data such as Mozilla Common Voice Indonesian. Keep training, validation, and held-out test data separate.
- **Translation:** a local open-source model such as NLLB on stable transcript text. Translation fine-tuning is optional, not the core contribution.
- **Audio:** use continuous microphone capture and short overlapping chunks. An initial 3-second chunk with about 0.75-second overlap is a tunable starting point, not a performance claim.
- **Real-time behavior:** prioritise caption updates. Translation must run independently so a slow translation never stalls ASR.

## Evaluation plan

1. Pretrained ASR baseline on held-out clean speech.
2. Fine-tuned Indonesian ASR on the same held-out evaluation approach.
3. At least one meaningful noise condition, such as classroom, fan, traffic, or conversation noise.
4. Real-time performance with end-to-end latency, response time, or real-time factor; record hardware, model size, chunk duration, and overlap.
5. Optional Indonesian-versus-English language indication accuracy on labelled held-out samples.
6. At least five real target users completing a realistic bilingual listening or discussion task.

Required ASR metric: **Word Error Rate (WER)**. Recommended supporting evidence: CER where appropriate, latency, RTF, sample outputs, and error analysis for noise, speed, accents, code switching, technical terms, names, and microphone quality.

## Scope boundaries

- Core languages: Indonesian and English.
- Do not promise universal translation or additional languages without a real target-user scenario, legal data, and evaluation.
- Do not upload a finished recording to a service and call it real-time transcription.
- Do not send microphone audio to hosted speech-recognition APIs.
- Do not save raw user audio by default.
- Do not invent or backfill evidence after writing a report.

## Required final evidence

- Working local application with microphone input, live captions, local ASR, language state, manual correction, local translation, and final summary.
- Reproducible code and dependency setup.
- Dataset license and preparation notes, training configuration, and experiment records.
- WER plus real-time performance evidence, qualitative errors, and limitations.
- At least five genuine target-user sessions with consent-aware, anonymized feedback.
- Combined report, demo video, repository, AI Usage Log, and AI Usage Declaration as required by the courses.
