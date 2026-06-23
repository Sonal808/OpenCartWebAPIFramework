import { test, expect } from "../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("verify the the product images count", async ({
  homePage,
  searchResultsPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultsPage.selectProduct("MacBook Pro");
  let imageCount = await productInfoPage.getProductImagesCount();
  console.log("total Images: ", imageCount);
  expect(imageCount).toBe(4);
});

test("verify tproduct Information data", async ({
  homePage,
  searchResultsPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultsPage.selectProduct("MacBook Pro");
  let actualProductInfoMap = await productInfoPage.getProductInfo();
  console.log("actual product detail: ", actualProductInfoMap);
  expect.soft(actualProductInfoMap.get("ProductHeader")).toBe("MacBook Pro");
  expect.soft(actualProductInfoMap.get("Brand")).toBe("Apple");
  expect.soft(actualProductInfoMap.get("Product Code")).toBe("Product 18");
  expect.soft(actualProductInfoMap.get("Reward Points")).toBe("800");
  expect.soft(actualProductInfoMap.get("Availability")).toBe("Out Of Stock");
  expect.soft(actualProductInfoMap.get("productPrice")).toBe("$2,000.00");
  expect.soft(actualProductInfoMap.get("ExTaxPrice")).toBe("$2,000.00");
});

//common tests
test("companyLogo exists on productpage", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("footers exists on productpage", async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});
