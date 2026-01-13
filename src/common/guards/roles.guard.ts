import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

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

    const request = context.switchToHttp().getRequest();
    const user = request.user; // JWTから設定されたユーザー情報

    if (!user || !user.role) {
      throw new ForbiddenException('ユーザー認証が必要です');
    }

    // 必要なロールのいずれかを持っているかチェック
    const hasRole = requiredRoles.includes(user.role as Role);

    if (!hasRole) {
      throw new ForbiddenException(
        `この操作には ${requiredRoles.join(' または ')} ロールが必要です`,
      );
    }

    return true;
  }
}
