import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TrimPipe } from './common/pipes/trim.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // グローバルにPipeを適用（順番: Trim → Validation）
  app.useGlobalPipes(
    new TrimPipe(), // まず空白をトリム
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // グローバルに例外フィルターを適用
  app.useGlobalFilters(new HttpExceptionFilter());

  // グローバルにInterceptorを適用（実行順序: Logging → Timeout → Transform）
  app.useGlobalInterceptors(
    new LoggingInterceptor(), // ログ出力（最初に実行）
    new TimeoutInterceptor(5000), // 5秒でタイムアウト
    new TransformInterceptor(), // レスポンス変換（最後に実行）
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
