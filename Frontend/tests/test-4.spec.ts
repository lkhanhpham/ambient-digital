import { test, expect } from '@playwright/test';

test('first_quiz', async ({ page }) => {
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

  await page.getByRole('button', { name: 'Create question' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('TestFrage1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('TestAntwort 1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.locator('select[name="typeSelection"]').selectOption('EQ');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('EQ');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('EQ');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.locator('select[name="typeSelection"]').selectOption('MC');
  await expect(page).toHaveURL('/QuestionCreator/MC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('MC');

  await page.getByPlaceholder('New Question').press('Tab');

  await page.getByRole('textbox', { name: 'New Answer' }).fill('MC');

  await page.getByRole('textbox', { name: 'New Answer' }).press('Tab');

  await page.getByLabel('Choice 2').fill('MC');

  await page.getByLabel('Choice 2').press('Tab');

  await page.getByLabel('Choice 3').fill('\t');

  await page.locator('#checkbox1').press('a');

  await page.locator('#checkbox1').press('w');

  await page.locator('#checkbox1').press('d');

  await page.getByLabel('Choice 4').click();

  await page.getByLabel('Choice 4').fill('MC');

  await page.getByLabel('Choice 3').click();

  await page.getByLabel('Choice 3').fill('MC');

  await page.locator('#checkbox3').check();

  await page.locator('#checkbox2').check();

  await page.locator('#checkbox1').check();

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/MC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('MC');

  await page.getByPlaceholder('New Question').press('Tab');

  await page.getByRole('textbox', { name: 'New Answer' }).press('Tab');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('MCawd');

  await page.getByRole('textbox', { name: 'New Answer' }).click();

  await page.getByRole('textbox', { name: 'New Answer' }).fill('MC');

  await page.getByLabel('Choice 2').click();

  await page.getByLabel('Choice 2').fill('MC');

  await page.getByLabel('Choice 3').click();

  await page.getByLabel('Choice 3').fill('MC');

  await page.getByLabel('Choice 4').click();

  await page.getByLabel('Choice 4').fill('MC');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/MC');

  await page.locator('select[name="typeSelection"]').selectOption('SC');
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('SC');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('SC');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('SC2');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('SC2');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('SC3');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('SC3');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close and back to overview.' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByRole('button', { name: 'Create quiz' }).click();
  await expect(page).toHaveURL('/QuizCreator');

  await page.getByPlaceholder('New quiz').click();

  await page.getByPlaceholder('New quiz').fill('Test1');
 

});