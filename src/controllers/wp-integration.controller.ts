import { Body, Controller, Get, Post } from '@nestjs/common';
import { WpIntegrationService } from '../modules/wp-integration/wp-integration.service';
import { EventPattern } from "@nestjs/microservices";

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
  @EventPattern('send_sms_event')
  async handleSendSms(data: any) {
    // Handle the SMS sending logic here
    console.log('SMS data received:', data);
    // Add your SMS sending logic here
    // await this.sendSms(data);
  }
}
