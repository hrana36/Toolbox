# Design Document: Dynamic Project Lab Pages

## Goal
Implement a dynamic system that allows users to click on any of the 10 security-focused projects on Habibur's portfolio site and open a detailed, premium dynamic lab walkthrough page. We will start by building the Network Tab projects.

## Architecture
- **Data File:** `src/data/labs.ts` - Defines detailed steps, commands, network topologies, and verification criteria for each security lab.
- **Dynamic Route:** `src/app/portfolio/projects/[slug]/page.tsx` - Loads the lab data according to the URL `[slug]` and renders a rich visual interface.
- **Home Card Links:** Home page project links will navigate to `/portfolio/projects/[slug]`.

## UI/UX Specifications
- **Theme:** Cyber deck aesthetic (slate-950, slate-900, border-slate-800, text-slate-100, emerald/cyan accents).
- **Topology Panel:** ASCII diagrams inside terminal blocks.
- **Timeline/Steps:** Linear vertical roadmap with copyable commands and configuration boxes.
- **Verification Panel:** A sidebar checklist showing verification instructions.
