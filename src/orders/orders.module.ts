import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // UsersModuleをインポート → UsersServiceが使える
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
