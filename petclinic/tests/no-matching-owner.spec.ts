import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Owner search and profile', () => {
  test('Show no results for a nonexistent owner', async ({ page, petClinic }) => {
    // 1. Open Find Owners and search for the unique last name NoSuchOwnerQATest2026.
    await petClinic.openFindOwners();
    await expect(page.getByRole('heading', { name: 'Find Owners' })).toBeVisible();
    await petClinic.searchOwners('NoSuchOwnerQATest2026');

    await expect(page.getByText('has not been found')).toBeVisible();
    await expect(page.getByRole('table')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Find Owners' })).toBeVisible();
  });
});