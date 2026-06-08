const WOOCOMMERCE_API_VERSION = "wc/v3";

export interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
}

export interface WooCommerceQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface WooCommerceRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  params?: WooCommerceQueryParams;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export interface WooCommerceApiErrorBody {
  code: string;
  message: string;
  data?: {
    status?: number;
    [key: string]: unknown;
  };
}

export class WooCommerceConfigError extends Error {
  readonly name = "WooCommerceConfigError";

  constructor(message: string) {
    super(message);
  }
}

export class WooCommerceRequestError extends Error {
  readonly name = "WooCommerceRequestError";
  readonly status: number;
  readonly code?: string;
  readonly body?: WooCommerceApiErrorBody | string;

  constructor(
    message: string,
    status: number,
    code?: string,
    body?: WooCommerceApiErrorBody | string
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

function normalizeStoreUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/^\/+/, "");
}

export function isWooCommerceConfigured(): boolean {
  return Boolean(
    process.env.WOOCOMMERCE_URL &&
      process.env.WOOCOMMERCE_CONSUMER_KEY &&
      process.env.WOOCOMMERCE_CONSUMER_SECRET
  );
}

export function getWooCommerceConfig(): WooCommerceConfig {
  const url = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!url || !consumerKey || !consumerSecret) {
    throw new WooCommerceConfigError(
      "WooCommerce is not configured. Set WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET."
    );
  }

  return {
    url: normalizeStoreUrl(url),
    consumerKey,
    consumerSecret,
  };
}

function buildRequestUrl(
  config: WooCommerceConfig,
  endpoint: string,
  params?: WooCommerceQueryParams
): string {
  const path = normalizeEndpoint(endpoint);
  const url = new URL(
    `${config.url}/wp-json/${WOOCOMMERCE_API_VERSION}/${path}`
  );

  url.searchParams.set("consumer_key", config.consumerKey);
  url.searchParams.set("consumer_secret", config.consumerSecret);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function isWooCommerceApiErrorBody(
  value: unknown
): value is WooCommerceApiErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    typeof value.code === "string" &&
    typeof value.message === "string"
  );
}

async function parseErrorBody(response: Response): Promise<WooCommerceApiErrorBody | string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const json: unknown = await response.json();

      if (isWooCommerceApiErrorBody(json)) {
        return json;
      }

      return JSON.stringify(json);
    } catch {
      return response.statusText;
    }
  }

  try {
    return await response.text();
  } catch {
    return response.statusText;
  }
}

export async function wooCommerceFetch<T>(
  endpoint: string,
  options: WooCommerceRequestOptions = {}
): Promise<T> {
  const config = getWooCommerceConfig();
  const {
    method = "GET",
    body,
    params,
    headers,
    cache,
    next,
  } = options;

  const url = buildRequestUrl(config, endpoint, params);
  const queryParams = Object.fromEntries(new URL(url).searchParams.entries());

  console.log("WooCommerce Request URL:", url);
  console.log("WooCommerce Query Parameters:", queryParams);

  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache,
      next,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Network request to WooCommerce failed.";

    throw new WooCommerceRequestError(message, 0);
  }

  if (!response.ok) {
    const errorBody = await parseErrorBody(response);
    const apiError = isWooCommerceApiErrorBody(errorBody) ? errorBody : undefined;

    throw new WooCommerceRequestError(
      apiError?.message ?? `WooCommerce request failed with status ${response.status}.`,
      response.status,
      apiError?.code,
      errorBody
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new WooCommerceRequestError(
      "Expected JSON response from WooCommerce.",
      response.status
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new WooCommerceRequestError(
      "Failed to parse WooCommerce JSON response.",
      response.status
    );
  }
}

export function wooCommerceGet<T>(
  endpoint: string,
  params?: WooCommerceQueryParams,
  options?: Omit<WooCommerceRequestOptions, "method" | "body" | "params">
): Promise<T> {
  return wooCommerceFetch<T>(endpoint, {
    ...options,
    method: "GET",
    params,
  });
}

export function wooCommercePost<T>(
  endpoint: string,
  body?: unknown,
  params?: WooCommerceQueryParams,
  options?: Omit<WooCommerceRequestOptions, "method" | "body" | "params">
): Promise<T> {
  return wooCommerceFetch<T>(endpoint, {
    ...options,
    method: "POST",
    body,
    params,
  });
}

export function wooCommercePut<T>(
  endpoint: string,
  body?: unknown,
  params?: WooCommerceQueryParams,
  options?: Omit<WooCommerceRequestOptions, "method" | "body" | "params">
): Promise<T> {
  return wooCommerceFetch<T>(endpoint, {
    ...options,
    method: "PUT",
    body,
    params,
  });
}

export function wooCommerceDelete<T>(
  endpoint: string,
  params?: WooCommerceQueryParams,
  options?: Omit<WooCommerceRequestOptions, "method" | "body" | "params">
): Promise<T> {
  return wooCommerceFetch<T>(endpoint, {
    ...options,
    method: "DELETE",
    params,
  });
}
