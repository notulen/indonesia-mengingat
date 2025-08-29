# Indonesia Mengingat — Product Brief

## Project overview / description

Indonesia Mengingat is a static website that tracks notable events in Indonesia and highlights the key figures involved. Users can browse figures, view their associated events, and see recent updates related to those figures. The site prioritizes clarity, speed, and durability with a static-first approach and simple, transparent data structures.

## Target audience

- Concerned citizens and researchers seeking a neutral index of events and figures
- Journalists and civil society organizations monitoring developments
- Educators and students needing concise references

## Primary benefits / features

- Figures directory: list of key people with quick profile access
- Event timelines: chronological updates per figure with sources
- Latest updates: recent event summaries on the home page
- Clean URLs and simple navigation
- Static data files to enable easy audit and contribution

## High-level tech/architecture used

- Frontend: React + TypeScript, Vite build, Tailwind for utility-first styling
- Routing: React Router for client-side navigation
- Hosting: Static hosting (e.g., GitHub Pages, Netlify, Vercel) serving prebuilt assets in `dist/`
- Data: Versioned static YAML files committed to the repo (no server). Optional future integration with headless CMS or Git-based contributions via PRs.
- DX: ESLint, TypeScript strictness, schema validation with Zod, minimal dependencies
