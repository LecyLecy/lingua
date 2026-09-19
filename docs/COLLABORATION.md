# Collaboration workflow

## Branch roles

| Branch | Purpose | Direct pushes |
| --- | --- | --- |
| `main` | Completed, reviewed, demonstrably working work only. | Avoid. Merge from `production` after final checks. |
| `production` | Shared integration branch and normal base for work. | Only reviewed work from a personal branch. |
| `adin` | Initial personal branch for Adin's work. | Yes, for focused work after updating from `production`. |
| `<teammate-name>` | A teammate's focused working branch, created from `production`. | Yes, by that teammate. |

## Starting work

1. Read `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, and the relevant source files in `docs/SOURCE_OF_TRUTH.md`.
2. Fetch the repository and switch to `production`.
3. Update local `production` from `origin/production`.
4. Switch to your own branch, or create it from the updated `production` branch.
5. Make a focused change with matching tests and documentation.

Example commands:

```powershell
git fetch origin
git switch production
git pull --ff-only origin production
git switch adin
git merge --ff-only production
```

For a new teammate branch:

```powershell
git switch production
git pull --ff-only origin production
git switch -c teammate-name
git push -u origin teammate-name
```

## Before a pull request or merge

- Inspect `git status` and make sure no secret, model file, dataset, raw recording, or personal feedback is staged.
- Run the relevant test, lint, or manual real-time verification.
- Update documentation if scope, configuration, model, data, or UI behavior changed.
- Record experiment provenance when a change affects a metric.
- Use a descriptive commit message.
- Request review or at least check the diff carefully before integrating into `production`.

## Moving completed work to main

Merge `production` into `main` only when the integrated work is complete for its agreed milestone, tested, documented, and has no known blocker. `main` must stay safe for a lecturer, teammate, or reviewer to clone and inspect.

## GitHub content policy

Commit source code, tests, documents, dependency manifests, configuration templates, scripts, licensed UI assets, anonymized aggregate metrics with provenance, dataset cards, and consent templates.

Never commit real participant names, contact details, raw audio, recordings, unredacted feedback, passwords, tokens, `.env` files, downloaded datasets, model weights, checkpoints, virtual environments, caches, or large build outputs. Store large reproducible artifacts in an approved external location and document how to obtain them instead.

## Handling conflicts

Do not resolve a conflict by discarding another teammate's changes. Read both sides, preserve valid work, run relevant checks, and document any deliberate resolution that changes behavior or experiment settings.
