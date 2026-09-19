# Lingua agent instructions

## Start here

Before changing this repository, read these files in order:

1. `README.md` for the public project description.
2. `docs/PROJECT_CONTEXT.md` for the agreed product scope and non-negotiable course requirements.
3. `docs/SOURCE_OF_TRUTH.md` to locate the original Deep Learning and Speech Recognition criteria files.
4. `docs/COLLABORATION.md` before creating branches, committing, reviewing, or merging.

If an instruction conflicts with an official course-criteria document, the official course criteria take priority. If it conflicts with a system or platform safety instruction, follow the higher-priority instruction and explain the constraint.

## Mandatory skill protocol

The project owner requires the Ponytail and Caveman skills for every AI task. Before each prompt or task, make sure both skills are installed and available through the approved local skill-installation process, then use both skills for that task. If either skill is unavailable, report that fact clearly; never claim that it was used when it was not available.

Required local skill files:

- `$CODEX_HOME/skills/ponytail/SKILL.md`
- `$CODEX_HOME/skills/caveman/SKILL.md`

For each task, first verify that both files exist and read their instructions. Use Ponytail's pre-implementation gate before code changes and its review pass before completing a code change. Use Caveman's communication rules for chat responses only; write normal prose in code, documentation, commits, and external messages, as its instructions require. If a required skill is missing, use the approved installer to restore it and report the outcome honestly.

## Product rules that cannot be weakened

- The product name is **Lingua**. Do not rename it to LinguaLive unless the owner asks.
- Core scope is Indonesian and English. Extra languages require a real user need, legal data, and evaluation.
- Speech recognition must run locally. Do not use Google, Azure, Amazon, OpenAI, AssemblyAI, or any other hosted ASR API.
- The application must show partial or updated captions while someone is speaking. Transcribing only after a complete recording ends does not meet the project goal.
- Translation is a secondary local feature. It must process only stable transcript segments and must never block live captions.
- The main Deep Learning contribution is Indonesian ASR fine-tuning and its evaluation against a pretrained baseline. Translation fine-tuning is optional.
- Report only real, reproducible data, metrics, tests, and feedback. Never fabricate WER, latency, participants, citations, or results.

## Collaboration and Git rules

- `main` contains only reviewed, completed, demonstrably working work. Do not commit directly to it.
- `production` is the shared integration branch and the normal base for development.
- `adin` is the initial personal collaboration branch. Work on it or on a separate teammate branch created from `production`.
- Open a pull request or complete a peer review before merging a working branch into `production`.
- Merge `production` into `main` only after the agreed feature is complete, tested, documented, and free of known blockers.
- Before starting a task, update the working branch from `production`. Before pushing, inspect `git status`, run relevant checks, and ensure no ignored or sensitive file is staged.
- Keep commits focused and explain the change in imperative form, for example `feat: add microphone capture state` or `docs: record baseline evaluation plan`.

## What may be committed

Allowed: source code, tests, dependency manifests and lockfiles, documented configuration templates, scripts, anonymized aggregate experiment summaries with provenance, documentation, dataset cards, licenses, consent templates, UI assets with valid licenses, and small synthetic fixtures.

Do not commit: `.env` files or secrets, API tokens, real participant names or contact details, raw user recordings, unredacted feedback, datasets, downloaded model weights, checkpoints, caches, virtual environments, experiment artifacts without provenance, or large generated binaries. See `.gitignore` and `docs/COLLABORATION.md`.

## Evidence before claims

Any pull request that claims an improvement must identify the model/runtime, data split, hardware, settings, exact command, metric, and output location. Keep the training and test sets separate. Obtain consent before collecting any voice sample or user feedback.
