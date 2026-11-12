import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Pets and owner-scoped uniqueness', () => {
  test('Allow the same pet name for a different owner', async ({ page, petClinic }) => {
    const runSuffix = Date.now().toString();
    const petName = `QaBingo${runSuffix}`;
    const ownerNames = [`QaFirstPetOwner${runSuffix}`, `QaSecondPetOwner${runSuffix}`];

    // 1. Create a second unique owner and add a pet with the same name used by a different owner, with valid birth date and type.
    for (const [index, ownerFirstName] of ownerNames.entries()) {
      await petClinic.createOwner({
        firstName: ownerFirstName,
        lastName: 'QATest',
        address: `${400 + index} Test Street`,
        city: 'Testville',
        telephone: index === 0 ? '5551234570' : '5551234571',
      });
      await expect(page.getByRole('heading', { name: 'Owner Information' })).toBeVisible();
      await expect(page.getByText(`${ownerFirstName} QATest`, { exact: true })).toBeVisible();
      await petClinic.openAddPetForm();
      await expect(page.getByRole('heading', { name: 'New Pet' })).toBeVisible();
      await petClinic.fillPetForm({
        name: petName,
        birthDate: '2021-03-04',
        type: index === 0 ? 'dog' : 'cat',
      });
      await petClinic.savePet();
      await expect(page.getByRole('heading', { name: 'Pets and Visits' })).toBeVisible();
      await expect(page.getByRole('cell', { name: new RegExp(petName) })).toBeVisible();
      if (index === 0) {
        await expect(page.getByText('is already in use')).toHaveCount(0);
      }
    }
  });
});