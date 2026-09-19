# Lingua

Lingua is a local real-time Indonesian-English speech recognition and translation application.

It is being developed for the Deep Learning and Speech Recognition final projects. Lingua listens to microphone audio, shows captions while speech is still happening, indicates the likely source language, and translates stable caption segments when the selected output language is different.

## Core principles

- Run speech recognition locally; do not use a hosted speech-to-text API.
- Keep captions live. A complete-recording upload followed by transcription is not the intended product.
- Focus first on Indonesian and English.
- Treat translation as a supporting feature that must not delay live captions.
- Measure real accuracy, responsiveness, and real-user feedback. Do not invent results.

Detailed product requirements, course alignment, collaboration rules, and implementation context are maintained on the `production` branch.
