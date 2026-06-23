import { test, expect } from "../src/fixtures/pageFixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.LOGIN!, process.env.PASSWORD!);
});

//data provider
const productData = CsvHelper.readCsv("src/data/product.csv");

for (let row of productData) {
  test(`Verify Search results count- ${row.searchkey} -${row.productname}`, async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.doSearch(row.searchkey);
    expect(await searchResultsPage.getProductSearchResultsCount()).toBe(
      Number(row.resultcount),
    );
  });
}

for (let row of productData) {
  test(`Verify user able to land the product page -  ${row.searchkey} -${row.productname}`, async ({
    homePage,
    searchResultsPage,
    page,
  }) => {
    await homePage.doSearch(row.searchkey);
    console.log(row.searchkey);
    console.log(row.productname);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
  });
}
