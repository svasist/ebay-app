import { TestBed } from '@angular/core/testing';

import { QueryParametersService } from './query-parameters.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouterMock } from '../testing/activated-router.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('QueryParametersService', () => {
  let service: QueryParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [{provide: ActivatedRoute, useValue: ActivatedRouterMock}]
    });
    service = TestBed.get(QueryParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
