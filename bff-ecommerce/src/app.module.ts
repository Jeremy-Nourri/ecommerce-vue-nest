import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [ProductsModule, UserModule],
  controllers: [AppController],
  providers: [AppService, HashingService],
})
export class AppModule {}
