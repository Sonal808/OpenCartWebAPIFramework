import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";
export class ProductInfoPage extends BasePage {
  private readonly header: Locator;
  private readonly productImages: Locator;
  private readonly productMetaData: Locator;
  private readonly productPricing: Locator;
  private map: Map<string, string | number>;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    //this.header = page.locator('h1')
    this.productImages = page.locator("div#content li img");
    this.productMetaData = page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPricing = page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li",
    );
    this.map = new Map<string, string>();
  }
  //actions

  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    //await this.page.waitForTimeout(400);
    await this.productImages.first().waitFor({ state: "visible" });
    return await this.productImages.count();
  }

  /**
   *
   * @returns this methos is returning the actual product data header, images,metadata
   */
  async getProductInfo(): Promise<Map<string, string | number>> {
    this.map.set("ProductHeader", await this.getProductHeader());
    this.map.set("ProductImages", await this.getProductImagesCount());
    await this.getProductMetaData();
    await this.getProductPricingData();

    return this.map;
  }

  private async getProductMetaData(): Promise<void> {
    let metaData: string[] = await this.productMetaData.allInnerTexts();

    for (let data of metaData) {
      let meta: string[] = data.split(":");

      let metaKey = meta[0].trim();
      let metaVal = meta[1].trim();
      this.map.set(metaKey, metaVal);
    }
  }

  private async getProductPricingData(): Promise<void> {
    let priceData: string[] = await this.productPricing.allInnerTexts();

    let productPrice = priceData[0].trim();
    let exTaxPrice = priceData[1].split(":")[1].trim();
    this.map.set("productPrice", productPrice);
    this.map.set("ExTaxPrice", exTaxPrice);
  }
}
