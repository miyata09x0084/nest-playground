import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// レスポンスの統一フォーマット
export interface Response<T> {
  data: T;
  timestamp: string;
  path: string;
}

// NestInterceptor インターフェースを実装
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    // next.handle() でルートハンドラを実行
    // pipe() でレスポンスを変換
    return next.handle().pipe(
      map((data) => ({
        data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
