# Product Requirements Document — Voice-First AI Task Manager

## Source
Senpiper Engineering Assignment — Option A: Voice-First Task App
Deadline: 3 days from receipt. Submission: public GitHub repo + README.

## One-Line Summary
A MERN task manager where the primary input method is natural language voice — a user speaks a command like *"Remind me to submit the quarterly report by next Friday"* and the app extracts structured task data automatically.

## Core Requirements (from assignment)

1. **Voice input → structured task data**
   - Each task has (at minimum): `title`, `description`, `dueDate`
   - Extraction must happen automatically from natural speech, not manual form-filling

2. **Task lifecycle actions**
   - Tasks can be: **created**, **completed**, **cancelled**, **delayed**
   - ⚠️ All four states must be supported — this is explicitly graded

3. **Authentication**
   - Users must be authenticated (JWT-based, already implemented)

4. **Analytics dashboard**
   - Must show visual graphs covering:
     - Tasks completed on time
     - Tasks currently pending
     - Tasks that were delayed

## What the Assignment Explicitly Evaluates

| Criterion | What it means for us |
|---|---|
| Handling ambiguity in natural language | How well `parseVoiceCommand` infers action/date/priority from loose phrasing |
| UI/UX thinking | Dashboard clarity, voice panel feedback, empty/error states |
| Usefulness of chosen KPIs | Analytics cards must reflect real, actionable metrics — not vanity stats |
| Design decisions under ambiguous requirements | We must be able to justify any assumption we made (documented in `memory.md`) |

## Current Feature Status

| Requirement | Status |
|---|---|
| Voice → structured task (create) | ✅ Done (pre-existing) |
| Complete via voice | ✅ Done (pre-existing) |
| Delete via voice | ✅ Done (pre-existing) — *note: assignment says "cancel," we implemented as hard delete; see `rules.md` decision log* |
| Delay/Postpone via voice | ✅ Done (added this session) |
| Authentication | ✅ Done (pre-existing) |
| Analytics — Completed on time | 🔄 In progress |
| Analytics — Pending | 🔄 In progress |
| Analytics — Delayed | 🔄 In progress |
| README with setup instructions | ⬜ Not started |
| Deployment (optional) | ⬜ Not started |

## Out of Scope (per our own roadmap decision)
- Fancy animations, particle backgrounds, 3D effects — explicitly deprioritized in favor of functional completeness against the grading criteria.
