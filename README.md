[![Build Status](https://github.com/solectrus/configurator/actions/workflows/ci.yml/badge.svg)](https://github.com/solectrus/configurator/actions)

[![wakatime](https://wakatime.com/badge/user/697af4f5-617a-446d-ba58-407e7f3e0243/project/018dfe36-fa78-478c-a3ab-be3099f978c6.svg)](https://wakatime.com/badge/user/697af4f5-617a-446d-ba58-407e7f3e0243/project/018dfe36-fa78-478c-a3ab-be3099f978c6)

# SOLECTRUS Configurator

One-pager for [configurator.solectrus.de](https://configurator.solectrus.de).

The interactive configurator (which generated `compose.yaml` / `.env`) has been retired and replaced by [**HELIOS**](https://github.com/solectrus/helios), a locally installed, browser-based control panel for SOLECTRUS. This site is a small bilingual (DE/EN) landing page that introduces HELIOS and shows how to install it.

Built with [Astro](https://astro.build/) and styled to match the SOLECTRUS marketing website ([solectrus.de](https://solectrus.de)). The static output is served via Nginx (see `Dockerfile` and `_nginx/`).

The retired interactive Vue/SurveyJS configurator is kept available at [configurator.solectrus.de/legacy](https://configurator.solectrus.de/legacy) as a frozen, pre-built snapshot in `public/legacy/` (see below).

## Project Setup

```sh
bun install
```

### Start a development server

```sh
bun dev
```

### Type-check and build for production

```sh
bun run build
```

The static site is generated into `dist/`. Astro copies `public/` verbatim, so the frozen legacy snapshot in `public/legacy/` ends up at `dist/legacy/` and is served at `/legacy` from the same Nginx image.

### Preview the production build

```sh
bun preview
```

### Format the code

```sh
bun format
```

## Structure

- `src/i18n/content.ts` – all page texts for German and English (single source of truth); shell commands are language-neutral
- `src/components/HeliosPage.astro` – the page, assembled from the locale's texts
- `src/pages/index.astro` (DE, `/`) and `src/pages/en/index.astro` (EN, `/en/`)
- `public/legacy/` – frozen, pre-built snapshot of the retired Vue/SurveyJS configurator (served at `/legacy`; source preserved in git history at commit `b43b31f`)

Copyright (c) 2024-2026 by Georg Ledermann (georg@ledermann.dev)
