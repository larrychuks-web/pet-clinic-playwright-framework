# PetClinic Requirements and Test Scenarios

## Requirement summary

Spring PetClinic is the example application under test at `http://localhost:8080/`.
The required workflows are owner search and creation, pet creation for an owner,
recording a visit for a pet, and viewing the clinic's veterinarians. Pet names
must be unique per owner; different owners may have pets with the same name.

## Application URL

`http://localhost:8080/`

## Acceptance criteria

1. A user can search for an existing owner and open the owner's details.
2. A user can create an owner with valid contact information.
3. Invalid or missing required owner data is rejected with a visible validation
   message and is not saved.
4. A user can add a pet to an owner with valid name and birth date data.
5. An owner cannot have two pets with the same name; an owner may have a pet
   whose name is already used by another owner.
6. A user can record a visit for a pet and see the visit in that pet's history.
7. The veterinarian directory is reachable and shows veterinarian information.
8. Primary navigation between Home, Find Owners, and Veterinarians works.

## Key features and scope

- Owner search, search results, details, create, and required-field validation.
- Owner-to-pet association, pet data validation, and owner-scoped name uniqueness.
- Pet visit creation and visit-history visibility.
- Veterinarian directory and primary navigation.
- Manual exploratory execution and automated browser tests against the local app.

Out of scope: backend/API testing, database inspection, authentication, load,
security, and external services. Test records should use unique names to avoid
colliding with existing demo data.

## Test scenarios and cases

### Owner search and details

- **OWN-01 — Find an existing owner:** Search by a known owner's last name,
  verify matching results, and open the owner detail page.
- **OWN-02 — Search with no matching owner:** Search using a unique nonexistent
  last name and verify an empty-result or no-owner state without an application
  error.
- **OWN-03 — Search with an empty last name:** Submit the empty search and
  record the application's validation or result behavior.

### Owner creation and validation

- **OWN-04 — Create an owner:** Create an owner with unique first/last names,
  address, city, telephone, and verify the saved details.
- **OWN-05 — Reject incomplete owner data:** Submit missing required fields and
  verify visible validation and that the incomplete owner is not saved.
- **OWN-06 — Reject invalid telephone data:** Enter a non-numeric telephone
  value and verify validation prevents saving.

### Pet creation and uniqueness

- **PET-01 — Add a pet to an owner:** Create a pet with a unique name and valid
  birth date/type, and verify it appears in the owner's details.
- **PET-02 — Prevent duplicate pet names for one owner:** Add a second pet with
  the same name to that owner and verify the duplicate is rejected or the
  uniqueness constraint is otherwise enforced.
- **PET-03 — Allow the same pet name for a different owner:** Create a pet with
  a name already used by another owner and verify it is accepted.
- **PET-04 — Reject incomplete pet data:** Submit without a pet name or valid
  birth date and record visible validation behavior.

### Visit recording

- **VIS-01 — Add a visit:** Add a dated description for a pet and verify the
  new visit appears in that pet's visit history.
- **VIS-02 — Reject an incomplete visit:** Submit a visit without a description
  and record whether the application blocks it or accepts it.

### Veterinarians and navigation

- **VET-01 — View veterinarians:** Open the veterinarian directory and verify
  the page displays the available veterinarian information.
- **NAV-01 — Navigate primary sections:** Visit Home, Find Owners, and
  Veterinarians using the primary navigation and verify each destination loads.

## Test data and execution notes

Use unique synthetic owner names and pet names for create flows. Preserve the
owner-scoped duplicate-pet case and cross-owner same-name case as separate
checks. Record actual behavior for negative cases rather than assuming a
specific validation mechanism. The running local application is the target;
execution results belong in `exploratory_test_results.md`, and the detailed
test plan belongs in `specs/test-plan.md`.