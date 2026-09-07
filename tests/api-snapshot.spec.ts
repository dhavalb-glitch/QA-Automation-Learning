import { test, expect } from '@playwright/test';

test('API Response Snapshot Test', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  const body = await response.json();

  expect(JSON.stringify(body, null, 2)).toMatchSnapshot('user-response.json');
});
