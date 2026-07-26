# playwright-saucedemo-showcase

A production-grade end-to-end automation showcase demonstrating scalable, deterministic testing patterns using Playwright and JavaScript.

## 1. Core Engineering Principles

* **Centralised Configuration** – Brittle, inline environment strings are eliminated by anchoring the entire test infrastructure to a globally managed `baseURL` within `playwright.config.js`.
* **Operational Script Matrix** – Implements a structured script footprint to separate rapid, local smoke testing from comprehensive, parallelised cross-browser validation runs.
* **Cascading Pipeline Observability** – Configures a global `Smoke Setup` project dependency in `playwright.config.js` that executes base connectivity checks prior to triggering multi-browser execution, safeguarding CI resources against systemic environment outages.
* **Strict Hermetic Isolation** – Tests are designed to run completely independently, preventing shared-state leakage and ensuring reliable execution patterns across concurrent pipelines.
* **Localisation Quality Standards** – The entire codebase, including configuration definitions, assertion validation strings, and technical documentation, complies strictly with British English spelling conventions.
* **Defensive Assertion Strategies** – Final validation checkpoints transition away from brittle exact-string matching, utilising flexible regular expression (`regex`) matchers to remain resilient against minor copy or case-sensitivity updates on the target site.

## 2. Prerequisites and Quick Start

Ensure **Node.js (LTS version)** and **Git** are installed on your local machine before execution.

**Node**: <https://nodejs.org/>

**Git**: <https://git-scm.com/>

### Clone via Git (Recommended)

Create a directory for the cloned repository, and navigate to it in your terminal.
Then run the following commands:

```bash
# Clone the repository using HTTPS and navigate to the project root
git clone https://github.com/mmqcds/playwright-saucedemo-showcase.git
cd playwright-saucedemo-showcase

# Install core development framework dependencies
npm ci

# Install required Playwright browser binaries and system dependencies
npx playwright install --with-deps

# Run local development shortcut to verify configuration integrity
npm run test:chromium
```

Windows PowerShell Execution Note: If PowerShell displays a script execution policy error (PSSecurityException), append .cmd to the executable commands i.e.

```bash
npm.cmd ci
npx.cmd playwright install --with-deps
npm.cmd run test:chromium
```

## 3. Operational Script Matrix

The execution architecture separates script profiles to balance developer feedback loops with complete system
validation environments:

|**NPM Script Command**|**Functional Scope and Behavioural Profile**|**Target Environment**|
|-|-|-|
|`npm test`|Executes the default Playwright test suite using native engine configurations.|CI Baseline|
|`npm run test:chromium`|Launches the test suite exclusively on the Chromium browser engine. Optimised for fast local debugging cycles.|Local Development|
|`npm run test:matrix`|Triggers parallel execution across the full browser matrix (Chromium, Firefox, and WebKit).|Pre-Merge Gate|
|`npm run test:ui`|Launches the interactive Playwright UI Mode runner, exposing full visual time-travel debugging capabilities.|Local Debugging|
|`npm run test:report`|Serves the automatically generated static HTML test report for post-execution analytical review.|Diagnostic Analysis|

## 4. Repository Structure

```bash

playwright-saucedemo-showcase/
├── .github/
│   └── workflows
│       └── playwright.yml           # GitHub Actions CI workflow definition
├── pages/                           # Encapsulated Page Object Model (POM) classes
│   ├── CartPage.js                  # Basket inventory validation actions
│   ├── CheckoutInfoPage.js          # Customer information form interactions
│   ├── CheckoutOverviewPage.js      # Order review and finalisation actions
│   ├── LoginPage.js                 # Authentication and entry-point navigation
│   ├── ProductsPage.js              # Catalogue and inventory interaction logic
├── tests/                           # End-to-end and connectivity test suites
│   ├── purchase-journey.spec.js     # Steel-thread end-to-end checkout journey
│   └── smoke-connectivity.spec.js   # Baseline domain accessibility checks
├── utils/                           # Supporting test data and utility modules
│   └── testData.js                  # Decoupled static credentials and payloads
├── .gitignore                       # Git exclusion rules for local artefacts
├── package.json                     # Framework dependencies and npm script shortcuts
├── playwright.config.js             # Centralised Playwright runner configuration
└── README.md                        # Framework documentation and operational guide
```
