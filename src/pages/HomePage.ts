import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";
export class HomePage extends BasePage {
  //private locators

  private readonly logOutLink: Locator;
  private readonly headers: Locator;

  //contructoe of the class: init the locators
  constructor(page: Page) {
    super(page);

    this.logOutLink = page.getByRole("link", { name: "Logout" });
    this.headers = page.getByRole("heading", { level: 2 });
  }

  // public page actions(methos/behaviour)

  // async getHomePageTitle(): Promise<string> {
  //   return await this.page.title();
  // }

  async isLogOutLinkExist(): Promise<boolean> {
    return await this.logOutLink.isVisible();
  }

  async getHomePageHeaders(): Promise<string[]> {
    return await this.headers.allInnerTexts();
  }

  async doSearch(searchKey: string): Promise<void> {
    console.log("search key: ", searchKey);
    await this.searchBox.fill(searchKey);
    await this.searchIcon.click();
  }
}
