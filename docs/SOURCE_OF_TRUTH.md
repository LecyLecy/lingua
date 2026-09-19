# Source of truth and reading order

Use this page to find the source material that defines the project. Do not rely on a slide deck or an old summary when an official criterion document covers the same point.

## Priority order

1. Official course criteria documents.
2. This repository's `docs/PROJECT_CONTEXT.md` for the current agreed Lingua implementation scope.
3. The local course project notes listed below.
4. README files and task-specific documentation.

## Local source files outside this repository

These paths are relative to the `Lingua/` repository root in the shared local workspace.

| Purpose | Relative path | Read when |
| --- | --- | --- |
| Current Deep Learning criteria | `../LECTURE/Final Project/Form Submit Final Project COMP6826001.docx` | Planning model, data, experiments, report, or app work. |
| Deep Learning project notes | `../LECTURE/Final Project/NOTES.md` | Checking previously agreed model and evaluation scope. The old display name LinguaLive is superseded by Lingua in this repo. |
| Speech Recognition official criteria | `../../Speech_Recognition/LECTURE/Project/20260907160650_FINAL_PROJECT_COMP6822001_Speech_Recognition.docx` | Planning real-time behavior, local inference, user tests, or evaluation. |
| Speech Recognition project summary | `../../Speech_Recognition/LECTURE/Project/README.md` | Reviewing the original project rationale and validation checklist. |
| Speech Recognition lab project idea | `../../Speech_Recognition/LAB/Project/IDEA.md` | Reviewing the detailed streaming, model, UI, and evaluation concept. |

## When sources disagree

- Official current-year criteria win over older documents.
- The current project branding is **Lingua**, even if older local notes say LinguaLive.
- This repository uses Indonesian-English as the required core scope.
- Do not change the target user, core languages, model direction, or use of external services without documenting the decision and confirming it with the project owner.

## Information that must be recorded before a result is trusted

- Dataset name, license, source link, consent status if applicable, and train/validation/test split.
- Model name/version, runtime, decoding settings, fine-tuning configuration, and checkpoint selection rule.
- Hardware, operating system where relevant, chunk duration, overlap, and audio settings.
- Exact command or reproducible procedure, timestamp, data version, and output file path.
- Metric definition, evaluation set size, sample errors, and limitations.
- User-test task, anonymized participant identifier, consent method, feedback, and observed issues.
