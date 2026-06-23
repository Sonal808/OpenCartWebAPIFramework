import { test, expect } from "../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("Home Page title test", async ({ homePage }) => {
  const pageTitle = await homePage.getPageTitle();
  console.log("Home page Title", pageTitle);
  expect(pageTitle).toBe("My Account");
});

test("Logout link exisit", async ({ homePage }) => {
  expect(await homePage.isLogOutLinkExist()).toBeTruthy();
});

test("homepage headers exist test", async ({ homePage }) => {
  let allHeaders: string[] = await homePage.getHomePageHeaders();
  console.log("Home page headers: ", allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
});
