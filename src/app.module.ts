import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios'; // HttpModule-ის იმპორტი

@Module({
  imports: [HttpModule], // HttpModule-ის დამატება
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
