# IoT Dashboard

SvelteKit PWA frontend for the Rust `iot-hub` API.

## Stack

- SvelteKit + TypeScript + Svelte 5 runes
- Tailwind CSS with forms plugin
- `axios` API client
- `sveltekit-superforms` + `zod` form schemas
- `@vite-pwa/sveltekit` for installable browser/mobile PWA

## Local Run

1. Install Bun if needed: `curl -fsSL https://bun.sh/install | bash`.
2. Run `bun install`.
3. Copy `.env.example` to `.env` and adjust `PUBLIC_IOT_API_BASE_URL` if the API does not run on `http://localhost:3000`.
4. Run `bun run dev`.

## Project Layout

- `src/routes` contains SvelteKit route entries, similar to Next.js `app` or `pages`.
- `src/lib/components` contains reusable Svelte components grouped by area.
- `src/lib/api` contains the shared axios client and typed API modules.
- `src/lib/controllers` contains stateful page controllers with handlers and API orchestration.
- `src/lib/state` contains pure UI state types such as FSM unions.
- `src/lib/i18n` and `src/lib/schemas` contain translations and validation.
- `static` contains public assets copied as-is into the build.

## Scripts

- `bun run format` formats the project with Prettier and 2-space indentation.
- `bun run lint` runs ESLint for TypeScript and Svelte.
- `bun run check` runs `svelte-check`.
- `bun run build` builds the SvelteKit PWA.

The current API contract is read from `../iot-hub/src/presentation/http/routes.rs`.

## API Routes Covered

- `GET /health`
- `GET /devices`
- `POST /devices/:id/turn-on`
- `POST /devices/:id/turn-off`
- `GET /devices/:id/events?limit=20`
- `GET /devices/:id/schedules`
- `POST /devices/:id/schedules`
- `DELETE /schedules/:id`
- `GET /devices/:id/recurring-schedules`
- `POST /devices/:id/recurring-schedules`
- `PATCH /recurring-schedules/:id`

## Roadmap

1. Foundation: keep the API client typed, add endpoint smoke checks, and decide the production adapter/hosting target.
2. Dashboard MVP: improve device cards, recurring scheduler UX, schedule status badges, and event filtering.
3. Reliability: add optimistic UI only where safe, retry/error states, and explicit offline PWA messaging.
4. Mobile app feel: add bottom navigation, larger touch targets, install prompt, and focused device detail screens.
5. Backend contract: add OpenAPI or generated TS types from Rust DTOs to avoid drift.
6. Auth and safety: add authentication, confirmation for destructive commands, and permission boundaries for shared home control.
