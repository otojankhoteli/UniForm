import { useState, useEffect } from "react";
import {
  ApiErrorUnion,
  ApiErrorResponse,
  TokenErrorResponse
} from "./ApiResponse";
import { ApiStatusCode } from "./ApiConst";
import {
  getWithAuthorizeHeader,
  getUri,
  getUriFromQueryObject
} from "./ApiUtils";
import { GetRequestInfo } from "./ApiResponse";
import {
  getBodyAndHeaderFromType
} from "./ApiUtils";
import useErrorHandling from "../../shared/hooks/ErrorHandlingHooks";

interface PostApiHookResult<TRequest, TResponse> {
  error: ApiHookError;
  result: TResponse;
  isError: boolean;
  isLoading: boolean;
  post: React.Dispatch<React.SetStateAction<TRequest>>;
}

interface DeleteApiHookResult<TRequest, TResponse> {
  error: ApiHookError;
  result: TResponse;
  isError: boolean;
  isLoading: boolean;
  delete: React.Dispatch<React.SetStateAction<TRequest>>;
}

export interface GetApiHookResult<TResponse, TResponseViewModel = {}> {
  error: ApiHookError;
  result: TResponse;
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
  const [requestBody, setRequestBody] = useState<TRequest>(undefined);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useErrorHandling(responseState.error);

  useEffect(() => {
    if (requestBody) {
      let [headers, body] = getBodyAndHeaderFromType(bodyType, requestBody);
      setIsLoading(true);

      fetch(uri, {
        method: "post",
        headers: getWithAuthorizeHeader(headers, includeAuthroize),
        body
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) {}
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
  }, [requestBody]);

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
  const [requestBody, setRequestBody] = useState<TRequest>(undefined);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useErrorHandling(responseState.error);

  useEffect(() => {
    if (requestBody) {
      let [headers, body] = getBodyAndHeaderFromType(bodyType, requestBody);
      setIsLoading(true);

      fetch(uri, {
        method: "put",
        headers: getWithAuthorizeHeader(headers, includeAuthroize),
        body
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) {}
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
  }, [requestBody]);

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
  const [requestQuery, setRequestQuery] = useState<TRequest>(undefined);
  const [responseState, setResponseState] = useState<ResponseState<TResponse>>({
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useErrorHandling(responseState.error);

  useEffect(() => {
    if (requestQuery) {
      let headers: HeadersInit = {} as any;
      let body: BodyInit = {} as any;

      setIsLoading(true);

      fetch(getUriFromQueryObject<TRequest>(uri, requestQuery), {
        method: "delete",
        headers: getWithAuthorizeHeader(headers, includeAuthroize),
        body
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) {}
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
  }, [requestQuery]);

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

  useErrorHandling(responseState.error);

  const fetchNextPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo(prev => ({
      wait: prev.wait,
      info: {
        limit: prev.info.limit,
        offSet: prev.info.offSet + prev.info.limit,
        orderBy: prev.info.orderBy,
        queryParams: prev.info.queryParams
      }
    }));
  };

  const fetchPrevPage = () => {
    if (responseState.isError) return;
    setInternalRequestInfo(prev => ({
      wait: prev.wait,
      info: {
        limit: prev.info.limit,
        offSet:
          prev.info.offSet > 0
            ? prev.info.offSet - prev.info.limit
            : prev.info.offSet,
        orderBy: prev.info.orderBy,
        queryParams: prev.info.queryParams
      }
    }));
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
        headers: getWithAuthorizeHeader(headers, includeAuthorize)
      })
        .then(async value => {
          if (!value.ok) {
            let errorObject = undefined;
            try {
              errorObject = await value.json();
            } catch (error) {}
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
  }, [finalUri]);

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
