import { test, expect, request } from "@playwright/test";

let OAUTH_CONFIG = {
  tokenUrl: "https://test.api.amadeus.com/v1/security/oauth2/token",
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  grantType: process.env.OAUTH_GRANT_TYPE!,
};

let accessToken: string;

test.beforeEach("POST --- generate the accessToken", async ({ request }) => {
  let response = await request.post(OAUTH_CONFIG.tokenUrl, {
    form: {
      grant_type: OAUTH_CONFIG.grantType,
      client_id: OAUTH_CONFIG.clientId,
      client_secret: OAUTH_CONFIG.clientSecret,
    },
  });

  expect(response.status()).toBe(200);
  let jsonResponse = await response.json();
  console.log(jsonResponse);
  accessToken = jsonResponse.access_token;
  //console.log(accessToken);
});

test("GET -- LocationData", async ({ request }) => {
  //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
  let baseUrl = "https://test.api.amadeus.com/";
  let endPointUrl = "v1/reference-data/locations";
  let queryParam = {
    subType: "CITY,AIRPORT",
    keyword: "MUC",
    countryCode: "DE",
  };
  let locationResponse = await request.get(`${baseUrl}${endPointUrl}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: queryParam,
  });

  expect(locationResponse.status()).toBe(200);
  //console.log(await locationResponse.json());

  let locationJson = await locationResponse.json();

  console.log(locationJson.meta.count);
  expect(locationJson.meta.count).toBe(2);
  let location1 = locationJson.data[0];
  console.log(location1);
});
