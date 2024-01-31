export interface IFetchService {
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
}