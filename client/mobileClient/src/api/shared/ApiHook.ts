import { useState, useEffect } from "react";
import { ApiErrorResponse, GetRequestInfo } from "./ApiResponse";
import { PagingLimit, PagingSkip } from "./ApiConst";
import {
  getWithAuthorizeHeader,
  getUri,
  getUriFromQueryObject,
  getBodyAndHeaderFromType,
} from "./ApiUtils";

import { useGlobalState } from "../../shared/globalState/AppContext";
import { useApiErrorHandling } from "../../shared/exceptionHandling/ExceptionHandlingHooks";
import {
  BackendApiException,
  ApiStatusCode,
} from "../../shared/exceptionHandling/ExceptionHandlingModels";

interface PostApiHookResult<TRequest, TResponse> {
  error: ApiHookError | undefined;
  result: TResponse | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  post: React.Dispatch<React.SetStateAction<TRequest | undefined>>;
}

interface DeleteApiHookResult<TRequest, TResponse> {
  error: ApiHookError | undefined;
  result: TResponse | undefined;
  isError: boolean;
  isLoading: boolean;
  delete: React.Dispatch<React.SetStateAction<TRequest | undefined>>;
}

export interface GetApiHookResult<TResponse, TResponseViewModel = {}> {
  error: ApiHookError | undefined;
  result: TResponse | undefined;
  isError: boolean;
  isLoading: boolean;
  setRequestInfo: React.Dispatch<
    React.SetStateAction<GetRequestOptions<TResponseViewModel>>
  >;
  requestInfo: GetRequestOptions<TResponseViewModel>;
  refetch: () => void;
  setUri: React.Dispatch<React.SetStateAction<string>>;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
  fetchFirstPage: () => void;
}

export type ApiBodyType = "json" | "urlencoded" | "multipart";
export type ApiHookError = BackendApiException;

export interface ResponseState<TResponse> {
  error?: ApiHookError;
  result?: TResponse;
  isError?: boolean;
  isSuccess?: boolean;
}

export function usePostApi<TRequest = {}, TResponse = {}>(
  uri: string,
  bodyType: ApiBodyType = "json",
  includeAuthroize = true,
  authorizeToken: string = undefined
): PostApiHookResult<TRequest, TResponse> {
  const [requestBody, setRequestBody] = useState<TRequest | undefined>(
    undefined
  );
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useApiErrorHandling(responseState.error);

  useEffect(() => {
    if (requestBody) {
      let [headers, body] = getBodyAndHeaderFromType(bodyType, requestBody);
      setIsLoading(true);
      // Todo remove logged user
      fetch(uri, {
        method: "post",
        headers: getWithAuthorizeHeader(
          authorizeToken,
          headers,
          includeAuthroize
        ),
        body,
      })
        .then(async (value) => {
          let body = {} as any;
          try {
            body = await value.json();
            console.log("Body", body);
          } catch (error) {
            body = {};
          }
          if (!value.ok) {
            setResponseState({
              isError: true,
              error: {
                type: "ApiError",
                errorObject: body,
                statusCode: value.status as ApiStatusCode,
                method: "post",
                uri,
              },
            });
            setIsLoading(false);
          } else {
            setResponseState({ isError: false, isSuccess: true, result: body });
          }

          setIsLoading(false);
        })
        .catch((error) => {
          console.log("On error", error);
          setResponseState({
            isError: true,
            error: {
              errorObject: error,
              type: "NetworkError",
              method: "post",
              uri,
            },
          });
        })
        .finally(() => {
          // setIsLoading(false);
        });
    }
  }, [requestBody]);

  return {
    result: responseState.result,
    isLoading,
    post: setRequestBody,
    error: responseState.error,
    isError: responseState.isError,
    isSuccess: responseState.isSuccess,
  };
}

export function usePostApiWithAuth<TRequest = {}, TResponse = {}>(
  uri: string,
  bodyType: ApiBodyType = "json"
) {
  const [{ account: loggedUser }] = useGlobalState();

  return usePostApi<TRequest, TResponse>(
    uri,
    bodyType,
    true,
    loggedUser && loggedUser.token
  );
}

export function usePutApi<TRequest = {}, TResponse = {}>(
  uri: string,
  bodyType: ApiBodyType = "json",
  includeAuthroize = true
): PostApiHookResult<TRequest, TResponse> {
  const [requestBody, setRequestBody] = useState<TRequest | undefined>(
    undefined
  );
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  useEffect(() => {
    if (requestBody) {
      let [headers, body] = getBodyAndHeaderFromType(bodyType, requestBody);
      setIsLoading(true);

      fetch(uri, {
        method: "put",
        headers: getWithAuthorizeHeader(
          loggedUser && loggedUser.token,
          headers,
          includeAuthroize
        ),
        body,
      })
        .then(async (value) => {
          if (!value.ok) {
            let errorObject;
            try {
              errorObject = await value.json();
            } catch (error) {
              setResponseState({
                isError: true,
                error: {
                  errorObject,
                  statusCode: value.status as ApiStatusCode,
                  type: "ApiError",
                },
              });
              setIsLoading(false);
            }
          }

          return value.json();
        })
        .then((result) => {
          setResponseState({ isError: false, result });
          setIsLoading(false);
        })
        .catch((error) => {
          setResponseState({
            isError: true,
            error: { errorObject: error, type: "NetworkError" },
          });
          setIsLoading(false);
        });
    }
  }, [requestBody, loggedUser]);

  return {
    result: responseState.result,
    isLoading,
    post: setRequestBody,
    error: responseState.error,
    isError: responseState.isError,
    isSuccess: responseState.isSuccess,
  };
}

