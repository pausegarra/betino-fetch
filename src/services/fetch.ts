import { httpErrorCodes } from '../utils/http-error-codes';
import { IFetchService } from '../interfaces/IFetchService';

export class FetchService implements IFetchService {
  baseOptions: Record<string, string>;

  constructor(private readonly baseURL: string) {
    this.baseOptions = {};
  }

  async get(endpoint: string, params: Record<string, string> = {}, headers = {}) {
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

  async post(endpoint: string, body = {}, headers = {}) {
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

  async put(endpoint: string, body = {}, headers = {}) {
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

  async delete(endpoint: string, headers = {}) {
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
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new FetchException(response.status, error);
    }
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