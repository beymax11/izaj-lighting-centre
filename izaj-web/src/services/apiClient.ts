// Lightweight API client wrapper using fetch
// Centralizes base URL, JSON handling, and error normalization

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientOptions {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
}

export interface ApiErrorBody {
  message?: string;
  code?: string | number;
  details?: unknown;
}

export class ApiError extends Error {
  status: number;
  body?: ApiErrorBody | unknown;
  constructor(message: string, status: number, body?: ApiErrorBody | unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options?: ApiClientOptions) {
    this.baseUrl = options?.baseUrl ?? '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options?.defaultHeaders,
    };
  }

  async request<T>(path: string, init?: RequestInit & { method?: HttpMethod; parseJson?: boolean }): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl}${path}` : path;
    const { parseJson = true, ...rest } = init ?? {};

    const response = await fetch(url, {
      credentials: 'include',
      headers: this.defaultHeaders,
      ...rest,
    });

    const isJson = (response.headers.get('content-type') || '').includes('application/json');
    const data = parseJson && isJson ? await response.json().catch(() => undefined) : undefined;

    if (!response.ok) {
      const message = (data && (data.message || data.error)) || `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status, data);
    }

    return (data as T);
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'GET' });
  }

  post<T, B = unknown>(path: string, body?: B): Promise<T> {
    return this.request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
  }

  put<T, B = unknown>(path: string, body?: B): Promise<T> {
    return this.request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined });
  }

  patch<T, B = unknown>(path: string, body?: B): Promise<T> {
    return this.request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

// Default instance. Adjust baseUrl if needed
export const apiClient = new ApiClient({ baseUrl: '' });


