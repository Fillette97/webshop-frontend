import { TestBed } from '@angular/core/testing';

import { OrderHistoryService } from './order-history-services.service';

describe('OrderHistoryServicesService', () => {
  let service: OrderHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
