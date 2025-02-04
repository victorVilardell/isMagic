const buildQueryParams = (body?: Record<string, unknown>): string => {
  const params = new URLSearchParams();

  if (!body) return "";

  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });

  return params.toString();
};

const fetchData = (
  path: string,
  body?: Record<string, unknown> | undefined,
  options?: RequestInit
) => {
  return fetch(`${path}${buildQueryParams(body)}`, {
    body: JSON.stringify(body),
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
};

const fetchApi = async (
  path: string,
  body?: Record<string, unknown> | undefined,
  timeout?: number
): Promise<Response> => {
  if (!timeout) {
    return fetchData(path, body);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetchData(path, body, {
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

export default fetchApi;
