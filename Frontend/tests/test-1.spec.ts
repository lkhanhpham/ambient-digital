import {test, expect} from "@playwright/test";

test("Registration_and_login", async ({page}) => {
  const username = Math.random().toString(36).slice(-8);
  const email = Math.random().toString(36).slice(-8)+"@ex.com";
  const password = "Test123test123!";

  page.on("request", (interceptedRequest) =>
    interceptedRequest.response().then(res => {
      console.log(`A ${interceptedRequest.method()} request was made: ${interceptedRequest.url()} ${interceptedRequest.postData()}`)

      if (!res) return
      console.log(`Response ${res.status()} with ${res.statusText()} ()`)
    })
  );

  page.on("console", (msg) => console.log("console.log:", msg.text()));

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

  await page.getByRole('button', { name: 'Toggle navigation' }).click();

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/');

  await page.getByRole('heading', { name: 'logoNot Logged In' }).click();
});
