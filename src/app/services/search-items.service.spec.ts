import { SearchItemsService } from './search-items.service';
import { QueryParametersService } from './query-parameters.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouterMock } from '../testing/activated-router.mock';

describe('SearchItemsService', () => {
  let service: SearchItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ SearchItemsService, QueryParametersService, 
        {provide: ActivatedRoute, useValue: ActivatedRouterMock}]
    });
    service = TestBed.get(SearchItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
