import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await loginPage.goToLoginPage();
});

test("Login Page title test", async () => {
  const pageTitle = await loginPage.getLoginPageTitle();
  console.log("Login page Title", pageTitle);
  expect(pageTitle).toBe("Account Login");
});

test("Forgot pwd Link exist test", async () => {
  expect(loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test("User able to loginto app test", async () => {
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

  expect.soft(await homePage.isLogOutLinkExist()).toBeTruthy();
  expect.soft(await homePage.getPageTitle()).toBe("My Account");
});
