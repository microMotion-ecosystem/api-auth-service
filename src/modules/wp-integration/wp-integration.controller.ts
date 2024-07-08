import { Body, Controller, Get, Post } from '@nestjs/common';
import { WpIntegrationService } from './wp-integration.service';

@Controller('wp')
export class WpIntegrationController {
  constructor(private readonly wordpressService: WpIntegrationService) {}

  @Get('import')
  importUsers() {
    return this.wordpressService.importUsers();
  }

  @Post('export')
  exportUser(@Body() user: any) {
    return this.wordpressService.exportUser(user);
  }
}
