import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Allure Reporting Demo', () => {
  test('verify Playwright homepage @smoke', async ({ page }) => {
    allure.severity('critical');
    allure.feature('Playwright Website');
    allure.story('Homepage');
    allure.description('Verifies that the Playwright homepage loads with the expected title.');

    await allure.step('Navigate to Playwright homepage', async () => {
      await page.goto('https://playwright.dev/');
    });

    await allure.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    await allure.step('Attach homepage screenshot', async () => {
      const screenshot = await page.screenshot();
      allure.attachment('Homepage Screenshot', screenshot, 'image/png');
    });
  });

  test('verify Get Started navigation @regression', async ({ page }) => {
    allure.severity('normal');
    allure.feature('Playwright Website');
    allure.story('Navigation');
    allure.description('Verifies that the Get Started link navigates to the Installation page.');

    await allure.step('Navigate to Playwright homepage', async () => {
      await page.goto('https://playwright.dev/');
    });

    await allure.step('Click Get Started link', async () => {
      await page.getByRole('link', { name: 'Get started' }).click();
    });

    await allure.step('Verify Installation heading', async () => {
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
  });
});
