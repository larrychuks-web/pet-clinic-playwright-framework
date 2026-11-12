import type { Locator, Page } from '@playwright/test';

export interface OwnerDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
}

export interface PetDetails {
  name: string;
  birthDate: string;
  type: string;
}

export class PetClinicPage {
  constructor(readonly page: Page) {}

  get lastNameInput(): Locator {
    return this.page.locator('#lastName');
  }

  async goHome(): Promise<void> {
    await this.page.goto('/');
  }

  async openFindOwners(): Promise<void> {
    await this.page.getByRole('link', { name: /Find Owners/ }).click();
  }

  async searchOwners(lastName?: string): Promise<void> {
    if (lastName !== undefined) {
      await this.lastNameInput.fill(lastName);
    }
    await this.page.getByRole('button', { name: 'Find Owner' }).click();
  }

  async openNewOwnerForm(): Promise<void> {
    await this.page.goto('/owners/new');
  }

  async fillOwnerForm(owner: OwnerDetails): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(owner.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(owner.lastName);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(owner.address);
    await this.page.getByRole('textbox', { name: 'City' }).fill(owner.city);
    await this.page.getByRole('textbox', { name: 'Telephone' }).fill(owner.telephone);
  }

  async saveOwner(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add Owner' }).click();
  }

  async createOwner(owner: OwnerDetails): Promise<void> {
    await this.openNewOwnerForm();
    await this.fillOwnerForm(owner);
    await this.saveOwner();
  }

  async openAddPetForm(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add New Pet' }).click();
  }

  async fillPetForm(pet: PetDetails): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Name' }).fill(pet.name);
    await this.page.getByRole('textbox', { name: 'Birth Date' }).fill(pet.birthDate);
    await this.page.getByRole('combobox', { name: 'Type' }).selectOption(pet.type);
  }

  async savePet(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add Pet' }).click();
  }

  async createPet(pet: PetDetails): Promise<void> {
    await this.openAddPetForm();
    await this.fillPetForm(pet);
    await this.savePet();
  }

  async openAddVisitForm(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add Visit' }).click();
  }

  async addVisit(description: string): Promise<string> {
    await this.openAddVisitForm();
    const dateInput = this.page.getByRole('textbox', { name: 'Date' });
    const visitDate = await dateInput.inputValue();
    await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
    await this.saveVisit();
    return visitDate;
  }

  async saveVisit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add Visit' }).click();
  }

  async openVeterinarianDirectory(): Promise<void> {
    await this.page.getByRole('link', { name: /Veterinarians/ }).click();
  }
}