export function useDeleteApi<TRequest = {}, TResponse = {}>(
  uri: string,
  includeAuthroize = true
): DeleteApiHookResult<TRequest, TResponse> {
  const [requestQuery, setRequestQuery] = useState<TRequest | undefined>(
    undefined
  );
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  useEffect(() => {
    if (requestQuery) {
      let headers: HeadersInit = {} as any;
      let body: BodyInit = {} as any;

      setIsLoading(true);

      fetch(getUriFromQueryObject<TRequest>(uri, requestQuery), {
        method: "delete",
        headers: getWithAuthorizeHeader(
          loggedUser && loggedUser.token,
          headers,
          includeAuthroize
        ),
        body,
      })
        .then(async (value) => {
          if (!value.ok) {
            let errorObject;
            try {
              errorObject = await value.json();
            } catch (error) {
              setResponseState({
                isError: true,
                error: {
                  errorObject,
                  statusCode: value.status as ApiStatusCode,
                  type: "ApiError",
                },
              });
              setIsLoading(false);
            }
          }

          return value.json();
        })
        .then((result) => {
          setResponseState({ isError: false, result });
          setIsLoading(false);
        })
        .catch((error) => {
          setResponseState({
            isError: true,
            error: { errorObject: error, type: "NetworkError" },
          });
          setIsLoading(false);
        });
    }
  }, [requestQuery, loggedUser]);

  return {
    result: responseState.result,
    isLoading,
    delete: setRequestQuery,
    error: responseState.error,
    isError: responseState.isError,
  };
}

export type InternalRequestInfo<TResponseViewModel> = GetRequestInfo<
  TResponseViewModel
> & { wait: boolean };

export interface GetRequestOptions<TResponseViewModel> {
  info?: GetRequestInfo<TResponseViewModel>;
  wait: boolean;
}
interface FinalUriType {
  uri: string;
  wait: boolean;
}

export function useGetApi<TResponse, TResponseViewModel = {}>(
  uri: string,
  includeAuthorize = true,
  requestInfo: GetRequestOptions<TResponseViewModel> = {
    wait: false,
    info: { limit: PagingLimit, skip: PagingSkip, queryParams: [] },
  }
): GetApiHookResult<TResponse, TResponseViewModel> {
  const [finalUri, setFinalUri] = useState<FinalUriType>();
  const [internalUri, setInternalUri] = useState(uri);
  const [internalRequestInfo, setInternalRequestInfo] = useState(requestInfo);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(!requestInfo.wait);

  useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  const fetchNextPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo((prev) => {
      const limit = (prev && prev.info && prev.info.limit) || PagingLimit;
      const skip = (prev && prev.info && prev.info.skip) || PagingSkip;

      return {
        wait: prev.wait,
        info: {
          limit,
          skip: skip + limit,
          orderBy: prev && prev.info && prev.info.orderBy,
          queryParams: (prev && prev.info && prev.info.queryParams) || [],
        },
      };
    });
  };

  const fetchPrevPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo((prev) => {
      const limit = (prev && prev.info && prev.info.limit) || PagingLimit;
      const skip = (prev && prev.info && prev.info.skip) || PagingSkip;

      return {
        wait: prev.wait,
        info: {
          limit,
          skip: skip > 0 ? skip - limit : skip,
          orderBy: prev && prev.info && prev.info.orderBy,
          queryParams: (prev && prev.info && prev.info.queryParams) || [],
        },
      };
    });
  };

  const fetchFirstPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo((prev) => {
      const limit = (prev && prev.info && prev.info.limit) || PagingLimit;
      const skip = 0;

      return {
        wait: prev.wait,
        info: {
          limit,
          skip,
          orderBy: prev && prev.info && prev.info.orderBy,
          queryParams: (prev && prev.info && prev.info.queryParams) || [],
        },
      };
    });
  };

  useEffect(() => {
    if (internalUri && internalRequestInfo && internalRequestInfo.info) {
      setFinalUri({
        wait: internalRequestInfo.wait,
        uri: getUri(internalUri, internalRequestInfo.info),
      });
    } else if (internalUri && internalRequestInfo) {
      setFinalUri({ uri: internalUri, wait: internalRequestInfo.wait });
    }
  }, [internalUri, internalRequestInfo]);

  useEffect(() => {
    if (finalUri && !finalUri.wait) {
      let headers = { "Content-Type": "application/json" };

      setIsLoading(true);

      fetch(finalUri.uri, {
        method: "get",
        headers: getWithAuthorizeHeader(
          loggedUser && loggedUser.token,
          headers,
          includeAuthorize
        ),
      })
        .then(async (value) => {
          let body: any = {};
          try {
            body = await value.json();
          } catch (error) {
            body = {};
          }
          if (!value.ok) {
            setResponseState({
              isError: true,
              error: {
                type: "ApiError",
                errorObject: body,
                statusCode: value.status as ApiStatusCode,
                method: "get",
                uri,
              },
            });
            setIsLoading(false);
          } else {
            setResponseState({ isError: false, result: body });
          }

          setIsLoading(false);
        })
        .catch((error) => {
          setResponseState({
            isError: true,
            error: {
              type: "NetworkError",
              uri,
              method: "get",
              errorObject: error,
            },
          });
          setIsLoading(false);
        });
    }
  }, [finalUri, loggedUser]);

  return {
    result: responseState.result,
    isLoading,
    setRequestInfo: setInternalRequestInfo,
    requestInfo: internalRequestInfo,
    error: responseState.error,
    isError: responseState.isError,
    setUri: setInternalUri,
    fetchNextPage,
    fetchPrevPage,
    fetchFirstPage,
    refetch: () => {
      setInternalRequestInfo((prev) => ({ ...prev }));
    },
  };
}
