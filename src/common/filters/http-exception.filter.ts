import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch(HttpException) - HttpExceptionをキャッチ
// @Catch() - 全ての例外をキャッチ（引数なし）
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // コンテキストを取得（HTTP、WebSocket、RPCなど）
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 例外からレスポンスを取得
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as { message: string | string[] }).message
        : exception.message;

    // 統一されたエラーレスポンス形式
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      // 開発環境では詳細情報を追加（本番では削除推奨）
      ...(typeof exceptionResponse === 'object' ? exceptionResponse : {}),
    });
  }
}

// 全ての例外（未処理エラー含む）をキャッチするフィルター
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // HttpExceptionかどうかで処理を分岐
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : '内部サーバーエラーが発生しました';

    // エラーログ出力
    console.error(`[${new Date().toISOString()}] Error:`, exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
    });
  }
}
