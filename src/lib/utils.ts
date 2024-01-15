import { useCallback, useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type State<Data, ErrorType> =
  | {
      data: Data;
      loading: false;
      success: true;
      error: Maybe<ErrorType>;
    }
  | {
      data: undefined;
      loading: true;
      success: false;
      error: Maybe<ErrorType>;
    }
  | {
      data: undefined;
      loading: false;
      success: false;
      error: Maybe<ErrorType>;
    };

/**
 * @name useRequestState
 */
export function useRequestState<Data = unknown, ErrorType = unknown>() {
  const [state, setState] = useState<State<Data, ErrorType>>({
    loading: false,
    success: false,
    error: undefined,
    data: undefined,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState({
      loading,
      success: false,
      data: undefined,
      error: undefined,
    });
  }, []);

  const setData = useCallback((data: Data) => {
    setState({
      data,
      success: true,
      loading: false,
      error: undefined,
    });
  }, []);

  const setError = useCallback((error: ErrorType) => {
    setState({
      data: undefined,
      loading: false,
      success: false,
      error,
    });
  }, []);

  return {
    state,
    setState,
    setLoading,
    setData,
    setError,
  };
}

export function useApiRequest<Resp = unknown, Body = void>(
  path: string,
  method: HttpMethod = "POST"
) {
  const { setError, setLoading, setData, state } = useRequestState<
    Resp,
    string
  >();

  const fn = useCallback(
    async (body: Body) => {
      setLoading(true);

      try {
        const payload = JSON.stringify(body);

        const data = await executeFetchRequest<Resp>(path, method, payload);

        setData(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : `Unknown error`;

        setError(message);

        return Promise.reject(error);
      }
    },
    [path, method, setLoading, setData, setError]
  );

  return [fn, state] as [typeof fn, typeof state];
}

async function executeFetchRequest<Resp = unknown>(
  url: string,
  method = "POST",
  payload: string
) {
  const options: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const methodsSupportingBody: HttpMethod[] = ["POST", "PUT"];

  const supportsBody = methodsSupportingBody.includes(method as HttpMethod);

  if (payload && supportsBody) {
    options.body = payload;
  }

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return (await response.json()) as Promise<Resp>;
    }

    return Promise.reject(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}
