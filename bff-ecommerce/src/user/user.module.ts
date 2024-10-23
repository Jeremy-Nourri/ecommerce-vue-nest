import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashingService } from 'src/hashing/hashing.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [UserService, HashingService],
  controllers: [UserController],
  imports: [HttpModule]
})
export class UserModule {}
