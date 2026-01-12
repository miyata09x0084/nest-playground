import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

// ユーザーの型定義
interface User {
  id: number;
  name: string;
  email: string;
}

// 仮のデータベース（メモリ上）
let users: User[] = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
  { id: 2, name: '山田花子', email: 'yamada@example.com' },
];

@Controller('users') // ベースパス: /users
export class UsersController {
  // GET /users - 全ユーザー取得
  @Get()
  findAll(): User[] {
    return users;
  }

  // GET /users/search?name=xxx - 名前で検索
  @Get('search')
  search(@Query('name') name: string): User[] {
    return users.filter((user) => user.name.includes(name));
  }

  // GET /users/:id - 特定ユーザー取得
  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return users.find((user) => user.id === Number(id));
  }

  // POST /users - 新規ユーザー作成
  @Post()
  create(@Body() body: { name: string; email: string }): User {
    const newUser: User = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };
    users.push(newUser);
    return newUser;
  }

  // PUT /users/:id - ユーザー更新
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ): User | undefined {
    const user = users.find((u) => u.id === Number(id));
    if (user) {
      if (body.name) user.name = body.name;
      if (body.email) user.email = body.email;
    }
    return user;
  }

  // DELETE /users/:id - ユーザー削除
  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    const index = users.findIndex((u) => u.id === Number(id));
    if (index > -1) {
      users.splice(index, 1);
      return { deleted: true };
    }
    return { deleted: false };
  }
}
