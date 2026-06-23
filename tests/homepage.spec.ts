import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin("larrymith@gmail.com", "1QAZ@wsx3EDC");
  homePage = new HomePage(page);
});

test("Home Page title test", async () => {
  const pageTitle = await homePage.getPageTitle();
  console.log("Home page Title", pageTitle);
  expect(pageTitle).toBe("My Account");
});

test("Logout link exisit", async () => {
  expect(await homePage.isLogOutLinkExist()).toBeTruthy();
});

test("homepage headers exist test", async () => {
  let allHeaders: string[] = await homePage.getHomePageHeaders();
  console.log("Home page headers: ", allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
});
