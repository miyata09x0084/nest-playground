import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = request;
    const now = Date.now();

    // リクエスト前のログ
    console.log(`[Interceptor] → ${method} ${url}`);
    if (Object.keys(body || {}).length > 0) {
      console.log(`[Interceptor] Body:`, JSON.stringify(body));
    }

    // next.handle() でハンドラを実行し、tap() で後処理
    return next.handle().pipe(
      tap({
        // 成功時
        next: (data) => {
          const duration = Date.now() - now;
          console.log(
            `[Interceptor] ← ${method} ${url} - ${duration}ms`,
            data ? `(${JSON.stringify(data).slice(0, 100)}...)` : '',
          );
        },
        // エラー時
        error: (error) => {
          const duration = Date.now() - now;
          console.log(
            `[Interceptor] ✗ ${method} ${url} - ${duration}ms - Error: ${error.message}`,
          );
        },
      }),
    );
  }
}
