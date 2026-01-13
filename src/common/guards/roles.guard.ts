import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

// リクエストにユーザー情報を追加するための型拡張
interface RequestWithUser extends Request {
  user?: {
    id: number;
    name: string;
    role: Role;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector: メタデータを読み取るためのヘルパー
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // @Roles() デコレータで設定されたロールを取得
    // getAllAndOverride: メソッドレベル → クラスレベルの順で取得
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // メソッドのメタデータ
      context.getClass(), // クラスのメタデータ
    ]);

    // @Roles() が設定されていなければ全員許可
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // ヘッダーからロールを取得（実際はJWTトークン等から取得）
    const userRole = request.headers['x-user-role'] as Role;

    if (!userRole) {
      throw new ForbiddenException('ユーザーロールが必要です');
    }

    // 簡易的なユーザー情報をリクエストに追加
    request.user = {
      id: 1,
      name: 'テストユーザー',
      role: userRole,
    };

    // 必要なロールのいずれかを持っているかチェック
    const hasRole = requiredRoles.includes(userRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `この操作には ${requiredRoles.join(' または ')} ロールが必要です`,
      );
    }

    return true;
  }
}
