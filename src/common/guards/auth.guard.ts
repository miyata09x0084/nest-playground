import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

// Guard: リクエストがルートハンドラに到達する前に実行される
// CanActivate インターフェースを実装
@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate: trueを返すとリクエストを許可、falseまたは例外で拒否
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // ヘッダーからAPI Keyを取得
    const apiKey = request.headers['x-api-key'];

    // 簡易的なAPI Key検証（実際は環境変数やDBで管理）
    const validApiKey = 'my-secret-api-key';

    if (!apiKey) {
      throw new UnauthorizedException('API Keyが必要です');
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('無効なAPI Keyです');
    }

    return true;
  }
}
