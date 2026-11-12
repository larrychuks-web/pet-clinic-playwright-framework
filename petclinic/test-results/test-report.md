# PetClinic End-to-End Test Report

## 1. Executive summary

- **Target:** `http://localhost:8080/`
- **Scenario IDs identified:** 14 across owner search, owner creation,
  pet workflows, visits, veterinarian directory, and navigation.
- **Manual execution:** 14 cases; 14 passed, 0 failed.
- **Final automation:** 12 Playwright cases run in Chromium, Firefox, and
  WebKit; 36 browser executions passed, 0 failed.
- **Blocked/deferred:** One large-input boundary probe was not submitted
  because the requirements define no maximum length and persistent test data
  cannot be cleaned up through the UI.
- **Overall:** Core workflows and validations passed. One low-severity browser
  console defect was observed on owner details pages.

## 2. Manual test results

Manual exploratory testing used Playwright MCP browser interaction. All
14 scenario executions passed. Notable observed behavior:

- Searching `Davis` returned Betty Davis and Harold Davis; Betty's details
  opened successfully.
- A nonexistent owner showed “has not been found.”
- An empty owner search displayed the first page of owners without a
  validation prompt.
- Owner creation succeeded. Blank required fields and a non-10-digit phone
  were rejected with visible validation.
- A pet was added successfully; a duplicate name for the same owner was
  rejected with “is already in use.” The same pet name was accepted for a
  different owner.
- Blank pet name/birth date and blank visit description were rejected.
- A visit was saved and remained in the pet's visit history.
- Veterinarian directory pagination and Home / Find Owners / Veterinarians
  navigation worked.

Evidence:

- [Owner form before submit](../owner-form-before-submit.png)
- [Created owner](../owner-created.png)
- [Owner required-field validation](../owner-required-validation.png)
- [Invalid telephone validation](../invalid-phone-validation.png)
- [Pet created](../pet-created.png)
- [Duplicate-pet validation](../duplicate-pet-validation.png)
- [Same pet name on another owner](../cross-owner-same-pet-name.png)
- [Pet required-field validation](../pet-validation.png)
- [Visit recorded](../visit-recorded.png)
- [Empty visit description validation](../visit-validation.png)
- [Veterinarian directory](../veterinarians.png)
- [Empty owner search](../empty-owner-search-results.png)
- [No matching owner](../no-owner-match.png)

Detailed case outcomes are in [exploratory test results](../exploratory_test_results.md).

## 3. Automated test results

The suite contains 12 Playwright tests, organized as follows:

| Test suite | Chromium | Firefox | WebKit | Total |
|---|---:|---:|---:|---:|
| Owner search and profile | 3/3 | 3/3 | 3/3 | 9/9 |
| Owner creation and validation | 2/2 | 2/2 | 2/2 | 6/6 |
| Pets and owner-scoped uniqueness | 3/3 | 3/3 | 3/3 | 9/9 |
| Visits | 2/2 | 2/2 | 2/2 | 6/6 |
| Veterinarians and navigation | 2/2 | 2/2 | 2/2 | 6/6 |
| **Total** | **12/12** | **12/12** | **12/12** | **36/36** |

The initial Chromium run passed 8/11. Two search tests used an inaccessible
textbox name; the page object now uses the observed `#lastName` selector. The
visit test initially supplied a client-local date that differed from the
application's prefilled date. After retaining the application's date, the
Chromium suite passed 11/11. The empty-visit-description test was then added,
and the final three-browser run passed 36/36.

Execution details and healing history are in
[test execution document](../test-executions/document.md). The tests use a
shared [PetClinicPage object](../tests/pages/petclinic-page.ts) and fixture
setup.

## 4. Defect log

- [PCL-001 — Owner details emit uncaught JavaScript errors](defect/PCL-001.md)
  - Severity: Low
  - Seven `TypeError: Cannot read properties of null (reading 'style')`
    console exceptions were recorded on owner detail pages. Tested workflows
    still completed.

The initial automated visit-date failure was caused by test data differing
from the app's prefilled date; the final test uses the prefilled date and
passes. No additional application defect was confirmed from that test-data
adjustment.

## 5. Test coverage analysis

| Acceptance area | Manual coverage | Automated coverage | Gap |
|---|---|---|---|
| Owner search, details, and empty/no-match search | Passed | Passed | Empty search returns the first owner page; product behavior is unspecified. |
| Owner creation and required/contact validation | Passed | Passed | No explicit field-length limits are specified. |
| Pet creation and owner-scoped uniqueness | Passed | Passed | Large-input boundary probe deferred. |
| Visit creation and description validation | Passed | Passed | Historical-date/time-zone boundary not tested. |
| Veterinarian directory and pagination | Passed | Directory tested in all browsers | Pagination was manually explored. |
| Primary navigation | Passed | Passed | None identified. |

The owner/pet relationship is illustrated in
[owner_pet_relationship_diagrram.png](../owner_pet_relationship_diagrram.png).

## 6. Summary and recommendations

The required workflows are functional across the three configured browser
engines. Before release, investigate the owner-detail console exception and
confirm expected behavior for empty owner searches. Document maximum
input-length requirements and the intended visit-date/time-zone behavior so
boundary tests can be run without leaving uncontrolled data in the demo
database.