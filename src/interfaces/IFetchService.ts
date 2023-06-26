export interface IFetchService {
  get(
    endpoint: string,
    params?: Record<string, string>,
    headers?: Record<string, string>
  ): Promise<any>;

  post(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<any>;

  put(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<any>;

  delete(endpoint: string, headers?: Record<string, string>): Promise<any>;
}