import { test, expect } from '@playwright/experimental-ct-react';
import ProviderForm from './ProviderForm';

test('Add Provider form renders successfully', async ({ mount }) => {
  const component = await mount(<ProviderForm />);

  await expect(component).toContainText('Add Provider');
  await expect(component.getByPlaceholder('Provider Name')).toBeVisible();
  await expect(component.getByPlaceholder('Email')).toBeVisible();
});

test('Mandatory field validation is displayed', async ({ mount }) => {
  const component = await mount(<ProviderForm />);

  await component.getByRole('button', { name: 'Add Provider' }).click();

  await expect(component).toContainText('All mandatory fields are required');
});

test('Provider type can be selected', async ({ mount }) => {
  const component = await mount(<ProviderForm />);

  await component.locator('select').selectOption('Physician');

  await expect(component.locator('select')).toHaveValue('Physician');
});

test('Provider can be added successfully', async ({ mount }) => {
  const component = await mount(<ProviderForm />);

  await component.getByPlaceholder('Provider Name').fill('Apple Therapy Services');

  await component.locator('select').selectOption('Facility');

  await component.getByPlaceholder('Email').fill('provider@test.com');

  await component.getByPlaceholder('Bank Account Number').fill('123456789');

  await component.getByPlaceholder('Routing Reference Number').fill('987654321');

  await component.getByRole('button', { name: 'Add Provider' }).click();

  await expect(component).toContainText('Provider saved successfully');
});

test('Edit Provider loads existing data', async ({ mount }) => {
  const component = await mount(
    <ProviderForm
      mode="edit"
      initialData={{
        name: 'Delphi Group LLC',
        type: 'Physician',
        email: 'delphi@test.com',
        bankAccount: '111111',
        routingReference: '222222',
      }}
    />
  );

  await expect(component).toContainText('Edit Provider');

  await expect(component.getByPlaceholder('Provider Name')).toHaveValue('Delphi Group LLC');

  await expect(component.getByPlaceholder('Email')).toHaveValue('delphi@test.com');
});
