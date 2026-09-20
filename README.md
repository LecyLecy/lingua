<div align="center">

<img src="./assets/lingua-icon.svg" alt="Lingua icon" width="112" />

# Lingua

### Local real-time multilingual captions and stable-segment translation

[Product requirements](./PRD.md) · [Architecture](./ARCHITECTURE.md) · [Architecture essentials](./ARCHITECTURE-ESSETIALS.md) · [Collaboration](./docs/COLLABORATION.md)

</div>

> **Project status: scaffolded, not feature-complete.** No model runtime, microphone UI, measured result, user study, dataset, model weight, or benchmark is included yet.

## What Lingua is building

Lingua is a local application for following multilingual lectures, presentations, and discussions with live captions. It processes microphone audio locally, shows changing captions while a person speaks, and translates only stable caption segments so translation cannot delay caption updates.

The selected multilingual ASR model may expose up to 99 candidate languages. This is not a claim of equal support. Each language must pass user-need, legal-data, accuracy, latency, and local-runtime gates before it is marked Supported. Indonesian fine-tuning remains the core Deep Learning study.

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

Build smallest executable vertical slice: local microphone capture, one local ASR runtime, visible partial/revised captions, bounded queue behavior, and reproducible timing record. Do not add translation or extra language support before that slice works and is measured.

## Course and evidence rules

Local ASR, real-time partial captions, reproducible evaluation, and real target-user testing are required. See `PRD.md`, `ARCHITECTURE.md`, and `docs/PROJECT_CONTEXT.md`. Report only real evidence and record material AI use in `docs/AI_USAGE_LOG_TEMPLATE.md`.
