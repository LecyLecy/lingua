# Data handling

This repository does not include datasets, raw audio, participant recordings, or model artefacts.

Use ignored local roots for data that cannot be committed:

- `data/raw/` for original legal source material or consented recordings.
- `data/external/` for downloaded public datasets.
- `data/processed/` for derived local training/evaluation data.

Before data is used, add a versioned data card that records source, license, consent status where applicable, language, intended use, preprocessing, known bias and limitations, and train/validation/test split. Never commit raw participant audio, contact information, or unredacted feedback.
