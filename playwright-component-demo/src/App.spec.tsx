import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test('App component renders', async ({ mount }) => {
  const component = await mount(<App />);

  await expect(component).toContainText('Vite');
});
