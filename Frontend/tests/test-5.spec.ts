import { test, expect } from '@playwright/test';

test('create_categories', async ({ page }) => {
  const username = Math.random().toString(36).slice(-8);
  const email = Math.random().toString(36).slice(-8)+"@ex.com";
  const password = "Test123test123!";

  await page.goto("/");

  await page.locator('button:has-text("Register now")').click()
  await expect(page).toHaveURL("/Registration");

  await page.type('input[id="username"]', username);

  await page.type('input[id="email"]', email);

  await page.type('input[id="password"]', password);

  await page.type('input[id="confirm-password"]', password);

  await page.locator('input:text("Submit")').click();

  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder('Enter Username').click();

  await page.getByPlaceholder('Enter Username').fill(username);

  await page.getByPlaceholder('Enter Password').click();

  await page.getByPlaceholder('Enter Password').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/Library');

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Create Category' }).click();
  await expect(page).toHaveURL('/CategoryCreator');

  await page.getByPlaceholder('New Category').click();

  await page.getByPlaceholder('New Category').fill('Cat1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('New Category').click();

  await page.getByPlaceholder('New Category').fill('Cat2');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('New Category').click();

  await page.getByPlaceholder('New Category').fill('Ca3');

  await page.getByRole('button', { name: 'Create' }).click();

});