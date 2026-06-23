import { ContactsApiHelper } from "../../src/api/ContactsApiHelper";
import { test, expect } from "../../src/fixtures/apiFixtures";

let userName: string = process.env.CONTACT_API_USER_NAME!;
let contactPassword: string = process.env.CONTACT_API_PASSWORD!;
let token: string;

test.beforeEach("POST-ContactsLogin", async ({ contactsApiHelper }) => {
  let loginData = {
    email: process.env.CONTACT_API_USER_NAME!,
    password: process.env.CONTACT_API_PASSWORD!,
  };
  let response = await contactsApiHelper.post("/users/login", loginData);
  //console.log(response.body);
  expect(response.status).toBe(200);
  token = response.body.token;
  console.log(token);
});

async function createContact(contactsApiHelper: any) {
  let contactsData = {
    firstName: "bulto",
    lastName: "serperta",
    birthdate: "1956-01-01",
    email: "bulto@gmail.com",
    phone: "8005555555",
    street1: "1 Main St.",
    street2: "rfv A",
    city: "Anytown",
    stateProvince: "KS",
    postalCode: "12345",
    country: "USA",
  };

  let authorization = { Authorization: `Bearer ${token}` };
  let response = await contactsApiHelper.post(
    "/contacts",
    contactsData,
    authorization,
  );

  return response;
}

test("Post Add Contact", async ({ contactsApiHelper }) => {
  let authorization = { Authorization: `Bearer ${token}` };
  let userResponse = await createContact(contactsApiHelper);
  expect(userResponse.status).toBe(201);
  expect(userResponse.body.firstName).toBe("bulto");
  let userId = userResponse.body._id;
  console.log(userId);

  let response = await contactsApiHelper.get(
    `/contacts/${userId}`,
    authorization,
  );
  expect(response.status).toBe(200);
  expect(response.body.firstName).toBe("bulto");
});
