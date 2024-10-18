import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashingService } from 'src/hashing/hashing.service';

@Module({
  providers: [UserService, HashingService],
  controllers: [UserController]
})
export class UserModule {}
