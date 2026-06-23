import { test, expect } from "../../src/fixtures/apiFixtures";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let userId: number;

test.describe.serial("running e2e go rest crud api tests", () => {
  //get test:

  test("GET API -- get all Users", async ({ apiHelper }) => {
    let response = await apiHelper.get("/public/v2/users", AUTH_HEADER);

    console.log("API GET response");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("POST API -- create single user", async ({ apiHelper }) => {
    let userData = {
      name: "APISDAUTO",
      email: `automation${Date.now()}@gmail.com`,
      gender: "male",
      status: "active",
    };
    let response = await apiHelper.post(
      "/public/v2/users",
      userData,
      AUTH_HEADER,
    );

    console.log("API GET response");
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userId = response.body.id;
    console.log("Created user id: ", userId);
  });

  test("PUT API -- Update single user", async ({ apiHelper }) => {
    let userData = {
      name: "APISDAUTOUpdated",
      status: "inactive",
    };
    let response = await apiHelper.put(
      `/public/v2/users/${userId}`,
      userData,
      AUTH_HEADER,
    );

    console.log("API GET response", response);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userData.name);
  });

  test("Delete API -- Delete single user", async ({ apiHelper }) => {
    let response = await apiHelper.delete(
      `/public/v2/users/${userId}`,

      AUTH_HEADER,
    );

    console.log("API GET response", response);
    expect(response.status).toBe(204);
    //expect(response.body.name).toBe(userData.name);
  });
});
