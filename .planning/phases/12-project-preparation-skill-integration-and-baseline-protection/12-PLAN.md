---
phase: 12-project-preparation-skill-integration-and-baseline-protection
plan: 01
subsystem: architecture/gsd/skills
tags: [gsd, skills-install, rules, project-protection, baseline, milestone-2]
provides:
  - 5 installed professional skills in .agents/skills/ (frontend-design, impeccable, taste-skill, ui-ux-pro-max, web-design-guidelines)
  - Permanent project instruction rules (GEMINI.md, AGENTS.md, .agents/rules/project-preservation-rules.md)
  - Seven-phase execution roadmap for Milestone 2
  - Verified clean baseline with working build and zero git leaks
affects: [.planning, .agents, GEMINI.md, AGENTS.md]
duration: 15min
completed: true
---

# Phase 12 Plan: Project Preparation, Skill Integration & Baseline Protection

## Objective
Prepare the Orchha Resort project for the Major Professional Design and Engineering Upgrade by installing all five required GitHub skill repositories locally into `.agents/skills/`, establishing non-negotiable preservation rules, structuring a 7-phase execution roadmap, and capturing a clean verified Git baseline.

## Tasks
1. **GSD State & Milestone Architecture**:
   - Inspect existing GSD CLI (`gsd-tools.cjs`) and preserve completed Milestone 1 progress.
   - Establish Milestone 2: Major Professional Design & Engineering Upgrade with a seven-phase roadmap.
   - Update `PROJECT.md`, `ROADMAP.md`, and `STATE.md`.

2. **Skill Downloads & Local Installation**:
   - Skill 1: Anthropic Frontend Design (`frontend-design`) from `anthropics/skills`.
   - Skill 2: Impeccable (`impeccable`) from `pbakaus/impeccable` (v4.9.1).
   - Skill 3: Taste Skill (`taste-skill` / `design-taste-frontend`) from `leonxlnx/taste-skill` (v2.5.1).
   - Skill 4: UI UX Pro Max (`ui-ux-pro-max`) from `nextlevelbuilder/ui-ux-pro-max-skill`.
   - Skill 5: Vercel Web Design Guidelines (`web-design-guidelines`) from `vercel-labs/agent-skills` with cached local guidelines reference.
   - Verify compatibility, record commit hashes, and confirm instruction readability.

3. **Project Protection & Permanent Rules**:
   - Establish `GEMINI.md`, `AGENTS.md`, and `.agents/rules/project-preservation-rules.md`.
   - Mandate preservation of animations, gallery proportions, navigation routes, booking flows, and authentic photos.
   - Mandate universal tactile 3D button hover interactions for future phases.

4. **Baseline Verification & Checkpoint**:
   - Verify type-check (`npm run type-check`) and Next.js production build (`npm run build`).
   - Create clean Git commit checkpoint.
