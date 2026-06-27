# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productpage.spec.ts >> @smoke verify tproduct Information data
- Location: tests/productpage.spec.ts:20:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | 
  3  | import { BasePage } from "./BasePage";
  4  | export class LoginPage extends BasePage {
  5  |   //private locators
  6  | 
  7  |   private readonly emailId: Locator;
  8  |   private readonly password: Locator;
  9  |   private readonly loginBtn: Locator;
  10 |   private readonly forgottenPasswordLink: Locator;
  11 |   private readonly loginErrormessage: Locator;
  12 |   private readonly registerLink: Locator;
  13 | 
  14 |   //contructoe of the class: init the locators
  15 |   constructor(page: Page) {
  16 |     super(page);
  17 |     this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
  18 |     this.password = page.getByRole("textbox", { name: "Password" });
  19 |     this.loginBtn = page.getByRole("button", { name: "Login" });
  20 |     this.forgottenPasswordLink = page
  21 |       .getByRole("link", { name: "Forgotten Password" })
  22 |       .first();
  23 |     this.loginErrormessage = page.locator(
  24 |       ".alert.alert-danger.alert-dismissible",
  25 |     );
  26 |     this.registerLink = page.getByRole("link", { name: "Register" });
  27 |   }
  28 | 
  29 |   // public page actions(methos/behaviour)
  30 | 
  31 |   async goToLoginPage(): Promise<void> {
> 32 |     await this.page.goto("opencart/index.php?route=account/login");
     |                     ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  33 |   }
  34 | 
  35 |   async getLoginPageTitle(): Promise<string> {
  36 |     return await this.page.title();
  37 |   }
  38 | 
  39 |   async isForgottenPwdLinkExist(): Promise<boolean> {
  40 |     return await this.forgottenPasswordLink.isVisible();
  41 |   }
  42 | 
  43 |   async doLogin(username: string, password: string): Promise<void> {
  44 |     console.log(`user creds:${username}`);
  45 |     await this.emailId.fill(username);
  46 |     await this.password.fill(password);
  47 |     await this.loginBtn.click();
  48 |   }
  49 |   async isInvalidLoginErrorDisplayed(): Promise<boolean> {
  50 |     return await this.loginErrormessage.isVisible();
  51 |   }
  52 | 
  53 |   async isRegisterLinkExists(): Promise<boolean> {
  54 |     return await this.registerLink.isVisible();
  55 |   }
  56 |   async navigateToRegisterPage(): Promise<void> {
  57 |     await this.registerLink.click();
  58 |   }
  59 | }
  60 | 
```