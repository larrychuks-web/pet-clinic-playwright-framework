import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Owner search and profile', () => {
  test('Find an existing owner and open their details', async ({ page, petClinic }) => {
    // 1. Open Find Owners from the primary navigation.
    await petClinic.openFindOwners();
    await expect(page.getByRole('heading', { name: 'Find Owners' })).toBeVisible();
    await expect(petClinic.lastNameInput).toBeVisible();
    await expect(page.getByRole('button', { name: 'Find Owner' })).toBeVisible();

    // 2. Enter Davis as the last name and submit Find Owner.
    await petClinic.searchOwners('Davis');
    await expect(page.getByRole('link', { name: 'Betty Davis' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Harold Davis' })).toBeVisible();

    // 3. Open Betty Davis from the results.
    await page.getByRole('link', { name: 'Betty Davis' }).click();
    await expect(page.getByRole('heading', { name: 'Owner Information' })).toBeVisible();
    await expect(page.getByText('Betty Davis', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pets and Visits' })).toBeVisible();
  });
});