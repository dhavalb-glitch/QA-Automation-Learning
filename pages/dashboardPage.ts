import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://example.com');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Example Domain/);
  }
}
