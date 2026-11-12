import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Visits', () => {
  test('Record a visit for a pet and retain it after reload', async ({ page, petClinic }) => {
    const runSuffix = Date.now().toString();
    const ownerFirstName = `QaVisitOwner${runSuffix}`;
    const petName = `QaVisitPet${runSuffix}`;
    const visitDescription = `QA wellness check ${runSuffix}`;

    // 1. Open an owner with a test pet, choose Add Visit for that pet, and enter a visit description and date.
    await petClinic.createOwner({
      firstName: ownerFirstName,
      lastName: 'QATest',
      address: '600 Visit Street',
      city: 'Testville',
      telephone: '5551234573',
    });
    await expect(page.getByRole('heading', { name: 'Owner Information' })).toBeVisible();
    await petClinic.createPet({ name: petName, birthDate: '2020-01-02', type: 'dog' });
    await expect(page.getByRole('heading', { name: 'Pets and Visits' })).toBeVisible();
    const visitDate = await petClinic.addVisit(visitDescription);

    await expect(page.getByText(visitDescription, { exact: true })).toBeVisible();
    await expect(page.getByText(visitDate, { exact: true })).toBeVisible();

    // 2. Reload the pet owner's details.
    await page.reload();
    await expect(page.getByText(visitDescription, { exact: true })).toBeVisible();
    await expect(page.getByText(visitDate, { exact: true })).toBeVisible();
  });
});