/**
 * عميل HTTP بسيط لخلفية Spring Boot المستقبلية.
 * يُستخدم فقط من تنفيذات Http* داخل طبقة المستودعات (repositories).
 * المكوّنات لا تستورد هذا الملف مباشرة.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiClient {
  get<T>(path: string, params?: Record<string, string | undefined>): Promise<T>;
}

function buildUrl(path: string, params?: Record<string, string | undefined>): string {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

export const httpClient: ApiClient = {
  async get<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
    const response = await fetch(buildUrl(path, params), {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new ApiError(response.status, `طلب فشل: ${response.status} ${path}`);
    }
    return (await response.json()) as T;
  },
};
