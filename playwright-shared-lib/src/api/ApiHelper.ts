import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  async get(url: string): Promise<APIResponse> {
    return this.request.get(url);
  }

  async post(url: string, data: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post(url, { data });
  }

  async put(url: string, data: Record<string, unknown>): Promise<APIResponse> {
    return this.request.put(url, { data });
  }

  async delete(url: string): Promise<APIResponse> {
    return this.request.delete(url);
  }
}
