import { test, expect } from '@playwright/test';

test('test_not_logged_in_navigation', async ({ page }) => {

  await page.goto('/');

  await page.getByRole('button', { name: 'Login here' }).click();
  await expect(page).toHaveURL('/Login');

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Registration' }).click();
  await expect(page).toHaveURL('/Registration');

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/');

  await page.locator('section:has-text("Make your Team Event a Jeopardy Quiz!Login hereRegister now")').getByRole('img', { name: 'logo' }).click();

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('/Login');

  await page.getByRole('heading', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Registration' }).click();
  await expect(page).toHaveURL('/Registration');

  await page.getByRole('heading', { name: 'Create a new Account' }).click();


  
});