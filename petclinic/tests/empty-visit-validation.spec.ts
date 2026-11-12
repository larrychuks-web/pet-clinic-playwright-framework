import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Visits', () => {
  test('Reject a visit with an empty description', async ({ page, petClinic }) => {
    const runSuffix = Date.now().toString();

    await petClinic.createOwner({
      firstName: `QaEmptyVisit${runSuffix}`,
      lastName: 'QATest',
      address: '700 Visit Street',
      city: 'Testville',
      telephone: '5551234574',
    });
    await petClinic.createPet({
      name: `QaEmptyVisitPet${runSuffix}`,
      birthDate: '2021-01-02',
      type: 'dog',
    });
    await petClinic.openAddVisitForm();
    await petClinic.saveVisit();

    await expect(page.getByRole('heading', { name: 'New Visit' })).toBeVisible();
    await expect(page.getByText('must not be blank')).toBeVisible();
  });
});