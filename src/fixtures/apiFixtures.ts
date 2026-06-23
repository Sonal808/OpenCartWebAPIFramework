import { test as baseTest } from "@playwright/test";
import { ApiHelper } from "../api/ApiHelper";
import { ContactsApiHelper } from "../api/ContactsApiHelper";

//define type of api fixtures

type apiFixtures = {
  apiHelper: ApiHelper;
  contactsApiHelper: ContactsApiHelper;
};

export let test = baseTest.extend<apiFixtures>({
  apiHelper: async ({ request }, use) => {
    let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
    await use(apiHelper);
  },

  contactsApiHelper: async ({ request }, use) => {
    let contactsApiHelper = new ContactsApiHelper(
      request,
      process.env.CONTACT_API_BASE_URL!,
    );
    await use(contactsApiHelper);
  },
});

export { expect } from "@playwright/test";
