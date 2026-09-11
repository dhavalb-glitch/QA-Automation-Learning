import { Page } from '@playwright/test';

export async function waitForElement(page: Page, selector: string, timeout = 5000): Promise<void> {
  await page.locator(selector).waitFor({
    state: 'visible',
    timeout,
  });
}

export async function retry<T>(action: () => Promise<T>, attempts = 3, delayMs = 500): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await new Promise((resolve) => globalThis.setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}
