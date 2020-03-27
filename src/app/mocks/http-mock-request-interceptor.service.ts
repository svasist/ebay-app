import { ApiEndpoints } from './../enums/api-endpoints.enum';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as searchList from './searchList.json';
import * as filteredSearchList from './filteredSearchList.json';
import * as autocompleteOptions from './autocompleteOptions.json';
import { environment } from 'src/environments/environment';

const urls = [
  {
    url: environment.baseUrl + ApiEndpoints.searchApi + 'card?',
    json: filteredSearchList
  },
  {
    url: environment.baseUrl + ApiEndpoints.searchApi,
    json: searchList
  },
  {
    url: environment.baseUrl + ApiEndpoints.autocompleteApi,
    json: autocompleteOptions
  }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (request.url.indexOf(element.url) !== -1) {
        console.log('Loaded from json : ' + request.url);
        return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }
}
