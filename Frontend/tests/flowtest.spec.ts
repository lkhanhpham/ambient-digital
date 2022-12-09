import { test, expect } from '@playwright/test';

test('test_registration_login_questioncreation_questiondeletion', async ({ page }) => {

  await page.goto('/');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Registration' }).click();
  await expect(page).toHaveURL('/Registration');

  await page.getByPlaceholder('Username').click();

  await page.getByPlaceholder('Username').fill('test1234');

  await page.getByPlaceholder('Username').press('Tab');

  await page.getByPlaceholder('E-Mail').fill('test1234@exm.pl');

  await page.getByPlaceholder('E-Mail').press('Tab');

  await page.locator('#password').fill('test1234test1234');

  await page.locator('#password').press('Tab');

  await page.getByPlaceholder('Confirm Password').fill('test1234test1234');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL('/login');

  await page.getByPlaceholder('Enter Username').click();

  await page.getByPlaceholder('Enter Username').fill('test1234');

  await page.getByPlaceholder('Enter Username').press('Tab');

  await page.getByPlaceholder('Enter Password').fill('test1234test1234');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/Library');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('button', { name: 'Create question' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('TestQuestion1');

  await page.getByPlaceholder('New Question').press('Tab');

  await page.getByPlaceholder('New Answer').fill('TestAnswer1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close and back to overview.' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByRole('button', { name: 'Delete' }).click();

  await page.getByRole('button', { name: 'Yes!' }).click();
  await expect(page).toHaveURL('/Library');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/');

});