import { ApiBodyType } from "./ApiHook";
import { QueryParamsType, GetRequestInfo } from "./ApiResponse";

export function getEncodedUri<TRequest>(requestBody: TRequest) {
  return Object.keys(requestBody)
    .map(key => {
      return (
        `${encodeURIComponent(key)}=${encodeURIComponent((requestBody as any)[key])}`
      );
    })
    .join("&");
}

// Todo is logged in and token is from async storage
export function getWithAuthorizeHeader(token: string | undefined, headers: HeadersInit, affect = true): HeadersInit {
  if (token && affect) {
    return { ...headers, Authorization: `bearer ${token}` };
  }
  return headers;
}

export function getBodyAndHeaderFromType<TRequest>(
  apiBodyType: ApiBodyType,
  request: TRequest
): [HeadersInit, BodyInit] {
  let headers: HeadersInit = {} as any;
  let body: BodyInit = {} as any;

  switch (apiBodyType) {
    case "json":
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(request);
      break;
    case "urlencoded":
      headers = { "Content-Type": "application/x-www-form-urlencoded" };
      body = getEncodedUri(request);
      break;
    case "multipart": {
      const data = new FormData();
      data.append("file", request as any);
      body = data;
      break;
    }
    default:
      break;
  }

  return [headers, body];
}

export function generateQueryParamString(queryParams: QueryParamsType[]) {
  return queryParams.reduce((prev, cur) => {
    if (!cur.value) {
      return prev;
    }

    if (prev === "") {
      return `${cur.key}=${cur.value}`;
    }
    return `${prev}&${cur.key}=${cur.value}`;
  }, "");
}


export function getUri<TResponseViewModel>(
  uri: string,
  request: GetRequestInfo<TResponseViewModel>
) {
  let queries = generateQueryParamString(request.queryParams);
  if (queries) {
    queries += "&";
  }
  let paged = `${uri}?${queries}skip=${request.skip}&limit=${request.limit}`;
  if (request.orderBy) {
    paged = `${paged}&orderBy=${request.orderBy.name} ${request.orderBy.ascending}`;
  }

  return encodeURI(paged);
}

export function generateQueryParamStringFromObject<TRequest>(object: TRequest) {
  return generateQueryParamString(
    Object.entries(object).map<QueryParamsType>(([key, value]) => {
      return {
        key,
        value
      };
    })
  );
}

export function getUriFromQueryObject<TRequest>(
  uri: string,
  request: TRequest
) {
  let queries = generateQueryParamStringFromObject(request);
  if (queries) {
    return `${uri}?${queries}`;
  }

  return uri;
}


