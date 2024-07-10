import { Module } from '@nestjs/common';
import { WpIntegrationService } from './wp-integration.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [WpIntegrationService],
  exports: [WpIntegrationService],
})
export class WpIntegrationModule {}
