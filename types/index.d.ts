declare module '@betino/fetch' {
  export interface FetchResponse<T = any> {
    data: T;
    status: number;
  }

  export class FetchService {
    baseOptions: Record<string, string>;

    constructor(baseURL: string);

    get(
      endpoint: string,
      params?: Record<string, string>,
      headers?: Record<string, string>
    ): Promise<FetchResponse>;

    post(
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<FetchResponse>;

    put(
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<FetchResponse>;

    delete(
      endpoint: string,
      headers?: Record<string, string>
    ): Promise<FetchResponse>;

    handleResponse<T>(response: Response): Promise<FetchResponse<T>>;
  }
}
