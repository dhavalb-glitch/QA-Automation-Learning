import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
