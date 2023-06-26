import { httpErrorCodes } from '../utils/http-error-codes';

export class FetchService {
  baseOptions: Record<string, string>

  constructor(private readonly baseURL: string) {
    this.baseOptions = {
      credentials: 'include'
    }
  }

  async get (endpoint: string, params: Record<string,string> = {}, headers = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
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

  async post (endpoint: string, body = {}, headers = {}) {
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

  async put (endpoint: string, body = {}, headers = {}) {
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

  async delete (endpoint: string, headers = {}) {
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

  async handleResponse (response: Response) {
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
    super()
    this.status = code
    this.error = err
    this.name = httpErrorCodes[code]
  }
}