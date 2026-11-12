# Spring PetClinic End-to-End Test Plan

## Application Overview

Exercise the local Spring PetClinic at http://localhost:8080/ for owner search and creation, pet association and per-owner name uniqueness, visit creation, veterinarian directory, validation, and primary navigation. Use synthetic uniquely named data and preserve existing demo records.

## Test Scenarios

### 1. Owner search and profile

**Setup:** `petclinic/tests/fixtures.ts`

#### 1.1. Find an existing owner and open their details

**File:** `petclinic/tests/owner-search-profile.spec.ts`

**Steps:**
  1. Open Find Owners from the primary navigation.
    - expect: The Find Owners page is displayed with a Last Name textbox and Find Owner button.
  2. Enter Davis as the last name and submit Find Owner.
    - expect: The results list includes Betty Davis and Harold Davis.
  3. Open Betty Davis from the results.
    - expect: The owner detail page shows Betty Davis and the Pets and Visits section.

#### 1.2. Show no results for a nonexistent owner

**File:** `petclinic/tests/no-matching-owner.spec.ts`

**Steps:**
  1. Open Find Owners and search for the unique last name NoSuchOwnerQATest2026.
    - expect: The application shows no matching owner result or a clear empty state; no unrelated owner is shown and no server error appears.

#### 1.3. Submit an empty owner search

**File:** `petclinic/tests/empty-owner-search.spec.ts`

**Steps:**
  1. Open Find Owners and submit the search without entering a last name.
    - expect: Record whether the app reports a validation message or displays an unfiltered owner list; the page remains usable.
    - test data: None.

### 2. Owner creation and validation

**Setup:** `petclinic/tests/fixtures.ts`

#### 2.1. Create an owner with valid contact details

**File:** `petclinic/tests/create-owner.spec.ts`

**Steps:**
  1. Open Find Owners, choose Add Owner, and enter unique synthetic owner details. Generate a new run suffix for the first name and use a valid 10-digit telephone.
    - expect: All owner fields accept the supplied values.
  2. Submit Add Owner.
    - expect: The owner detail page displays the new owner's name and contact details.

#### 2.2. Reject an owner missing required fields

**File:** `petclinic/tests/owner-validation.spec.ts`

**Steps:**
  1. Open Add Owner and submit without entering required values.
    - expect: The form stays open and presents visible validation messages for required fields; no owner is created.
  2. Enter an alphabetic telephone value and submit the otherwise complete form.
    - expect: Telephone validation is visible and the invalid owner is not saved.

### 3. Pets and owner-scoped uniqueness

**Setup:** `petclinic/tests/fixtures.ts`

#### 3.1. Add a pet to an owner and prevent duplicate names for that owner

**File:** `petclinic/tests/add-pet-duplicate-owner.spec.ts`

**Steps:**
  1. Create a uniquely named owner, open that owner's detail page, choose Add New Pet, and enter a pet name unique to this test run with a valid birth date and type.
    - expect: The new pet is associated with the selected owner.
  2. On the same owner, attempt to add another pet with the same name.
    - expect: The application rejects the duplicate pet name with visible feedback or otherwise prevents a second same-name pet for that owner.

#### 3.2. Allow the same pet name for a different owner

**File:** `petclinic/tests/same-pet-name-different-owner.spec.ts`

**Steps:**
  1. Create a second unique owner and add a pet with the same name used by a different owner, with valid birth date and type.
    - expect: The second owner's pet is saved even though another owner has a pet with that name.

#### 3.3. Reject a pet missing required data

**File:** `petclinic/tests/pet-required-validation.spec.ts`

**Steps:**
  1. Open Add New Pet for a test owner and submit without a pet name or valid birth date.
    - expect: Required-field validation appears and no incomplete pet is saved.

#### 3.4. Probe large owner input without persisting an unbounded record

**File:** Manual-only; do not submit oversized values when no limit is enforced.

**Steps:**
  1. Enter a 256-character synthetic value in an owner name field and inspect the field's enforced length or visible validation.
    - expect: Record the observed input limit or validation. If no limit is enforced, stop without submitting so no oversized test record is created.
    - test data: 256 ASCII characters; do not submit unless the application rejects the value before persistence.

### 4. Visits

**Setup:** `petclinic/tests/fixtures.ts`

#### 4.1. Record a visit for a pet

**File:** `petclinic/tests/record-visit.spec.ts`

**Steps:**
  1. Open an owner with a test pet, choose Add Visit for that pet, and enter a visit description and date.
    - expect: The visit is saved and its date and description appear in that pet's visit history.
  2. Reload the pet owner's details.
    - expect: The saved visit remains visible after reload.

#### 4.2. Reject a visit with an empty description

**File:** `petclinic/tests/empty-visit-validation.spec.ts`

**Steps:**
  1. Open a test pet's Add Visit form and submit without entering a description.
    - expect: The form remains open with a visible required-field message, and
      no visit is added to the pet's history.
    - test data: Use a synthetic test owner/pet and the form's default date.

### 5. Veterinarians and navigation

**Setup:** `petclinic/tests/fixtures.ts`

#### 5.1. View the veterinarian directory

**File:** `petclinic/tests/veterinarian-directory.spec.ts`

**Steps:**
  1. Choose Veterinarians from the primary navigation.
    - expect: The veterinarian directory loads and displays veterinarian information.

#### 5.2. Navigate between primary sections

**File:** `petclinic/tests/primary-navigation.spec.ts`

**Steps:**
  1. Navigate in sequence to Home, Find Owners, and Veterinarians using the primary navigation.
    - expect: Each destination loads with its expected page heading and no navigation error.