import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';

const isObject = (value: boolean) => value !== null && typeof value === 'object';
const isUndefined = (value: boolean) => typeof value === 'undefined';
const isEmpty = (value: boolean) => typeof value === 'undefined' || value === null;

export interface AsyncHttpInterceptor {
  request?: (option: HttpRequest<any>) => HttpRequest<any> | void;
  response?: (
    response: HttpEvent<any> | HttpErrorResponse,
    request?: HttpRequest<any>
  ) => HttpEvent<any> | void;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private interceptors: AsyncHttpInterceptor[];

  public constructor() {
    this.interceptors = [];
  }

  public getInterceptors() {
    return this.interceptors;
  }

  public addRequestInterceptor(
    interceptor: (res: HttpRequest<any>) => HttpRequest<any>
  ): HttpService {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        return interceptor(request) || request;
      },
    });
  }

  public addResponseInterceptor(
    interceptor: (res: any, req?: HttpRequest<any>) => any
  ): HttpService {
    return this.addInterceptor({
      response: (
        response: HttpEvent<any>,
        request?: HttpRequest<any>
      ): HttpEvent<any> | void => {
        return interceptor(response, request) || response;
      },
    });
  }

  public addResponseErrorInterceptor(
    interceptor: (res: any, req?: HttpRequest<any>) => any
  ): HttpService {
    return this.addInterceptor({
      response: (
        response: HttpEvent<any> | HttpErrorResponse,
        request?: HttpRequest<any>
      ): HttpEvent<any> | void => {
        if (response instanceof HttpErrorResponse) {
          return interceptor(response, request) || response;
        }
      },
    });
  }

  public handleRequest(request: HttpRequest<any>): HttpRequest<any> {
    return this.interceptors
      .filter((intercept: AsyncHttpInterceptor) => !!intercept.request)
      .reduce((httpEvent: HttpRequest<any>, intercept: AsyncHttpInterceptor) => {
        return intercept.request(httpEvent) || httpEvent;
      }, request);
  }

  public handleResponse(response: HttpEvent<any>, request: HttpRequest<any>): HttpEvent<any> {
    return this.interceptors
      .filter((intercept: AsyncHttpInterceptor) => !!intercept.response)
      .reverse()
      .reduce((httpEvent: HttpEvent<any>, intercept: AsyncHttpInterceptor) => {
        return intercept.response(httpEvent, request) || httpEvent;
      }, response);
  }

  public baseUrl(host: string, excludes: RegExp[] = []): HttpService {
    this.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url)) {
          return request;
        }
        if (excludes.some(t => t.test(request.url))) {
          return request;
        }

        host = host.replace(/\/$/, '');
        const url = request.url.replace(/^\//, '');
        return request.clone({ url: `${host}/${url}` });
      },
    });
    return this;
  }

  public headers(
    headers: { [name: string]: string | string[] } = {},
    override = false
  ): HttpService {
    this.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        let result: any = headers;
        if (request.headers) {
          result = Object.keys(headers).reduce((obj, key) => {
            if (override || !request.headers.has(key)) {
              obj[key] = headers[key];
            }
            return obj;
          }, {});
        }
        return request.clone({ setHeaders: result });
      },
    });
    return this;
  }

  private addInterceptor(interceptor: AsyncHttpInterceptor): HttpService {
    this.interceptors.push(interceptor);
    return this;
  }
}
