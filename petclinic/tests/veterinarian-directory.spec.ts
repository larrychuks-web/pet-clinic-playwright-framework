import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Veterinarians and navigation', () => {
  test('View the veterinarian directory', async ({ page, petClinic }) => {
    // 1. Choose Veterinarians from the primary navigation.
    await petClinic.openVeterinarianDirectory();

    await expect(page.getByRole('heading', { name: 'Veterinarians' })).toBeVisible();
    const directory = page.getByRole('table');
    await expect(directory).toBeVisible();
    await expect(directory.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(directory.getByRole('columnheader', { name: 'Specialties' })).toBeVisible();
    await expect(directory.getByRole('row').nth(1)).toBeVisible();
  });
});