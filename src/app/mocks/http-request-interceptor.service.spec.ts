import { HttpRequestInterceptor } from './http-request-interceptor.service';

describe('HttpRequestInterceptor', () => {
  let service: HttpRequestInterceptor;

  beforeEach(() => {
    service = new HttpRequestInterceptor();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
