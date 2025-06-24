import { httpErrorCodes } from '../utils/http-error-codes';
import { FetchService } from '../interfaces/IFetchService';

export class FetchServiceImpl implements FetchService {
  baseOptions: Record<string, string>;

  constructor(private readonly baseURL: string) {
    this.baseOptions = {};
  }

  async get<T = any>(endpoint: string, params: Record<string, string> = {}, headers = {}): Promise<T> {
    const url = this.constructUrl(this.baseURL, endpoint, params);
    const response = await fetch(url, {
      ...this.baseOptions,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return this.handleResponse(response);
  }

  constructUrl(baseURL: string, endpoint: string, params: Record<string, string>) {
    let url = `${baseURL}${endpoint}`;

    const paramKeys = Object.keys(params);
    if (paramKeys.length > 0) {
      url += '?';
      paramKeys.forEach((key, index) => {
        url += `${key}=${params[key]}`;
        if (index < paramKeys.length - 1) {
          url += '&';
        }
      });
    }

    return url;
  };

  async post<T = any>(endpoint: string, body = {}, headers = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...this.baseOptions,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    });
    return this.handleResponse(response);
  }

  async put<T = any>(endpoint: string, body = {}, headers = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...this.baseOptions,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    });
    return this.handleResponse(response);
  }

  async patch<T = any>(endpoint: string, body = {}, headers = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...this.baseOptions,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    });
    return this.handleResponse(response);
  }

  async delete<T = any>(endpoint: string, headers = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...this.baseOptions,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return this.handleResponse(response);
  }

  async handleResponse(response: Response) {
    const contentType = response.headers.get('Content-Type');

    let responseBody;

    if (!contentType) {
      responseBody = await response.json();
      return responseBody;
    }

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (contentType.includes('text/plain')) {
      responseBody = await response.text();
    }

    if (contentType.includes('application/octet-stream') || contentType.includes('application/pdf') || contentType.includes('blob')) {
      responseBody = await response.blob();
    }

    return responseBody;
  }
}

class FetchException extends Error {
  status: number;
  error: Error;

  constructor(code: number, err: Error) {
    super();
    this.status = code;
    this.error = err;
    this.name = httpErrorCodes[code];
  }
}