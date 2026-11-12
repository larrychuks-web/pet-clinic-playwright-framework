# Automated Test Execution

## Environment

- Application: `http://localhost:8080/`
- Runner: Playwright Test
- Projects: Chromium, Firefox, WebKit
- Command: `npx playwright test petclinic/tests --reporter=line`

The Playwright Test MCP listing did not discover the newly added `petclinic/tests`
files, so the installed Playwright CLI was used for the authoritative execution.

## Initial run

- Tests: 11
- Passed: 8
- Failed: 3

Failures:

1. Owner search and empty-search tests could not find the Last Name textbox by
   accessible name. The live form exposes it by the stable `#lastName` ID but
   does not provide an accessible name.
2. The visit test supplied a client-local date that differed from the date
   prefilled by the application; the visit stayed on the form and was not
   saved.

## Healing activities

- Updated both owner-search specs to use the verified `#lastName` locator.
- Compared the failed visit form with exploratory evidence: the application
  prefilled `2026-11-13`, while the test supplied `2026-11-12`. The visit test
  now retains and asserts the app-provided date instead of submitting a
  potentially invalid client-local date.
- After the first locator/date-format adjustment, an intermediate Chromium run
  passed 10/11; the remaining visit failure was corrected by using the
  application-provided date.
- Refactored the specs to use a shared `PetClinicPage` object and fixture
  setup.

## Final results

| Browser project | Passed | Failed |
|---|---:|---:|
| Chromium | 12 | 0 |
| Firefox | 12 | 0 |
| WebKit | 12 | 0 |
| **Total** | **36** | **0** |

The empty-visit-description validation case was added after the initial
generation and passed in all three browser projects. No automation failures
remained after healing. The large-input boundary probe was intentionally not
submitted or automated because no maximum length is specified and the demo has
no cleanup flow for potentially oversized records.