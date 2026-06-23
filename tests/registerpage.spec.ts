import { test, expect } from "../src/fixtures/pageFixtures";
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.navigateToRegisterPage();
});

test("check the register page is visible", async ({ registerPage }) => {
  expect(await registerPage.isRegisterAccountheaderVisible()).toBeTruthy();
});

let testData = CsvHelper.readCsv("src/data/userRegisterData.csv");

for (let row of testData) {
  test(`create User - ${row.firstname}`, async ({ registerPage }) => {
    await registerPage.createUser(
      row.firstname,
      row.lastname,
      row.email,
      row.telephone,
      row.password,
      row.issubcribe,
    );

    expect(await registerPage.isAccountCreatedHeaderVisible()).toBeTruthy();
  });
}
