import { APIRequestContext, expect } from '@playwright/test';

export async function getUserData(request: APIRequestContext) {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);

  const body = await response.json();
  return body;
}
