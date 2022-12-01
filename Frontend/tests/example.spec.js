// @ts-check
const { test, expect } = require('@playwright/test');
//dummy test
test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
});
