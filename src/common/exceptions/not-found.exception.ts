import { HttpException, HttpStatus } from '@nestjs/common';

// カスタム例外クラス - リソースが見つからない場合に使用
export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id: number | string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `${resource}（ID: ${id}）が見つかりません`,
        error: 'Not Found',
        resource,
        id,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

// ユーザー専用の例外
export class UserNotFoundException extends ResourceNotFoundException {
  constructor(id: number | string) {
    super('ユーザー', id);
  }
}

// 商品専用の例外
export class ProductNotFoundException extends ResourceNotFoundException {
  constructor(id: number | string) {
    super('商品', id);
  }
}
