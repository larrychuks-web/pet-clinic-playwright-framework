import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Owner search and profile', () => {
  test('Submit an empty owner search and show the owner list', async ({ page, petClinic }) => {
    // 1. Open Find Owners and submit the search without entering a last name.
    await petClinic.openFindOwners();
    await expect(page.getByRole('heading', { name: 'Find Owners' })).toBeVisible();
    await expect(petClinic.lastNameInput).toHaveValue('');
    await petClinic.searchOwners();

    // Observed behavior: an empty search returns the first page of owners.
    await expect(page.getByRole('heading', { name: 'Owners' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'George Franklin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Betty Davis' })).toBeVisible();
    await expect(page.getByRole('link', { name: '2', exact: true })).toBeVisible();
  });
});