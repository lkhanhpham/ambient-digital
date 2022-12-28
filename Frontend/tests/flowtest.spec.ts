import { test, expect } from '@playwright/test';

test('test_not_logged_in_navigation', async ({ page }) => {

  await page.goto('/');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Registration' }).click();
  await expect(page).toHaveURL('/Registration');

  await page.locator('.nav__menu-bar').click();
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('/Login');
  
});