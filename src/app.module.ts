import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module'; // Correct import

@Module({
  imports: [HttpModule, UserModule], // Use UserModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
