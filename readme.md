# Open Shop Playwright Tests

This repository contains Playwright end-to-end tests for the public Online Shop Demo website (`https://www.onlineshopdemo.co.uk`). Tests use the Chromium browser and access the live site, so they require an internet connection and can be affected by changes or outages on that site.

## Requirements

- Node.js (an active LTS release is recommended)
- npm

## Install

From the repository root, install the project dependencies and Playwright's Chromium browser:

```powershell
npm ci
npx playwright install chromium
```

## Run tests

Run the complete test suite in headless mode:

```powershell
npm test
```

Run the suite with a visible browser:

```powershell
npm run test:headed
```

Run one test file, or filter by a test title:

```powershell
npx playwright test tests/online-shop-demo.spec.ts
npx playwright test -g "customer can add a product variant"
```

The configured project is `chromium`. The test runner prints results in the terminal.

## Debug tests

Use Playwright Inspector to step through a test, inspect locators, and pause execution:

```powershell
npx playwright test --debug
```

To debug only one test file:

```powershell
npx playwright test tests/online-shop-demo.spec.ts --debug
```

You can also run tests in headed mode without the Inspector:

```powershell
npm run test:headed
```

The configuration captures a trace on the first retry, a screenshot on failure, and retains video on failure. After a failure, inspect files under `test-results`. Open a trace with:

```powershell
npx playwright show-trace "test-results/<test-result-folder>/trace.zip"
```

Replace the example path with the trace file generated for the failed test. The trace viewer lets you inspect actions, snapshots, and network activity.

## GitHub Actions (CI/CD)

Once a workflow is configured:

1. Push a commit or open/update a pull request if the workflow is configured for those events. This starts a run automatically.
2. To start a run manually, open the repository on GitHub, select **Actions**, choose the workflow, select **Run workflow**, choose a branch if prompted, then confirm.
3. To follow progress or troubleshoot a run, select it in **Actions**, open the relevant job, and expand the steps to view their logs. Failed steps and uploaded artifacts (if configured) are available from the run page.

For CI to run these tests, the workflow needs to check out the repository, set up Node.js, run `npm ci`, install Chromium with `npx playwright install --with-deps chromium` on a Linux runner, and run `npm test`. Workflow triggers, manual runs, and test-result artifacts depend on that workflow's configuration.
