import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { loginData } from '../test-data/loginData.js';
import { takeScreenshot } from '../utils/commonActions.js';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(); // cleaner than page.goto
  });

  test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('wrongUser', 'wrongPass');
    await loginPage.verifyLoginFailure();

    await takeScreenshot(page, 'login feature', 'invalid-login');
  });

  test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.username, loginData.password);
    await loginPage.verifyLoginSuccess();

    await takeScreenshot(page, 'login feature', 'valid-login');
  });
});

/*import {test, expect, type Locator} from '@playwright/test'

test('login test', async({page})=>{

    test.setTimeout(60000);

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {
      waitUntil: 'load', timeout: 60000});

    await page.waitForSelector('input[name="username"]');

    const userName = page.locator('input[name="username"]');
    const password = page.locator('input[name="password"]');
    const btnLogin = page.locator('button[type="submit"]');

    await userName.fill("Admin");
    await password.fill("admin123");

    await page.waitForSelector('button[type="submit"]', { state: 'visible' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      btnLogin.click(),
    ]);

    const pageTitle = await page.title();
    console.error('Home Page Title: ', pageTitle);

    await expect(pageTitle).toEqual('OrangeHRM');

    await page.waitForSelector('header h6');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'screenshots/homepage.png' });

});*/
