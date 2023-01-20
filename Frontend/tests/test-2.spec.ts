import { test, expect } from '@playwright/test';

test('test_question_creation_and_delete', async ({ page }) => {
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

  await page.getByPlaceholder('New Question').fill('SCSCSC SCSCSC');

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('SCSCSCSCSCSCSCSC');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Create next one!' }).click();
  await expect(page).toHaveURL('/QuestionCreator/SC');

  await page.getByText('Choose a Type: Single ChoiceMultiple ChoiceEstimate Question').click();

  await page.locator('select[name="typeSelection"]').selectOption('EQ');

  await page.getByPlaceholder('New Question').click();

  await page.getByPlaceholder('New Question').fill('EQEEQEQEQEQE');

  await page.getByPlaceholder('New Answer').click({
    modifiers: ['Shift']
  });

  await page.getByPlaceholder('New Answer').click();

  await page.getByPlaceholder('New Answer').fill('EQEQEQEQE');

  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('button', { name: 'Close and back to overview.' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByText('EQEEQEQEQEQE').click();

  await page.getByText('SCSCSC SCSCSC').click();

  await page.getByRole('button', { name: 'delete' }).first().click();

  await page.getByRole('button', { name: 'Yes!' }).click();
  await expect(page).toHaveURL('/Library');

  await page.locator('.mx-auto > div').click();

  await page.getByText('SCSCSC SCSCSC').click();

  await page.getByRole('button', { name: 'edit' }).click();
  await expect(page).toHaveURL('/QuestionCreator/EditQuestion');

  await page.getByPlaceholder('SCSCSC SCSCSC').click();

  await page.getByPlaceholder('SCSCSC SCSCSC').fill('SCSCSC');

  await page.getByRole('button', { name: 'Update' }).click();

  await page.getByRole('button', { name: 'Back to Libary' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByText('SCSCSC').click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.getByRole('button', { name: 'Yes!' }).click();
  await expect(page).toHaveURL('/Library');

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/');

});