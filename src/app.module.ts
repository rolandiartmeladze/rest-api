import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HttpModule } from '@nestjs/axios'; 
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/nestjs?retryWrites=true&w=majority'),
    // MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    UserModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
