// web app---> intercept the network calls and log them...
//** wildcard */ -- matched all urls

import { test, expect, request } from "@playwright/test";

//intercept the network calls
test("intercept and log requests", async ({ page }) => {
  page.route("**/*", async (route) => {
    console.log(route.request().method(), route.request().url());
    route.continue(); //url1 ---capture and contineu/.. url2 capture --continue
  });

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=common/home",
  );
});

//intercepting with mocking
//mocking: fake data/response
test("mock  search data API", async ({ page }) => {
  let fakeProducts = [
    { name: "fake MackBookPro", price: "$599" },
    { name: "fake Iphone 20", price: "$999" },
  ];

  await page.route(
    "**/index.php?route=product/search&search=macBook",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeProducts),
      });
    },
  );

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macBook",
  );

  let fakeJson = await page.evaluate(async () => {
    let fakeRes = await fetch(
      "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macBook",
    );
    return await fakeRes.json();
  });

  console.log("fake json Responce", fakeJson);
});
