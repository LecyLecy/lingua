# Lingua agent instructions

## Read first

Before planning or changing this repository, read in this order:

1. `README.md` for current project status.
2. `PRD.md` for product scope, users, language policy, and non-goals.
3. `ARCHITECTURE-ESSETIALS.md` for non-negotiable technical decisions.
4. `ARCHITECTURE.md` before changing runtime, data models, persistence, or stack.
5. `docs/PROJECT_CONTEXT.md` for course alignment.
6. `docs/SOURCE_OF_TRUTH.md` before interpreting course criteria.
7. `docs/COLLABORATION.md` before branch, commit, review, or merge work.

Official course criteria override repository summaries. Direct instructions from project owner may change product scope; record that decision in documents listed below. Higher-priority platform or safety instructions always win.

## Documentation ownership

| If this changes | Update these files in same change |
| --- | --- |
| User, problem, feature, language, privacy, or non-goal | `PRD.md`, `ARCHITECTURE-ESSETIALS.md`, `ARCHITECTURE.md`, `README.md`, `docs/PROJECT_CONTEXT.md` |
| Runtime, queue policy, persistence, model interface, data model, or dependency | `ARCHITECTURE.md`, `ARCHITECTURE-ESSETIALS.md`, relevant source/config/tests, and `pyproject.toml` if dependency changes |
| Evaluation, dataset, model, metric, or experiment | data card, versioned config, script, provenance output, relevant architecture/PRD text, and AI usage log if AI materially assisted |
| Collaboration, branch, review, or content policy | `docs/COLLABORATION.md` and this file if workflow changes |

`PRD.md` is product source of truth. `ARCHITECTURE.md` is complete technical source of truth. `ARCHITECTURE-ESSETIALS.md` is intentionally short reference. Keep exact requested filename spelling; do not create duplicate alias.

## Product rules

- Product name: **Lingua**.
- ASR runs locally. Never send microphone audio to Google, Azure, Amazon, OpenAI, AssemblyAI, or any hosted ASR API.
- Show partial or revised captions while speech continues. Recording-then-transcribing is insufficient.
- Translation is separate local stable-segment feature. It must not delay captions.
- Selected pretrained model may expose up to 99 ASR candidates. Candidate count is not support, quality, latency, or translation promise.
- Indonesian ASR fine-tuning and fair comparison against pretrained baseline remain core Deep Learning work.
- Language support requires user need, legal data, per-language evaluation, local runtime verification, and documented release status.
- Do not persist raw user audio by default.
- Never invent metrics, experiments, participants, feedback, citations, or results.

## Required skill protocol

Use Ponytail and Caveman for every AI task. Before code changes, read `ponytail/SKILL.md`, perform pre-implementation gate, make smallest fitting change, then perform review pass. Use Caveman only for assistant chat; write normal prose in code, commits, and documentation.

Before reading or extracting supported documents, use MarkItDown with `py -m markitdown <input> -o <output>`, read resulting Markdown, and keep conversion output outside tracked source paths. Do not modify source documents.

## Code and data rules

- Keep domain models framework-free under `src/lingua/domain/`.
- Put orchestration in `src/lingua/application/`, interfaces in `src/lingua/ports/`, local adapters in `src/lingua/infrastructure/`, and presentation in `src/lingua/ui/`.
- Do not let UI code perform model inference or database writes directly.
- Do not add services, web APIs, brokers, cloud storage, diarization, analytics, or language-specific fine-tunes without approved requirement and evidence.
- Keep optional heavy runtime dependencies in `pyproject.toml` extras until executable feature needs them.
- Never commit secrets, `.env`, raw recordings, real participant data, datasets, model weights, checkpoints, caches, local databases, or generated experiment runs.
- Tests must verify behavior with real or synthetic fixtures. Do not fabricate evidence to make test or report look complete.

## Git workflow

- `main` contains reviewed, demonstrably working milestones only.
- `production` is shared integration base.
- `adin` is initial personal branch. Work there or in focused teammate branch based on updated `production`.
- Before work: fetch, update from `production`, then inspect status.
- Before push: inspect diff/status, run relevant checks, and ensure no ignored or sensitive file is staged.
- Use focused imperative commits. Peer review before merge into `production`; merge into `main` only after complete, tested, documented work.

## Evidence standard

Any accuracy, latency, support, or improvement claim must name model/runtime, data split, hardware, settings, command, metric, output location, and limitation. Keep training, validation, and held-out test data separate. Obtain consent before collecting voice samples or user feedback.
