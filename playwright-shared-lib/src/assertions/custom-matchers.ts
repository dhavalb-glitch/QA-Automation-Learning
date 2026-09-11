import { expect, Locator } from '@playwright/test';

export async function expectVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

export async function expectText(locator: Locator, text: string): Promise<void> {
  await expect(locator).toHaveText(text);
}
