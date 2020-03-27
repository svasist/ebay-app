import { SearchResponse, FilterData } from './../models/search-response.model';
import { BehaviorSubject } from 'rxjs';
import { SearchItem } from './../models/search-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../enums/api-endpoints.enum';
import { QueryParametersService } from './query-parameters.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchItemsService {
  baseUrl = environment.baseUrl;
  searchItems$ = new BehaviorSubject<SearchItem[]>(null);
  filterData$ = new BehaviorSubject<FilterData[]>(null);
  currentKeyword: string;

  constructor(
    protected http: HttpClient,
    private queryParametersService: QueryParametersService
  ) {}

  searchItemsWithKeyword(keyword: string) {
    this.http.get(environment.baseUrl + ApiEndpoints.searchApi + encodeURI(keyword))
      .pipe(take(1))
      .subscribe((res: SearchResponse) => {
        if (keyword === 'card') {
          this.filterData$.next(res.filters);
          this.searchItems$.next(res.searchItems);
        } else {
          this.filterData$.next([]);
          this.searchItems$.next([]);
        }
        this.currentKeyword = res.keyword;
        this.queryParametersService.updateKeyWordQueryParam(keyword);
      });
  }

  searchItemsWithFilters() {
    const queryParams = this.queryParametersService.getCurrentQueryParams();
    let queryStr = '';
    for (let [key, value] of Object.entries(queryParams)) {
      if (key !== 'keyword') {
        queryStr += `${key}=${value}&`;
      }
    }
    queryStr = queryStr.slice(0, -1);

    let URIString = (queryStr === '') ? `${this.currentKeyword}` : `${this.currentKeyword}?${queryStr}`;

    this.http.get(environment.baseUrl + ApiEndpoints.searchApi + encodeURI(URIString))
      .pipe(take(1))
      .subscribe((res: SearchResponse) => {
        if (this.currentKeyword === 'card') {
          this.searchItems$.next(res.searchItems);
        } else {
          this.searchItems$.next([]);
        }
      });
  }

  getSearchItems(): BehaviorSubject<SearchItem[]> {
    return this.searchItems$;
  }

  getFilterData(): BehaviorSubject<FilterData[]> {
    return this.filterData$;
  }

  ngOnDestroy() {
    this.searchItems$.complete();
    this.filterData$.complete();
  }
}
