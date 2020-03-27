import { HttpMockRequestInterceptor } from './http-mock-request-interceptor.service';


describe('HttpMockRequestInterceptorService', () => {
  let service: HttpMockRequestInterceptor;

  beforeEach(() => {
    service = new HttpMockRequestInterceptor();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
