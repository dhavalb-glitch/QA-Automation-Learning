import { test, expect } from '@playwright/test';
import {
  BasePage,
  ComponentRunner,
  expectText,
  expectVisible,
  generateUserData,
  Logger,
  retry,
  waitForElement,
} from 'playwright-shared-lib';

class TestPage extends BasePage {}

test.describe('Shared Library', () => {
  test('verify shared Playwright utilities work @shared', async ({ page }) => {
    const runner = new ComponentRunner(page);

    await runner.mount(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Shared Library Test</title>
        </head>
        <body>
          <h1 id="title">Shared Library</h1>
          <p id="message">Ready</p>
        </body>
      </html>
    `);

    await expectVisible(page.locator('#title'));
    await expectText(page.locator('#title'), 'Shared Library');

    await waitForElement(page, '#message');

    const user = generateUserData();

    expect(user.email).toContain('@');
    expect(user.password.length).toBe(12);

    let attempts = 0;

    const result = await retry(
      async () => {
        attempts++;

        if (attempts < 2) {
          throw new Error('Retry required');
        }

        return 'success';
      },
      2,
      10
    );

    expect(result).toBe('success');

    const basePage = new TestPage(page);

    expect(await basePage.getTitle()).toBe('Shared Library Test');

    Logger.info('Shared library test completed');
  });
});
