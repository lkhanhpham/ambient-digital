import { test, expect } from '@playwright/test';

test('Registration_Create_Question', async ({ page }) => {

  let password= "AdminAdmin"
  let username= "Admin"
  let email=  username+ "@ex.com"

  await page.goto('/');

  await page.getByRole('button', { name: 'Register now' }).click();

  await expect(page).toHaveURL('/Registration');

  await page.getByPlaceholder('Username').click();

  await page.getByPlaceholder('Username').fill(username);

  await page.getByPlaceholder('Username').press('Tab');

  await page.getByPlaceholder('E-Mail').fill(email);

  await page.getByPlaceholder('E-Mail').press('Tab');

  await page.locator('#password').fill(password);

  await page.locator('#password').press('Tab');

  await page.getByPlaceholder('Confirm Password').fill(password);

  await page.getByRole('button', { name: 'Submit' }).click();

  await  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
 /* 
  await page.goto('http://localhost:3000/login');

  await expect(page).toHaveURL('http://localhost:3000/login');

  await page.getByPlaceholder('Enter Username').click();

  await page.getByPlaceholder('Enter Username').fill(username);

  await page.getByPlaceholder('Enter Username').press('Tab');

  await page.getByPlaceholder('Enter Password').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/Library');

  await page.locator('.nav__menu-bar > div:nth-child(2)').click();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'My Library' }).click();
  await expect(page).toHaveURL('http://localhost:3000/Library');

  await page.locator('.nav__menu-bar > div:nth-child(2)').click();

  await page.getByRole('link', { name: 'Quiz-Room' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Create Quiz' }).click();
  await expect(page).toHaveURL('http://localhost:3000/QuizCreator');

  await page.locator('.nav__menu-bar > div:nth-child(2)').click();

  await page.getByRole('link', { name: 'Create Question' }).click();
  await expect(page).toHaveURL('http://localhost:3000/QuestionCreator/SC');

  await page.locator('#root div:has-text("HomeMy LibraryQuiz-RoomCreate QuizCreate QuestionCreate CategoriesLogout")').nth(3).click();

  await page.getByRole('link', { name: 'Create Categories' }).click();
  await expect(page).toHaveURL('http://localhost:3000/CategoryCreator');

  await page.getByPlaceholder('New Category').click();

  await page.getByPlaceholder('New Category').fill('Cat1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Create Question' }).click();
  await expect(page).toHaveURL('http://localhost:3000/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('TestFrage1');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('TestAntwort1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close and back to overview.' }).click();
  await expect(page).toHaveURL('http://localhost:3000/Library');

  await page.getByRole('button', { name: 'Delete' }).click();

  await page.getByRole('button', { name: 'Yes!' }).click();
  await expect(page).toHaveURL('http://localhost:3000/Library');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('.nav__menu-bar > div:nth-child(2)').click();

  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/Login');

  await page.locator('.nav__menu-bar').click();

  await page.getByRole('link', { name: 'Registration' }).click();
  await expect(page).toHaveURL('http://localhost:3000/Registration');  */

});