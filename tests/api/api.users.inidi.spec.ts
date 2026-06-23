import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apiFixtures";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//Post --get
//Post --put
//post --delete

// helper - generic function create a fresh user

async function createUser(apiHelper: any) {
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
  return response.body;
}

//create a user test + veryfy AAA

test("POST -- create a user", async ({ apiHelper }) => {
  // create user
  //post ---userID --- get user/id --
  let userResponse = await createUser(apiHelper);

  //get user

  let response = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("APISDAUTO");
});

//test2 : Update a user test + AAA
//Post---> UserID--->PUT--->GET/USERID--->Verify

test("PUT -- update a user", async ({ apiHelper }) => {
  // create user
  //post ---userID --- get user/id --
  let userResponse = await createUser(apiHelper);

  //get user

  let userUpdatedData = {
    name: "APISDAUTOUpdated",
    status: "inactive",
  };

  //update user
  let response = await apiHelper.put(
    `/public/v2/users/${userResponse.id}`,
    userUpdatedData,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe(userUpdatedData.name);
  expect(response.body.status).toBe(userUpdatedData.status);
  //get user

  let getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(userUpdatedData.name);
  expect(getResponse.body.status).toBe(userUpdatedData.status);
});

//test3 : Delete user : verify AAA

test("Delete -- delete a user", async ({ apiHelper }) => {
  // create user
  //post ---userID --- get user/id --
  let userResponse = await createUser(apiHelper);

  //update user
  let response = await apiHelper.delete(
    `/public/v2/users/${userResponse.id}`,

    AUTH_HEADER,
  );
  expect(response.status).toBe(204);

  //get user

  let getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(404);
  expect(getResponse.body.message).toBe("Resource not found");
});

test("PATCH -- update a user", async ({ apiHelper }) => {
  // create user
  //post ---userID --- get user/id --
  let userResponse = await createUser(apiHelper);

  //get user

  let userUpdatedData = {
    name: "APISDAUTOUpdated",
    status: "inactive",
  };

  //update user
  let response = await apiHelper.patch(
    `/public/v2/users/${userResponse.id}`,
    userUpdatedData,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe(userUpdatedData.name);
  expect(response.body.status).toBe(userUpdatedData.status);
  //get user

  let getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(userUpdatedData.name);
  expect(getResponse.body.status).toBe(userUpdatedData.status);
});

//Assignment
