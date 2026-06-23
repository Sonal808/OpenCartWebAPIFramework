//type of the response data
//consumer ------------> Producer
//ajv for schema validation npm install ajv

import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apiFixtures";
import Ajv from "ajv";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//set up ajv
let ajv = new Ajv();
//define my jsonschema
let userSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    status: {
      type: "string",
    },
  },
  required: ["id", "name", "email", "gender", "status"],
};

let userArraySchema = {
  type: "array",
  items: userSchema,
};

test("GET---get a user", async ({ apiHelper }) => {
  let userData = {
    name: "schema test",
    email: `automation_${Date.now()}@open.com`,
    gender: "male",
    status: "active",
  };
  //create a user
  let createResponse = await apiHelper.post(
    "/public/v2/users",
    userData,
    AUTH_HEADER,
  );

  let userId = createResponse.body.id;
  console.log(userId);

  //get usr
  let getUserResponse = await apiHelper.get(
    `/public/v2/users/${userId}`,
    AUTH_HEADER,
  );

  expect(getUserResponse.status).toBe(200);

  let validate = ajv.compile(userSchema);
  let isSchemaValid = validate(getUserResponse.body);
  if (!isSchemaValid) {
    console.log("Schema Errors: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});

test("GET---get all user", async ({ apiHelper }) => {
  //get usr
  let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);

  expect(getUsersResponse.status).toBe(200);

  let validate = ajv.compile(userArraySchema);
  let isSchemaValid = validate(getUsersResponse.body);
  if (!isSchemaValid) {
    console.log("Schema Errors: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});
