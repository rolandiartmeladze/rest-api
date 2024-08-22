import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHomePage() {
    // Fetch data without filtering by ID (null indicates no ID is passed)
    const apiData = await this.appService.getApiData();
    return { apiData };
  }

  @Get('/users/:id')
  @Render('template')  
  async getUserById(@Param('id') id: string) {
    const apiData = await this.appService.getApiData(id);
    return { apiData };
  }
}
