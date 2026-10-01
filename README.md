<div align="center">

<img src="./assets/lingua-icon.svg" alt="Lingua icon" width="112" />

# Lingua

### Local real-time multilingual captions and stable-segment translation

[Product requirements](./PRD.md) · [Architecture](./ARCHITECTURE.md) · [Architecture essentials](./ARCHITECTURE-ESSETIALS.md) · [Collaboration](./docs/COLLABORATION.md)

</div>

> **Project status: scaffolded, not feature-complete.** No model runtime, microphone UI, measured result, user study, dataset, model weight, or benchmark is included yet.

## What Lingua is building

Lingua is a local application for following multilingual lectures, presentations, and discussions with live captions. It processes microphone audio locally, shows changing captions while a person speaks, and translates only stable caption segments so translation cannot delay caption updates.

Several local pretrained multilingual ASR candidates will be benchmarked before one measured winner is selected for deployment. Candidate models may expose up to 99 languages, but this is not a claim of equal support. Each language must pass user-need, legal-data, accuracy, latency, and local-runtime gates before it is marked Supported. Indonesian fine-tuning remains the core Deep Learning study after pretrained candidate selection.

## Current scaffold

```text
.
├── PRD.md
├── ARCHITECTURE.md
├── ARCHITECTURE-ESSETIALS.md
├── configs/                     # Versioned example/runtime configuration
├── data/                        # Documentation and ignored data roots
├── experiments/                 # Experiment code/provenance guidance
├── src/lingua/
│   ├── domain/                  # Framework-free shared models
│   ├── application/             # Future orchestration
│   ├── ports/                   # Future local adapter interfaces
│   ├── infrastructure/          # Future local adapters
│   └── ui/                      # Future desktop presentation
├── tests/                       # Domain behavior tests
├── models/                      # Ignored downloaded model weights
└── docs/                        # Course, workflow, and AI-use references
```

## Development status

Data models, language status vocabulary, dependency extras, configuration shape, ignore rules, and domain tests exist. Audio capture, ASR adapters, caption stabilization, translation, database repositories, and UI are intentionally not implemented yet.

## Next milestone

Build smallest executable benchmark slice: local microphone capture, three local pretrained ASR candidates, visible partial/revised captions, bounded queue behavior, and reproducible WER, latency, RTF, and peak-memory records. Select model winner before adding translation or wider language support.

## Course and evidence rules

Local ASR, real-time partial captions, reproducible evaluation, and real target-user testing are required. See `PRD.md`, `ARCHITECTURE.md`, and `docs/PROJECT_CONTEXT.md`. Report only real evidence and record material AI use in `docs/AI_USAGE_LOG_TEMPLATE.md`.
