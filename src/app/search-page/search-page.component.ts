import { QueryParameters } from './../models/query-params.model';
import { AutocompleteResponse } from '../models/autocomplete-response';
import { ApiEndpoints } from '../enums/api-endpoints.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { SearchItemsService } from 'src/app/services/search-items.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { QueryParametersService } from '../services/query-parameters.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  options: string[];
  searchSubscription: Subscription;

  constructor(protected http: HttpClient,
    protected searchItemService: SearchItemsService,
    private queryParametersService: QueryParametersService
  ) {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((keyword: string) => {
        this.http.get(environment.baseUrl + ApiEndpoints.autocompleteApi + encodeURI(keyword))
          .pipe(take(1))
          .subscribe((res: AutocompleteResponse) => {
            this.options = res.autocompleteOptions;
          });
      });
  }

  ngOnInit() {
    this.queryParametersService.queryParametersExtracted()
      .subscribe((res: QueryParameters) => {
        if (res) {
          const keyword = res.keyword;
          this.searchControl.setValue(keyword);
          this.searchItemService.searchItemsWithKeyword(keyword);
        }
      });
  }

  onSelectionChange(evt: MatAutocompleteSelectedEvent) {
    const currentKeyword = evt?.option?.value;
    this.searchItemService.searchItemsWithKeyword(currentKeyword);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
