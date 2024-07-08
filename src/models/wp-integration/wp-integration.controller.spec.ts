import { Test, TestingModule } from '@nestjs/testing';
import { WpIntegrationController } from './wp-integration.controller';

describe('WpIntegrationController', () => {
  let controller: WpIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WpIntegrationController],
    }).compile();

    controller = module.get<WpIntegrationController>(WpIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
