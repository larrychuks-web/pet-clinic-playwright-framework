# PetClinic Exploratory Test Results

## Execution summary

- **Target:** `http://localhost:8080/`
- **Method:** Manual browser interaction with the configured Playwright MCP
- **Result:** 14 test cases executed; all 14 met the observed expected behavior.
- **Not executed:** The large-input boundary probe was not submitted because the
  requirements define no maximum length and the app has no cleanup workflow.
- **Test data:** Two synthetic QA owners and two same-named pets were created.
  The first owner's pet has one valid visit. Invalid submissions were rejected.

## Scenario results

| ID | Scenario | Result | Actual result |
|---|---|---|---|
| OWN-01 | Find an existing owner and open details | Passed | Searching `Davis` returned Betty Davis and Harold Davis; Betty's details opened. |
| OWN-02 | Search for a nonexistent owner | Passed | The form displayed “has not been found” and remained usable. |
| OWN-03 | Submit an empty owner search | Passed with observation | The app displayed the first page of owners rather than a validation message. |
| OWN-04 | Create an owner | Passed | `QaFlow20261112 Owner` was created with the submitted contact details. |
| OWN-05 | Reject blank owner fields | Passed | The form remained open and showed required-field errors; telephone also reported the 10-digit requirement. |
| OWN-06 | Reject invalid telephone | Passed | Alphabetic telephone input was rejected with “Telephone must be a 10-digit number.” |
| PET-01 | Add a pet to an owner | Passed | `QaBingo20261112` was created as a dog and shown on the owner's details. |
| PET-02 | Reject duplicate pet name for the same owner | Passed | The second submission remained on the form and showed “is already in use.” |
| PET-03 | Allow same pet name for another owner | Passed | A second owner successfully received a cat named `QaBingo20261112`. |
| PET-04 | Reject a pet with missing required data | Passed | Blank name and birth date were rejected with visible “is required” messages. |
| VIS-01 | Add a visit | Passed | `QA wellness check` was saved with the displayed visit date and remained in visit history. |
| VIS-02 | Reject an empty visit description | Passed | The form remained open and displayed “must not be blank”; the visit was not saved. |
| VET-01 | View veterinarian directory | Passed | Veterinarian names and specialties were displayed across two pages; page 2 loaded. |
| NAV-01 | Navigate primary sections | Passed | Home, Find Owners, and Veterinarians loaded through the primary navigation. |

## Evidence

- [Owner form before submit](owner-form-before-submit.png)
- [Created owner details](owner-created.png)
- [Pet added to owner](pet-created.png)
- [Duplicate-pet validation](duplicate-pet-validation.png)
- [Same pet name on a different owner](cross-owner-same-pet-name.png)
- [Owner required-field validation](owner-required-validation.png)
- [Invalid telephone validation](invalid-phone-validation.png)
- [Pet required-field validation](pet-validation.png)
- [Visit recorded](visit-recorded.png)
- [Empty visit description validation](visit-validation.png)
- [Veterinarian directory](veterinarians.png)
- [Empty owner search results](empty-owner-search-results.png)
- [No matching owner message](no-owner-match.png)

## Findings and risks

1. **Client-side console errors on owner details (PCL-001):** Seven
   `TypeError: Cannot read properties of null (reading 'style')` exceptions
   were recorded while owner detail pages rendered. The tested forms and
   workflows still completed, but these uncaught exceptions should be
   investigated. See [defect PCL-001](test-results/defect/PCL-001.md).
2. **Empty owner search behavior:** Submitting an empty last name returns the
   first page of owners instead of prompting for a search term. This is usable
   and is not specified as a failure by the supplied requirements; consider
   adding explicit product guidance if that behavior is undesirable.
3. **Large-input boundary:** No maximum field length is specified. The
   exploratory test was not submitted to avoid leaving potentially oversized
   persistent data in the demo database.

## Limitations

This was a UI-only exploratory run against the local demo. Database state was
not inspected, broad boundary values were not persisted, and no backend,
performance, or security checks were performed. Automated test execution is
reported separately in `test-executions/document.md`.