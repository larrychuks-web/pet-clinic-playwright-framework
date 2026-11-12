import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Owner creation and validation', () => {
  test('Create an owner with valid contact details', async ({ page, petClinic }) => {
    const runSuffix = Date.now().toString();
    const firstName = `QaOwner${runSuffix}`;
    const lastName = 'QATest';
    const address = '100 Test Street';
    const city = 'Testville';
    const telephone = '5551234567';

    // 1. Enter and submit unique synthetic owner details.
    await petClinic.createOwner({ firstName, lastName, address, city, telephone });

    // 2. Verify the saved owner details.
    await expect(page.getByRole('heading', { name: 'Owner Information' })).toBeVisible();
    await expect(page.getByText(`${firstName} ${lastName}`, { exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: address, exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: city, exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: telephone, exact: true })).toBeVisible();
  });
});