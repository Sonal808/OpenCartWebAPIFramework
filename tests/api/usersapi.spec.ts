import { test, expect, request } from "@playwright/test";

let AUTH_TOKEN = {
  Authorization:
    "Bearer 84716322be4afca67b6b04931efa801cd175c20358038b61057f1baee83b3bc7",
};

test("getUser test", async ({ request }) => {
  let response = await request.get("https://gorest.co.in/public/v2/users/", {
    headers: AUTH_TOKEN,
  });

  console.log(response);

  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
  console.log(response.statusText());
});

test("create User test", async ({ request }) => {
  let userData = {
    name: "JonnyPW",
    email: `automation${Date.now()}@gmail.com`,
    gender: "male",
    status: "active",
  };

  //JSOBject to JSON: Serialization
  let response = await request.post("https://gorest.co.in/public/v2/users", {
    headers: AUTH_TOKEN,
    data: userData,
  });

  console.log(response);

  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status()); //201
  console.log(response.statusText()); //create
});

test.skip("Update User test", async ({ request }) => {
  let userData = {
    name: "JonnyPW",
    email: `automation${Date.now()}@gmail.com`,
    gender: "male",
    status: "inactive",
  };

  //JSOBject to JSON: Serialization
  let response = await request.put(
    "https://gorest.co.in/public/v2/users/8504875",
    {
      headers: AUTH_TOKEN,
      data: userData,
    },
  );

  console.log(response);

  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status()); //200
  console.log(response.statusText()); //OK

  expect(response.status()).toBe(200);
});

test.skip("delete User test", async ({ request }) => {
  //JSOBject to JSON: Serialization
  let response = await request.delete(
    "https://gorest.co.in/public/v2/users/8504875",
    {
      headers: AUTH_TOKEN,
    },
  );

  console.log(response);

  console.log(response.status()); //204
  console.log(response.statusText()); //no content
});
