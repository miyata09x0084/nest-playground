import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    // レスポンス完了時にログ出力
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      console.log(
        `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      );
    });

    next(); // 次の処理へ
  }
}
