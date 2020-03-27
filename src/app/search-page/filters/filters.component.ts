import { FilterOption } from './../../models/search-response.model';
import { QueryParameters } from './../../models/query-params.model';
import { ItemCondition } from './../../enums/condition.enum';
import { FilterKey } from './../../enums/filter-key.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchItemsService } from 'src/app/services/search-items.service';
import { FilterData } from 'src/app/models/search-response.model';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Country } from 'src/app/enums/country.enum';
import { QueryParametersService } from 'src/app/services/query-parameters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  filterData: FilterData[];
  filterDataSubscription: Subscription;
  locationFilterData: FilterData;
  conditionFilterData: FilterData;
  locations = {} as { (key: string): boolean };
  conditions = {} as { (key: string): boolean };
  minPriceControl = new FormControl();
  maxPriceControl = new FormControl();
  ItemCondition = ItemCondition;
  Country = Country;
  locationQueryParams: string[] = [];
  conditionQueryParams: string[] = [];
  queryParams = {} as QueryParameters;
  
  constructor(
    private searchItemService: SearchItemsService,
    private queryParametersService: QueryParametersService
  ) {}

  ngOnInit() {
    this.filterDataSubscription = this.searchItemService.getFilterData()
      .subscribe((res: FilterData[]) => {
        if (res) {
          this.filterData = res;
          if (this.filterData?.length === 0) {
            this.reset();
          }
          this.locationFilterData = res.find((data: FilterData) => data.key === FilterKey.location);
          this.conditionFilterData = res.find((data: FilterData) => data.key === FilterKey.condition);
          this.initializeControls();
        }
      });

    this.initializeFilters();
  }

  initializeControls() {
    this.locationFilterData?.options?.forEach((opt: FilterOption) => {
      this.locations[opt?.value] = false;
    });

    this.conditionFilterData?.options?.forEach((opt: FilterOption) => {
      this.conditions[opt?.value] = false;
    });
  }

  initializeFilters() {
    this.queryParametersService.queryParametersExtracted()
      .subscribe((res: QueryParameters) => {
        if (res) {
          this.queryParams = res;
          this.minPriceControl.setValue(res?.minPrice);
          this.maxPriceControl.setValue(res?.maxPrice);
          const locations = res?.location?.split(',');
          if (locations?.length > 0) {
            locations.forEach((location: string) => {
              this.locations[location] = true;
              this.locationQueryParams.push(location);
            });
          }

          const conditions = res?.condition?.split(',');
          if (conditions?.length > 0) {
            conditions.forEach((condition: string) => {
              this.conditions[condition] = true;
              this.conditionQueryParams.push(condition);
            });
          }

          if (!(res.hasOwnProperty('keyword') && Object.keys(res)?.length === 1)) {
            this.searchItemService.searchItemsWithFilters();
          }
        }
      });
  }

  reset() {
    this.minPriceControl.reset();
    this.maxPriceControl.reset();
    Object.keys(this.locations).forEach(key => {
      this.locations[key] = false;
    });
    Object.keys(this.conditions).forEach(key => {
      this.conditions[key] = false;
    });
    this.locationQueryParams = [];
    this.conditionQueryParams = [];
    this.queryParams = {} as QueryParameters;
    this.queryParametersService.removeFilterQueryParams();
  }

  onLocationChange(evt) {
    const locationValue = evt?.source?.value;
    if (evt?.checked) {
      this.locationQueryParams.push(locationValue);
    } else {
      this.locationQueryParams = this.locationQueryParams.filter(queryParam => queryParam !== locationValue);
    }
    if (this.locationQueryParams.length > 0) {
      this.queryParams.location = this.locationQueryParams.reduce((a, c) => a + ',' + c);
    } else {
      delete this.queryParams.location;
    }
    this.appendQueryParameters();
  }

  onConditionChange(evt) {
    const conditionValue = evt?.source?.value;
    if (evt?.checked) {
      this.conditionQueryParams.push(conditionValue);
    } else {
      this.conditionQueryParams = this.conditionQueryParams.filter(queryParam => queryParam !== conditionValue);
    }
    if (this.conditionQueryParams.length > 0) {
      this.queryParams.condition = this.conditionQueryParams.reduce((a, c) => a + ',' + c);
    } else {
      delete this.queryParams.condition;
    }
    this.appendQueryParameters();
  }

  onMinPriceChange(evt) {
    const minPrice = +evt?.target?.value;
    if (evt?.target?.value !== '') {
      this.queryParams.minPrice = minPrice;
    } else {
      delete this.queryParams.minPrice;
    }
    this.appendQueryParameters();
  }

  onMaxPriceChange(evt) {
    const maxPrice = +evt?.target?.value;
    if (evt?.target?.value !== '') {
      this.queryParams.maxPrice = maxPrice;
    } else {
      delete this.queryParams.maxPrice;
    }
    this.appendQueryParameters();
  }

  appendQueryParameters() {
    this.queryParametersService.updateFilterQueryParams(this.queryParams);
    this.searchItemService.searchItemsWithFilters();
  }

  ngOnDestroy() {
    this.filterDataSubscription.unsubscribe();
  }
}
