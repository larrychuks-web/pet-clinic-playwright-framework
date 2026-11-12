import { test, expect } from './fixtures';

// spec: petclinic/specs/test-plan.md

test.describe('Owner creation and validation', () => {
  test('Reject blank owner fields and an invalid telephone', async ({ page, petClinic }) => {
    // 1. Open Add Owner and submit without entering required values.
    await petClinic.openNewOwnerForm();
    await petClinic.saveOwner();
    await expect(page.getByRole('heading', { name: 'Owner' })).toBeVisible();
    await expect(page.getByText('must not be blank').first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();

    // 2. Enter an alphabetic telephone value and submit the otherwise complete form.
    const runSuffix = Date.now().toString();
    await petClinic.fillOwnerForm({
      firstName: `QaInvalidPhone${runSuffix}`,
      lastName: 'QATest',
      address: '200 Validation Ave',
      city: 'Testville',
      telephone: 'not-a-phone',
    });
    await petClinic.saveOwner();

    await expect(page.getByText('Telephone must be a 10-digit number')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Owner' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Telephone' })).toHaveValue('not-a-phone');
  });
});