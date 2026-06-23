import { APIRequestContext } from "@playwright/test";

export class ContactsApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async get(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.get(`${this.baseUrl}${endPoint}`, {
      headers: headers,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  async post(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.post(`${this.baseUrl}${endPoint}`, {
      data: data,
      headers: headers,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }
  async put(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.put(`${this.baseUrl}${endPoint}`, {
      data: data,
      headers: headers,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }
  async patch(
    endPoint: string,
    data: object,
    headers?: Record<string, string>,
  ) {
    let response = await this.request.patch(`${this.baseUrl}${endPoint}`, {
      data: data,
      headers: headers,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  async delete(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.delete(`${this.baseUrl}${endPoint}`, {
      headers: headers,
    });

    return {
      status: response.status(),
    };
  }
}
