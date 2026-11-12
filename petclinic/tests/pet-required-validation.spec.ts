import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Pets and owner-scoped uniqueness', () => {
  test('Reject a pet missing required name and birth date', async ({ page, petClinic }) => {
    const runSuffix = Date.now().toString();

    // 1. Open Add New Pet for a test owner and submit without a pet name or valid birth date.
    await petClinic.createOwner({
      firstName: `QaPetValidation${runSuffix}`,
      lastName: 'QATest',
      address: '500 Validation Road',
      city: 'Testville',
      telephone: '5551234572',
    });
    await expect(page.getByRole('heading', { name: 'Owner Information' })).toBeVisible();
    await petClinic.openAddPetForm();
    await expect(page.getByRole('heading', { name: 'New Pet' })).toBeVisible();
    await petClinic.savePet();

    await expect(page.getByRole('heading', { name: 'New Pet' })).toBeVisible();
    await expect(page.getByText('is required')).toHaveCount(2);
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Birth Date' })).toHaveValue('');
  });
});