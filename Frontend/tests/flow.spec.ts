import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  
  await page.locator('.nav__menu-bar').click();
  await page.getByRole('link', { name: 'My Library' }).click();

  await expect(page).toHaveURL('/Library');
  
});