import { test, expect } from '@playwright/test';
import { getUserData } from '../utils/apiHelper.js';
import { DashboardPage } from '../pages/dashboardPage.js';
import { takeScreenshot } from '../utils/commonActions.js';

test('Hybrid Test using POM (API + UI)', async ({ page, request }) => {
  // 🔹 Step 1: API call (stable)
  const user = await getUserData(request);

  // 🔹 Step 2: UI via POM
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.navigate();
  await dashboardPage.verifyPageLoaded();

  // 🔹 Step 3: Hybrid validation
  expect(user.name).toBe('Leanne Graham');

  // 🔹 Step 4: Take screenshot
  await takeScreenshot(page, 'hybrid', 'api-ui-test');
});
