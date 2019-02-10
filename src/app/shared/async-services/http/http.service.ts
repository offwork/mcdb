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

  // Should be provided APP_CONFIG/ENV_PROVIDER injection to the constructor.
  public constructor() {
    this.interceptors = [];
  }

  public getInterceptors() {
    return this.interceptors;
  }

  public addInterceptor(interceptor: AsyncHttpInterceptor): HttpService {
    this.interceptors.push(interceptor);
    return this;
  }
}
