import { TestBed } from '@angular/core/testing';

import { OrderHistoryServicesService } from './order-history-services.service';

describe('OrderHistoryServicesService', () => {
  let service: OrderHistoryServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderHistoryServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
