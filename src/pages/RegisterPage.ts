import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";
export class RegisterPage extends BasePage {
  private readonly firstName;
  private readonly lastName;
  private readonly email;
  private readonly telephone;
  private readonly password;
  private readonly passwordConfirm;
  private readonly registerAccount;
  private readonly yesOption;
  private readonly noOption;
  private readonly agreeOption;
  private readonly continueBtn;
  private readonly accountCreatedHeader;

  constructor(page: Page) {
    super(page);

    this.firstName = page.getByRole("textbox", { name: "First Name" });
    this.lastName = page.getByRole("textbox", { name: "Last Name" });
    this.email = page.getByRole("textbox", { name: "E-mail" });
    this.telephone = page.getByRole("textbox", { name: "Telephone" });
    this.password = page.getByRole("textbox", { name: "Password" }).first();
    this.passwordConfirm = page
      .getByRole("textbox", {
        name: "Password Confirm",
      })
      .last();
    this.registerAccount = page.getByRole("heading", {
      level: 1,
      name: "Register Account",
    });

    this.yesOption = page.getByRole("radio", { name: "Yes" });
    this.noOption = page.getByRole("radio", { name: "no" });
    this.agreeOption = page.locator('input[name="agree"]');
    this.continueBtn = page.getByRole("button", { name: "Continue" });
    this.accountCreatedHeader = page.getByRole("heading", {
      level: 1,
      name: "Your Account Has Been Created!",
    });
  }

  async isRegisterAccountheaderVisible(): Promise<boolean> {
    await this.registerAccount.waitFor({ state: "visible" });
    return await this.registerAccount.isVisible();
  }

  async createUser(
    firstName: string,
    lastname: string,
    email: string,
    telephone: string,
    password: string,
    isSubscribe: string,
  ) {
    let emailVal = `${email}${Date.now()}@test.com`;
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastname);
    await this.email.fill(emailVal);
    await this.telephone.fill(telephone);
    await this.password.fill(password);
    await this.passwordConfirm.fill(password);
    if (isSubscribe === "yes") {
      await this.yesOption.check();
    } else if (isSubscribe === "no") {
      await this.noOption.check();
    }

    await this.agreeOption.click();
    await this.continueBtn.click();
  }

  async isAccountCreatedHeaderVisible(): Promise<boolean> {
    return this.accountCreatedHeader.isVisible();
  }
}
