import { test, expect } from "../src/fixtures/pageFixtures";
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test("Login Page title test", async ({ loginPage }) => {
  const pageTitle = await loginPage.getPageTitle();
  console.log("Login page Title", pageTitle);
  expect(pageTitle).toBe("Account Login");
});

test("Forgot pwd Link exist test", async ({ loginPage }) => {
  expect(loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test("User able to loginto app test", async ({ loginPage, homePage }) => {
  await loginPage.doLogin("larrymith@gmail.com", "1QAZ@wsx3EDC");

  expect.soft(await homePage.isLogOutLinkExist()).toBeTruthy();
  expect.soft(await homePage.getPageTitle()).toBe("My Account");
});

// run in sequential mode ----1 test is running with testdata one by oine
//DD approach part no1
test("loging to app using wrong credentials with data driven test", async ({
  loginPage,
  testData,
}) => {
  for (let row of testData) {
    await loginPage.doLogin(row.login, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  }
});

//DD approach part no2 : With out

let testData = CsvHelper.readCsv("src/data/loginData.csv");
for (let row of testData) {
  test(`invalid Login Test with - ${row.login} - ${row.password}`, async ({
    loginPage,
  }) => {
    await loginPage.doLogin(row.login, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}

// MSExcel -- office latest
//xlsx format
//maintainance
let testExceldata = ExcelHelper.readExcel(
  "src/data/OpenCartTestData.xlsx",
  "login",
);
for (let row of testExceldata) {
  test(`excel data for invalid scenarios - ${row.login} - ${row.password}`, async ({
    loginPage,
  }) => {
    await loginPage.doLogin(row.login, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}

let testjsondata = JsonHelper.readJson("src/data/logindata.json");
for (let row of testjsondata) {
  test(`json data for invalid scenarios - ${row.login} - ${row.password}`, async ({
    loginPage,
  }) => {
    await loginPage.doLogin(row.login, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}

//CSV Vs Excel Vs Json
