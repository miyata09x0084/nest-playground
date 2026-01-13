import { SetMetadata } from '@nestjs/common';

// ロールの種類を定義
export type Role = 'admin' | 'user' | 'guest';

// メタデータのキー
export const ROLES_KEY = 'roles';

// @Roles('admin', 'user') のように使用
// SetMetadata: ハンドラにメタデータを付与
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
