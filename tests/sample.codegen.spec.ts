import { test } from '@playwright/test';

test('test', async ({ page }) => {
  // increase test timeout to handle all the delays (5 minutes)
  test.setTimeout(100000);

  // helper function to reduce duplication
  const pause = async (ms = 1000) => await page.waitForTimeout(ms);

  await page.goto('https://testautomationpractice.blogspot.com/');
  await pause(3000); // wait to see the page load

  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('John Smith');
  await pause();

  await page.getByRole('textbox', { name: 'Enter EMail' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Enter EMail' }).fill('jsmith94@yopmail.com');
  await pause();

  await page.getByRole('textbox', { name: 'Enter Phone' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Enter Phone' }).fill('7583992345');
  await pause();

  await page.getByRole('textbox', { name: 'Address:' }).click();
  await pause();
  await page.getByRole('textbox', { name: 'Address:' }).fill('New York, USA');
  await pause();
  await page.getByText('Male', { exact: true }).click();
  await pause(3000);

  await page.getByText('Monday').click();
  await pause();
  await page.getByRole('checkbox', { name: 'Wednesday' }).check();
  await pause();
  await page.getByText('Friday').click();
  await pause();

  await page.getByLabel('Sorted List:').selectOption('cat');
  await pause(3000);

  await page.locator('#datepicker').click();
  await pause();
  await page.locator('#ui-datepicker-div').getByRole('link', { name: '2', exact: true }).click();
  await pause();

  await page.locator('#txtDate').click();
  await pause();
  await page.getByRole('link', { name: '12' }).click();
  await pause();

  await page.getByPlaceholder('Start Date').fill('2026-03-01');
  await pause();
  await page.getByPlaceholder('End Date').fill('2026-03-31');
  await pause();
  await page
    .locator('#post-body-1307673142697428135')
    .getByRole('button', { name: 'Submit' })
    .click();
  await pause(3000);

  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await pause();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('Test');
  await pause();
  await page.locator('input[type="submit"]').click();
  await pause(3000);

  page.once('dialog', async (dialog) => {
    console.error(`Dialog message: ${dialog.message()}`);
    await page.waitForTimeout(1000); // wait 1 second to see the alert
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Simple Alert' }).click();
  await pause(1500);

  page.once('dialog', async (dialog) => {
    console.error(`Dialog message: ${dialog.message()}`);
    await page.waitForTimeout(1000); // wait 1 second to see the alert
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Confirmation Alert' }).click();
  await pause(1500);

  page.once('dialog', async (dialog) => {
    console.error(`Dialog message: ${dialog.message()}`);
    await page.waitForTimeout(1000); // wait 1 second to see the alert
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Prompt Alert' }).click();
  await pause(1500);

  await page.getByRole('button', { name: 'Point Me' }).click();
  await pause();
  await page.getByRole('link', { name: 'Laptops' }).click();
  await pause();

  await page.locator('#field2').click();
  await pause();
  await page.getByRole('button', { name: 'Copy Text' }).dblclick();
  await pause();

  await page.getByRole('textbox', { name: 'Select an item' }).click();
  await pause();
  await page.getByText('Item 5', { exact: true }).click();
  await pause();
});
