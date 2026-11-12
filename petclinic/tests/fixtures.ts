import { test as base, expect } from '@playwright/test';
import { PetClinicPage } from './pages/petclinic-page';

export const test = base.extend<{ petClinic: PetClinicPage }>({
  petClinic: async ({ page }, use) => {
    const petClinic = new PetClinicPage(page);
    await petClinic.goHome();
    await use(petClinic);
  },
});

export { expect };