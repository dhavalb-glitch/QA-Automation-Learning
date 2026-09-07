import { test } from '@playwright/test';
import { takeScreenshot } from '../utils/commonActions.js';

test('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.getByRole('textbox', { name: 'Enter Name' }).fill('John Smith');
  await page.getByRole('textbox', { name: 'Enter EMail' }).fill('jsmith94@yopmail.com');
  await page.getByRole('textbox', { name: 'Enter Phone' }).fill('7583992345');
  await page.getByRole('textbox', { name: 'Address:' }).fill('New York, USA');

  await page.getByText('Male', { exact: true }).click();

  await page.getByText('Monday').click();
  await page.getByRole('checkbox', { name: 'Wednesday' }).check();
  await page.getByText('Friday').click();

  await page.getByLabel('Sorted List:').selectOption('cat');

  //auto-wait is applied here, no need for explicit wait
  await page.locator('#datepicker').click();
  await page.locator('#ui-datepicker-div').getByRole('link', { name: '2', exact: true }).click();

  await page.locator('#txtDate').click(); //auto-wait is applied here, no need for explicit wait
  await page.getByRole('link', { name: '12' }).click();

  await page.getByPlaceholder('Start Date').fill('2026-03-01');
  await page.getByPlaceholder('End Date').fill('2026-03-31');

  //auto-wait is applied here, no need for explicit wait
  await page
    .locator('#post-body-1307673142697428135')
    .getByRole('button', { name: 'Submit' })
    .click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('Test');
  await page.locator('input[type="submit"]').click();

  page.once('dialog', async (dialog) => {
    console.error(`Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Simple Alert' }).click();

  page.once('dialog', async (dialog) => {
    console.error(`Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Confirmation Alert' }).click();

  page.once('dialog', async (dialog) => {
    console.error(`Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Prompt Alert' }).click();

  await page.getByRole('button', { name: 'Point Me' }).click();
  await page.getByRole('link', { name: 'Laptops' }).click();

  await page.getByRole('button', { name: 'Copy Text' }).dblclick();

  await page.getByRole('textbox', { name: 'Select an item' }).click();
  await page.getByText('Item 5', { exact: true }).click();

  await takeScreenshot(page, 'auto waits', 'test-completion');
});
