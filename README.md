# Prenota-Azione

Questo repository contiene l'architettura di un monorepo modulare per sviluppo full‑stack in TypeScript, con più applicazioni frontend e backend, gestito con Lerna e npm Workspaces.

---

## 📁 Struttura del repository

```
workspace-root/
├─ .github/                   # Workflow CI/CD (lint, build, test, deploy)
├─ config/                    # Config condivise: ESLint, Prettier, tsconfig
├─ docker/                    # Docker Compose & .env per PostgreSQL + backend
│  ├─ docker-compose.yml
│  └─ .env
├─ openapi-spec/              # Spec OpenAPI (YAML/JSON) del backend
├─ packages/
│  ├─ shared/                 # Tipi TS, helper generici, client API
│  ├─ components/             # Libreria UI React+TS riusabile
│  └─ apps/
│     ├─ main/                # Frontend gestionale (React+TS + Redux)
│     ├─ register/            # Frontend registrazione utenti
│     ├─ orders/              # Frontend gestione ordini
│     └─ backend/             # API NestJS (Prisma, JWT, Swagger)
├─ lerna.json                 # Config Lerna + useWorkspaces: true
├─ package.json               # Root: workspaces, devDependencies, script globali
└─ tsconfig.base.json         # Opzioni TS comuni (strict, target, module…)
```

---

## 🛠 Tecnologie e tool

- **Monorepo**: Lerna + npm Workspaces
- **Frontend**:
  - ReactJS + TypeScript
  - Bundler: Vite
  - State Management: Redux Toolkit
  - Lint & Format: ESLint + Prettier
  - Quality Hooks: Husky + lint‑staged + commitlint
- **Backend**:
  - NestJS + TypeScript
  - Database: PostgreSQL (Docker Compose)
  - ORM: Prisma
  - Auth: JWT
  - API Docs: @nestjs/swagger (Swagger/OpenAPI)
- **Codegen API**: openapi-typescript (genera interfacce TS dal `/api-json`)
- **Infra Locale**: Docker Compose in `docker/` per Postgres e backend
- **CI/CD**: GitHub Actions (.github/workflows)

---

## ⚙️ Setup e installazione

```bash
# Clona il repository
git clone <url> && cd workspace-root

# Installa dipendenze e collega i packages
npm install
npm run bootstrap

# (Opzionale) Genera tipi API dal backend
git checkout main
npm run gen:api
```

---

## 📦 Script principali (root `package.json`)

| Script           | Descrizione                                                  |
|------------------|--------------------------------------------------------------|
| `bootstrap`      | Installa dipendenze e link locali (lerna bootstrap)          |
| `gen:api`        | Genera tipi TS da spec OpenAPI (openapi-typescript)          |
| `start`          | Avvia in parallelo backend (NestJS) e frontend (Vite dev)    |
| `build`          | Compila shared → components → backend → tutti i frontends    |
| `clean`          | Rimuove `dist/`, `node_modules/` e artefatti in ogni package |
| `lint`           | Esegue ESLint su tutti i packages                            |
| `format`         | Esegue Prettier su tutti i packages                          |
| `test`           | Esegue suite di test (Jest, E2E) su tutti i packages         |

---

## 🐳 Docker (development)

```bash
cd docker
docker-compose up --build
```

- Avvia PostgreSQL e servizio backend in contenitori.
- Backend esposto su `http://localhost:3000`, Postgres su `localhost:5432`.

---

## 🔧 Husky + lint‑staged + commitlint

1. **Install**: `npm install --save-dev husky lint-staged @commitlint/config-conventional @commitlint/cli`
2. **Prepare**: `npm run prepare` (installa gli hook Git)
3. **Hook configurati**:
   - `pre-commit`: `npx lint-staged` (ESLint + Prettier sui file staged)
   - `pre-push`: `npm run build && npm test` (block push se fallisce)
   - `commit-msg`: `commitlint --edit "$1"` (verifica Conventional Commits)

---

## 🚀 CI/CD (GitHub Actions)

### .github/workflows/ci.yml
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run bootstrap
      - run: npm run lint
      - run: npm run format:check
      - run: npm run gen:api
      - run: npm run build
      - run: npm run test
```

### .github/workflows/cd.yml
```yaml
name: CD
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run bootstrap
      - run: npx lerna version --conventional-commits
      - run: npx lerna publish from-package --yes
      - run: docker-compose -f docker/docker-compose.yml up -d --build
```

---

## 🎯 Conclusione

Questa configurazione offre un workflow end‑to‑end per lo sviluppo, testing, build e deploy di più applicazioni frontend e backend, garantendo qualità, consistenza e facilità di estensione nel tempo.

