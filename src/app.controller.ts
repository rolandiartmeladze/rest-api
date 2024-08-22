import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHomePage() {
    const apiData = await this.appService.getApiData();
    console.log(apiData);
    return { apiData };
  }
}
