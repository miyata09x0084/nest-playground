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
import { UsersService } from './users.service';
import type { User } from './users.service';

@Controller('users')
export class UsersController {
  // コンストラクタインジェクション（依存性注入）
  // NestJSが自動的にUsersServiceのインスタンスを注入してくれる
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  // GET /users/search?name=xxx
  @Get('search')
  search(@Query('name') name: string): User[] {
    return this.usersService.search(name);
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findOne(Number(id));
  }

  // POST /users
  @Post()
  create(@Body() body: { name: string; email: string }): User {
    return this.usersService.create(body.name, body.email);
  }

  // PUT /users/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ): User | undefined {
    return this.usersService.update(Number(id), body);
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    const result = this.usersService.remove(Number(id));
    return { deleted: result };
  }
}
