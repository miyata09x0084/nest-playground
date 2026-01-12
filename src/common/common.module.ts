import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global() // グローバルモジュール：一度インポートすれば全モジュールで利用可能
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class CommonModule {}
