import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Veterinarians and navigation', () => {
  test('Navigate between Home, Find Owners, and Veterinarians', async ({ page, petClinic }) => {
    // 1. Navigate in sequence to Home, Find Owners, and Veterinarians using the primary navigation.
    const navigation = page.getByRole('navigation');

    await navigation.getByRole('link', { name: /Home/ }).click();
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();

    await petClinic.openFindOwners();
    await expect(page.getByRole('heading', { name: 'Find Owners' })).toBeVisible();

    await petClinic.openVeterinarianDirectory();
    await expect(page.getByRole('heading', { name: 'Veterinarians' })).toBeVisible();
  });
});