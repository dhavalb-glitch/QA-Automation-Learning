import { Page } from '@playwright/test';

export async function navigateTo(page: Page, url: string) {
  await page.goto(url);
}

export async function takeScreenshot(page: Page, feature: string, name: string) {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const timestamp = `${year}-${month}-${day}_${hours}:${minutes}`;

  await page.screenshot({
    path: `screenshots/${feature}/${name}_${timestamp}.png`,
    fullPage: true,
  });
}
