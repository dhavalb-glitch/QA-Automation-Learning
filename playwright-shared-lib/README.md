# Playwright Shared Library

Reusable Playwright utilities and helpers for building maintainable end-to-end test automation.

## Features

The shared library currently provides:

- `BasePage` — common page-level navigation and page-load utilities
- `generateUserData()` — realistic test user data generation using Faker
- `ApiHelper` — reusable GET, POST, PUT, and DELETE API helpers
- `ComponentRunner` — mount HTML components for isolated testing
- `expectVisible()` — reusable visibility assertion
- `expectText()` — reusable text assertion
- `waitForElement()` — wait for an element to become visible
- `retry()` — retry asynchronous operations
- `Logger` — simple INFO, WARN, and ERROR logging

## Project Structure

```text
playwright-shared-lib/
├── src/
│   ├── index.ts
│   ├── pages/
│   │   └── BasePage.ts
│   ├── data/
│   │   └── generators.ts
│   ├── api/
│   │   └── ApiHelper.ts
│   ├── components/
│   │   └── ComponentRunner.ts
│   ├── assertions/
│   │   └── custom-matchers.ts
│   └── utils/
│       ├── wait-helpers.ts
│       └── logger.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```
