import { Injectable } from '@nestjs/common';
import { LoggerService } from '../common/logger.service';

// ユーザーの型定義
export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private readonly context = 'UsersService';

  // 仮のデータベース（メモリ上）
  private users: User[] = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
    { id: 2, name: '山田花子', email: 'yamada@example.com' },
  ];

  // LoggerServiceを注入（グローバルモジュールなのでimport不要）
  constructor(private readonly logger: LoggerService) {}

  // 全ユーザー取得
  findAll(): User[] {
    this.logger.log(this.context, 'Finding all users');
    return this.users;
  }

  // 名前で検索
  search(name: string): User[] {
    return this.users.filter((user) => user.name.includes(name));
  }

  // ID指定で取得
  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // 新規作成
  create(name: string, email: string): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
    };
    this.users.push(newUser);
    this.logger.log(this.context, `Created user: ${newUser.id} - ${name}`);
    return newUser;
  }

  // 更新
  update(id: number, data: { name?: string; email?: string }): User | undefined {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      if (data.name) user.name = data.name;
      if (data.email) user.email = data.email;
    }
    return user;
  }

  // 削除
  remove(id: number): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
