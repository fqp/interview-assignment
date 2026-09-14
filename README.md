# Interview assignment — Timesheet manager

A small Angular application for listing, searching and editing timesheets. It is
used as the shared codebase for Shiftbase live coding and code review interviews.

The app talks to a fake backend (`angular-in-memory-web-api`), so there is nothing
to install or configure beyond npm — the data is regenerated on every page load
and changes are not persisted.

## Running it

```bash
npm install
npm start          # http://localhost:4200
```

Other scripts:

```bash
npm run build      # production build into dist/
npm run watch      # development build in watch mode
npm test           # vitest via the Angular unit-test builder
npm run format     # prettier
```

## What's in here

| Path                                | What it does                                                              |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `src/app/app.ts`                    | Shell: title, router outlet, message-log toggle                           |
| `src/app/app.config.ts`             | Application providers — router, `HttpClient`, fake backend                |
| `src/app/app.routes.ts`             | Routes, with both pages lazily loaded                                     |
| `src/app/timesheet.ts`              | The `Timesheet` model                                                     |
| `src/app/timesheet.service.ts`      | Reads (as resources) and writes (as observables) against `api/timesheets` |
| `src/app/timesheet-list/`           | The list page: add, delete, navigate to detail                            |
| `src/app/timesheet-detail/`         | The detail page: rename and save one timesheet                            |
| `src/app/timesheet-search/`         | Debounced search box                                                      |
| `src/app/messages/`                 | In-app log of what the service has been doing                             |
| `src/app/in-memory-data.service.ts` | Seeds the fake backend with ten random timesheets                         |

## Stack

Angular 22, standalone components, zoneless change detection, signals
(`httpResource`, `rxResource`, `linkedSignal`, signal inputs) and the built-in
control flow (`@if` / `@for`). TypeScript 6, Vitest, Prettier.

## For candidates

Have a look at the open [issues](https://github.com/fqp/interview-assignment/issues)
and [pull requests](https://github.com/fqp/interview-assignment/pulls) — your
interviewer will point you at the ones we want to work through together. You are
expected and encouraged to use an AI coding agent; we are far more interested in
how you direct and check it than in how fast you can type.
