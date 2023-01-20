import {ModalDialog} from "react-bootstrap";
import {test, expect} from "@playwright/test";
import {username, email, password} from "../src/constants";

test("Registration", async ({page}) => {
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

  // await page.getByPlaceholder('Username').click();

  // await page.getByPlaceholder('Username').fill(username);

  await page.type('input[id="email"]', email);

  // await page.getByPlaceholder('E-Mail').click();

  // await page.getByPlaceholder('E-Mail').fill(email);

  // await page.getByPlaceholder('E-Mail').press('Tab');

  await page.type('input[id="password"]', password);

  // await page.locator('#password').fill(password);

  // await page.locator('#password').press('Tab');

  await page.type('input[id="confirm-password"]', password);

  // await page.getByPlaceholder('Confirm Password').fill(password);

  await page.locator('input:text("Submit")').click();

  await expect(page).toHaveURL("/login");

  // page.removeListener("request", logRequest);

  /*   await page.waitForTimeout(1000);
  await page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss(); // you can change the action you need, like `.accept({ promptText: "Yes" }) or `.dismiss()` for cancel actions
  });
await page.waitForTimeout(1000); */
  //   await expect(page).toHaveURL('/login');

  //   await page.getByPlaceholder('Enter Username').click();

  //   await page.getByPlaceholder('Enter Username').click();

  //   await page.getByPlaceholder('Enter Username').fill(username);

  //   await page.getByPlaceholder('Enter Password').click();

  //   await page.getByPlaceholder('Enter Password').fill(password);

  //   await page.getByRole('button', { name: 'Login' }).click();
  //   await expect(page).toHaveURL('/Library');

  //   await page.getByRole('heading', { name: 'My Library' }).click();

  //   await page.getByRole('button', { name: 'Toggle navigation' }).click();

  //   await page.getByRole('link', { name: 'Logout' }).click();
  //   await expect(page).toHaveURL('/');

  //   await page.getByRole('heading', { name: 'logoNot Logged In' }).click();
});
