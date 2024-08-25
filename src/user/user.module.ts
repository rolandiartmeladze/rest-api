import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { HttpModule } from '@nestjs/axios'; // იმპორტირეთ HttpModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule, // დაამატეთ HttpModule
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
