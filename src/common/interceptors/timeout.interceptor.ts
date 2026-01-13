import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // タイムアウト時間（ミリ秒）
  constructor(private readonly timeoutMs: number = 5000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      // 指定時間を超えたらTimeoutErrorをスロー
      timeout(this.timeoutMs),
      // TimeoutErrorをRequestTimeoutExceptionに変換
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException(
                `リクエストがタイムアウトしました（${this.timeoutMs}ms）`,
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
