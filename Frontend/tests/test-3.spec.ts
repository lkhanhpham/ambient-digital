import { test, expect } from '@playwright/test';

test('create_video_and_image_question', async ({ page }) => {
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

  await page.getByRole('heading', { name: 'My Library' }).click();

  await page.getByText('Questions Create question').click();

  await page.getByRole('button', { name: 'Create question' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('Test Frage 1');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('test antwort 1');

  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByRole('button', { name: 'Create question' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('Test Frage 1');

  await page.getByPlaceholder('New Question').press('Tab');

  await page.getByPlaceholder('New Answer').fill('Test Antwort 1');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByRole('button', { name: 'Add Videos' }).click();

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('Single Choice Test Video');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('Single Choice Test Video 1');

  await page.locator('input[name="question_vid"]').click();

  await page.locator('input[name="question_vid"]').fill('https://www.youtube.com/watch?v=_tV5LEBDs7w');

  await page.locator('input[name="answer_vid"]').click();

  await page.locator('input[name="answer_vid"]').fill('https://www.youtube.com/watch?v=_tV5LEBDs7w');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByPlaceholder('New Question').click();

  await page.locator('select[name="typeSelection"]').selectOption('MC');
  await expect(page).toHaveURL('/QuestionCreator/MC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('MC');

  await page.getByPlaceholder('New Question').press('Tab');

  await page.getByRole('textbox', { name: 'New Answer' }).fill('MC');

  await page.getByRole('textbox', { name: 'New Answer' }).press('Tab');

  await page.getByLabel('Choice 2').fill('MC');

  await page.getByLabel('Choice 2').press('Tab');

  await page.locator('#checkbox1').press('Tab');

  await page.getByLabel('Choice 3').fill('MC');

  await page.getByLabel('Choice 3').press('Tab');

  await page.locator('#checkbox2').press('Tab');

  await page.getByLabel('Choice 4').fill('MC');

  await page.locator('#checkbox1').check();

  await page.locator('#checkbox3').check();

  await page.getByRole('button', { name: 'Add Images' }).click();

  await page.getByRole('button', { name: 'Hide Images' }).click();

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close and back to overview.' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByRole('button', { name: 'Create question' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.locator('select[name="typeSelection"]').selectOption('EQ');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('EQEQ');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('EQEQE');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.locator('select[name="typeSelection"]').selectOption('MC');
  await expect(page).toHaveURL('/QuestionCreator/MC');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('MCMCMCM');

  await page.getByPlaceholder('New Question').press('Tab');

  await page.getByRole('textbox', { name: 'New Answer' }).press('Tab');

  await page.locator('div:has-text("Choose a Type: Multiple ChoiceSingle ChoiceEstimate QuestionQuestion TextAnswers")').nth(2).click();

  await page.getByRole('textbox', { name: 'New Answer' }).click();

  await page.getByRole('textbox', { name: 'New Answer' }).fill('MCMCMC');

  await page.getByRole('textbox', { name: 'New Answer' }).press('Tab');

  await page.getByLabel('Choice 2').fill('MCMCMCM');

  await page.getByLabel('Choice 2').press('Tab');

  await page.locator('#checkbox1').press('Tab');

  await page.getByLabel('Choice 3').fill('CMMCMCMCMM');

  await page.getByLabel('Choice 4').click();

  await page.getByLabel('Choice 4').fill('MCMCMCMC');

  await page.getByRole('button', { name: 'Add Images' }).click();

  await page.getByRole('button', { name: 'Hide Images' }).click();

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close and back to overview.' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByText('MCMCMCM').click();

  await page.getByRole('button', { name: 'Create quiz' }).click();
  await expect(page).toHaveURL('/QuizCreator');

  await page.getByPlaceholder('New quiz').click();

  await page.getByPlaceholder('New quiz').fill('Test1');

  await page.locator('form div:has-text("Number of Rows12345678910") select').selectOption('1');

  await page.locator('form div:has-text("Number of Rows12345678910") select').selectOption('2');

  await page.locator('form div:has-text("Number of Categories12345678910") select').selectOption('2');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL('/QuizCreator/Newquiz1');
});