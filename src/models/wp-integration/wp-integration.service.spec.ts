import { Test, TestingModule } from '@nestjs/testing';
import { WpIntegrationService } from './wp-integration.service';

describe('WpIntegrationService', () => {
  let service: WpIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WpIntegrationService],
    }).compile();

    service = module.get<WpIntegrationService>(WpIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
