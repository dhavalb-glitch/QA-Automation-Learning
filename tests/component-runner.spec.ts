import { test, expect } from '@playwright/test';
import { ComponentRunner } from '../components/ComponentRunner.js';

test.describe('Component Runner', () => {
  test('verify dropdown component works in isolation @component', async ({ page }) => {
    const runner = new ComponentRunner(page);

    await runner.mountFixture('dropdown.html');

    const dropdown = page.locator('#country');

    await expect(dropdown).toBeVisible();

    await dropdown.selectOption('india');

    await expect(dropdown).toHaveValue('india');
  });

  test('verify login form component handles valid credentials @component', async ({ page }) => {
    const runner = new ComponentRunner(page);

    await runner.mountFixture('login-form.html');

    await page.locator('#username').fill('student');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#message')).toHaveText('Login successful');
  });

  test('verify login form component rejects invalid credentials @component', async ({ page }) => {
    const runner = new ComponentRunner(page);

    await runner.mountFixture('login-form.html');

    await page.locator('#username').fill('wrongUser');
    await page.locator('#password').fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#message')).toHaveText('Invalid credentials');
  });
});
