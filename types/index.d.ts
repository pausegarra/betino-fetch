declare module '@betino/fetch' {
  export interface FetchResponse<T = any> {
    data: T;
    status: number;
  }

  export class FetchService {
    baseOptions: Record<string, string>;

    constructor(baseURL: string);

    get<T = any>(
      endpoint: string,
      params?: Record<string, string>,
      headers?: Record<string, string>
    ): Promise<T>;

    post<T = any>(
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<T>;

    put<T = any>(
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<T>;

    put<T = any>(
      endpoint: string,
      body?: any,
      headers?: Record<string, string>
    ): Promise<T>;

    delete<T = any>(endpoint: string, headers?: Record<string, string>): Promise<T>;

    handleResponse<T>(response: Response): Promise<FetchResponse<T>>;
  }
}
