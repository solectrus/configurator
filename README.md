[![Build Status](https://github.com/solectrus/configurator/actions/workflows/ci.yml/badge.svg)](https://github.com/solectrus/configurator/actions)
[![Maintainability](https://qlty.sh/gh/solectrus/projects/configurator/maintainability.svg)](https://qlty.sh/gh/solectrus/projects/configurator)
[![Code Coverage](https://qlty.sh/gh/solectrus/projects/configurator/coverage.svg)](https://qlty.sh/gh/solectrus/projects/configurator)
[![wakatime](https://wakatime.com/badge/user/697af4f5-617a-446d-ba58-407e7f3e0243/project/018dfe36-fa78-478c-a3ab-be3099f978c6.svg)](https://wakatime.com/badge/user/697af4f5-617a-446d-ba58-407e7f3e0243/project/018dfe36-fa78-478c-a3ab-be3099f978c6)

# SOLECTRUS Configurator

> [!WARNING]
> **This project is discontinued and no longer maintained.**
>
> It has been superseded by **HELIOS**, a helper app that installs, configures, and manages SOLECTRUS directly on your device — permanently, not just as a one-time setup. HELIOS provides a browser-based interface, manages Docker automatically, and supports sensor setup, service control, backups, updates, and log viewing.
>
> 👉 Please use HELIOS instead: **https://solectrus.de/install/en/**

This is a web application to interactively configure Docker for SOLECTRUS. It generates a `compose.yaml` and `.env` file based on the answers to some questions. A `readme.md` file is also generated to guide the user through the installation process.

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

Copyright (c) 2024-2026 by Georg Ledermann (georg@ledermann.dev)
