import { useState, useEffect } from "react";
import {
  ApiErrorResponse,
} from "./ApiResponse";
import { ApiStatusCode, PagingLimit, PagingOffset } from "./ApiConst";
import {
  getWithAuthorizeHeader,
  getUri,
  getUriFromQueryObject
} from "./ApiUtils";
import { GetRequestInfo } from "./ApiResponse";
import {
  getBodyAndHeaderFromType
} from "./ApiUtils";
import { ExceptionHandlingHooks } from "../../shared/exceptionHandling/ExceptionHandlingHooks";
import { useGlobalState } from "../../shared/globalState/AppContext";

interface PostApiHookResult<TRequest, TResponse> {
  error: ApiHookError | undefined;
  result: TResponse | undefined;
  isError: boolean;
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
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
}

export interface ApiHookError {
  statusCode: ApiStatusCode;
  errorObject: ApiErrorResponse;
}

export type ApiBodyType = "json" | "urlencoded" | "multipart";

export interface ResponseState<TResponse> {
  error?: ApiHookError;
  result?: TResponse;
  isError: boolean;
}

export function usePostApi<TRequest = {}, TResponse = {}>(
  uri: string,
  bodyType: ApiBodyType = "json",
  includeAuthroize: boolean = true
): PostApiHookResult<TRequest, TResponse> {
  const [requestBody, setRequestBody] = useState<TRequest | undefined>(undefined);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  ExceptionHandlingHooks.useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  useEffect(() => {
    if (requestBody) {
      let [headers, body] = getBodyAndHeaderFromType(bodyType, requestBody);
      setIsLoading(true);

      fetch(uri, {
        method: "post",
        headers: getWithAuthorizeHeader(loggedUser && loggedUser.token, headers, includeAuthroize),
        body
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) { }
            throw { statusCode: value.status, errorObject };
          }

          return value.json();
        })
        .then(result => {
          setResponseState(prev => ({ isError: false, result }));
          setIsLoading(false);
        })
        .catch(({ errorObject, statusCode }) => {
          setResponseState(prev => ({
            isError: true,
            error: { errorObject, statusCode }
          }));
          setIsLoading(false);
        });
    }

  }, [requestBody, loggedUser]);

  return {
    result: responseState.result,
    isLoading,
    post: setRequestBody,
    error: responseState.error,
    isError: responseState.isError
  };
}

export function usePutApi<TRequest = {}, TResponse = {}>(
  uri: string,
  bodyType: ApiBodyType = "json",
  includeAuthroize: boolean = true
): PostApiHookResult<TRequest, TResponse> {
  const [requestBody, setRequestBody] = useState<TRequest | undefined>(undefined);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  ExceptionHandlingHooks.useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  useEffect(() => {
    if (requestBody) {
      let [headers, body] = getBodyAndHeaderFromType(bodyType, requestBody);
      setIsLoading(true);

      fetch(uri, {
        method: "put",
        headers: getWithAuthorizeHeader(loggedUser && loggedUser.token, headers, includeAuthroize),
        body
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) { }
            throw { statusCode: value.status, errorObject };
          }

          return value.json();
        })
        .then(result => {
          setResponseState(prev => ({ isError: false, result }));
          setIsLoading(false);
        })
        .catch(({ errorObject, statusCode }) => {
          setResponseState(prev => ({
            isError: true,
            error: { errorObject, statusCode }
          }));
          setIsLoading(false);
        });
    }
  }, [requestBody, loggedUser]);

  return {
    result: responseState.result,
    isLoading,
    post: setRequestBody,
    error: responseState.error,
    isError: responseState.isError
  };
}

export function useDeleteApi<TRequest = {}, TResponse = {}>(
  uri: string,
  includeAuthroize: boolean = true
): DeleteApiHookResult<TRequest, TResponse> {
  const [requestQuery, setRequestQuery] = useState<TRequest | undefined>(undefined);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  ExceptionHandlingHooks.useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  useEffect(() => {
    if (requestQuery) {
      let headers: HeadersInit = {} as any;
      let body: BodyInit = {} as any;

      setIsLoading(true);

      fetch(getUriFromQueryObject<TRequest>(uri, requestQuery), {
        method: "delete",
        headers: getWithAuthorizeHeader(loggedUser && loggedUser.token, headers, includeAuthroize),
        body
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) { }
            throw { statusCode: value.status, errorObject };
          }

          return value.json();
        })
        .then(result => {
          setResponseState(prev => ({ isError: false, result }));
          setIsLoading(false);
        })
        .catch(({ errorObject, statusCode }) => {
          setResponseState(prev => ({
            isError: true,
            error: { errorObject, statusCode }
          }));
          setIsLoading(false);
        });
    }
  }, [requestQuery, loggedUser]);

  return {
    result: responseState.result,
    isLoading,
    delete: setRequestQuery,
    error: responseState.error,
    isError: responseState.isError
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
  includeAuthorize: boolean = true,
  requestInfo: GetRequestOptions<TResponseViewModel> = { wait: false }
): GetApiHookResult<TResponse, TResponseViewModel> {
  const [finalUri, setFinalUri] = useState<FinalUriType>();
  const [internalUri, setInternalUri] = useState(uri);
  const [internalRequestInfo, setInternalRequestInfo] = useState(requestInfo);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(!requestInfo.wait);

  ExceptionHandlingHooks.useApiErrorHandling(responseState.error);
  const [{ account: loggedUser }] = useGlobalState();

  const fetchNextPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo(prev => {
      const limit = (prev && prev.info && prev.info.limit) || PagingLimit;
      const offset = (prev && prev.info && prev.info.offSet) || PagingOffset;

      return {
        wait: prev.wait,
        info: {
          limit,
          offSet: offset + limit,
          orderBy: prev && prev.info && prev.info.orderBy,
          queryParams: (prev && prev.info && prev.info.queryParams) || []
        }
      };
    });
  };

  const fetchPrevPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo(prev => {
      const limit = (prev && prev.info && prev.info.limit) || PagingLimit;
      const offset = (prev && prev.info && prev.info.offSet) || PagingOffset;

      return {
        wait: prev.wait,
        info: {
          limit,
          offSet:
            offset > 0
              ? offset - limit
              : offset,
          orderBy: prev && prev.info && prev.info.orderBy,
          queryParams: (prev && prev.info && prev.info.queryParams) || []
        }
      };
    });
  };

  useEffect(() => {
    if (internalUri && internalRequestInfo && internalRequestInfo.info) {
      setFinalUri({
        wait: internalRequestInfo.wait,
        uri: getUri(internalUri, internalRequestInfo.info)
      });
    } else if (internalUri) {
      setFinalUri({ uri: internalUri, wait: internalRequestInfo.wait });
    }
  }, [internalUri, internalRequestInfo]);

  useEffect(() => {
    if (finalUri && !finalUri.wait) {
      let headers = { "Content-Type": "application/json" };

      setIsLoading(true);

      fetch(finalUri.uri, {
        method: "get",
        headers: getWithAuthorizeHeader(loggedUser && loggedUser.token, headers, includeAuthorize)
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) { }
            throw { statusCode: value.status, errorObject };
          }

          return value.json();
        })
        .then(result => {
          setResponseState(prev => ({ isError: false, result }));
          setIsLoading(false);
        })
        .catch(({ errorObject, statusCode }) => {
          setResponseState(prev => ({
            isError: true,
            error: { errorObject, statusCode }
          }));
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
    fetchNextPage,
    fetchPrevPage,
    refetch: () => {
      setInternalRequestInfo(prev => Object.assign({}, prev));
    }
  };
}
