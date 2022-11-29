import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('localhost:3000/');
  
  await page.locator('.nav__menu-bar').click();
  await page.getByRole('link', { name: 'My Library' }).click();

  await expect(page).toHaveURL('localhost:3000/Library');
  

});