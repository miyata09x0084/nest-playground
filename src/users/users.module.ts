import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController], // このモジュールのコントローラー
  providers: [UsersService],      // このモジュールのサービス
  exports: [UsersService],        // 外部モジュールに公開（重要！）
})
export class UsersModule {}
