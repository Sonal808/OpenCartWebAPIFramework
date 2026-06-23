import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;
  //common locators across all pages
  protected readonly logo: Locator;
  protected readonly searchBox: Locator;
  protected readonly searchIcon: Locator;
  protected readonly footerLinks: Locator;
  protected readonly currency: Locator;
  protected readonly cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText("naveenopencart");
    this.searchBox = page.getByPlaceholder("Search");
    this.searchIcon = page.locator("div#search button");
    this.currency = page.locator("#form-currency");
    this.footerLinks = page.locator("footer a");
    this.cartBtn = page.locator("div#cart button");
  }

  //common locators, common functionalities

  async isLogoVisible(): Promise<boolean> {
    return this.logo.isVisible();
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return this.searchBox.isVisible();
  }

  async isCartButtonVisible(): Promise<boolean> {
    return this.cartBtn.isVisible();
  }

  async getPageFooterCount(): Promise<number> {
    return this.footerLinks.count();
  }

  async getPageFooters(): Promise<string[]> {
    return this.footerLinks.allInnerTexts();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async waitForpageLoad() {
    await this.page.waitForLoadState("load");
  }

  async takeScreenShot(name: string) {
    return await this.page.screenshot({
      fullPage: true,
      path: `reports/screenshot/${name}`,
    });
  }
}
