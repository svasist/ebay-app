import { Injectable, Query } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RouterLinkWithHref } from '@angular/router';
import { QueryParameters } from '../models/query-params.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryParametersService {
  currentQueryParams = {} as QueryParameters;
  queryParametersExtracted$ = new BehaviorSubject<QueryParameters>(null);

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.extractUrlQueryParams();
  }

  getQueryParamValue(key: string) {
    return this.route.snapshot.queryParamMap;
  }

  extractUrlQueryParams() {
    const url = window?.location?.href;
    const paramStr = url.split('?')[1];
    if (paramStr) {
      const params = paramStr.split('&');
      params.forEach((str:string) => {
        const [key, value] = str.split('=');
        this.currentQueryParams[key] = decodeURI(value);
      });
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: this.currentQueryParams
      });
      this.queryParametersExtracted$.next(this.currentQueryParams);
    }
  }

  getCurrentQueryParams(): QueryParameters {
    return this.currentQueryParams;
  }

  updateFilterQueryParams(params: QueryParameters) {
    this.currentQueryParams = {keyword: this.currentQueryParams?.keyword, ...params};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.currentQueryParams
    });
  }

  updateKeyWordQueryParam(param: string) {
    this.currentQueryParams = {...this.currentQueryParams, keyword: param};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.currentQueryParams
    });
  }

  queryParametersExtracted(): BehaviorSubject<QueryParameters> {
    return this.queryParametersExtracted$;
  }

  removeFilterQueryParams() {
    this.currentQueryParams = { keyword : this.currentQueryParams?.keyword} as QueryParameters;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.currentQueryParams
    });
  }

  ngOnDestroy() {
    this.queryParametersExtracted$.complete();
  }
}
