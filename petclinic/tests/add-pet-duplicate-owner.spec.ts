import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Pets and owner-scoped uniqueness', () => {
  test('Add a pet and reject a duplicate name for the same owner', async ({ page, petClinic }) => {
    const runSuffix = Date.now().toString();
    const ownerFirstName = `QaPetOwner${runSuffix}`;
    const petName = `QaBingo${runSuffix}`;

    // 1. Create a uniquely named owner, open that owner's detail page, choose Add New Pet, and enter a pet name unique to this test run with a valid birth date and type.
    await petClinic.createOwner({
      firstName: ownerFirstName,
      lastName: 'QATest',
      address: '300 Pet Street',
      city: 'Testville',
      telephone: '5551234568',
    });
    await expect(page.getByRole('heading', { name: 'Owner Information' })).toBeVisible();
    await expect(page.getByText(`${ownerFirstName} QATest`, { exact: true })).toBeVisible();
    await petClinic.openAddPetForm();
    await expect(page.getByRole('heading', { name: 'New Pet' })).toBeVisible();

    await petClinic.fillPetForm({ name: petName, birthDate: '2020-01-02', type: 'dog' });
    await petClinic.savePet();
    await expect(page.getByRole('heading', { name: 'Pets and Visits' })).toBeVisible();
    await expect(page.getByRole('cell', { name: new RegExp(petName) })).toBeVisible();

    // 2. On the same owner, attempt to add another pet with the same name.
    await petClinic.openAddPetForm();
    await petClinic.fillPetForm({ name: petName, birthDate: '2021-02-03', type: 'dog' });
    await petClinic.savePet();

    await expect(page.getByRole('heading', { name: 'New Pet' })).toBeVisible();
    await expect(page.getByText('is already in use')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue(petName);
  });
});