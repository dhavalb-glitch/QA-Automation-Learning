import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialized AFTER page is assigned
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#submit');
    this.errorMessage = page.locator('#error'); // for invalid login
  }

  async navigate() {
    await this.page.goto('/practice-test-login/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  // Negative validation
  async verifyLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }

  //Assertion method to verify successful login
  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
  }
}
